import { useState, type CSSProperties, type ReactNode } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';
import {
  Home, BookOpen, User, Barcode, BarChart3, Search, Bell, ChevronDown, Calendar,
  Download, Settings, LogOut, MoreHorizontal, TrendingUp, TrendingDown,
} from 'lucide-react';
import { mockData, type DashboardData, type Periodo, type PontoEvolucao } from './mockData';
import './dashboard.css';

const NAV = [
  { id: 'inicio', rotulo: 'Início', href: '/', Icone: Home },
  { id: 'acervo', rotulo: 'Acervo', href: '/acervo', Icone: BookOpen },
  { id: 'cadastro', rotulo: 'Cadastro', href: '/cadastro', Icone: User },
  { id: 'isbn', rotulo: 'ISBN', href: '/isbn', Icone: Barcode },
  { id: 'relatorios', rotulo: 'Relatórios', href: '/relatorios', Icone: BarChart3 },
];
const CARDS = [
  { chave: 'livros', rotulo: 'Total no acervo', Icone: BookOpen, cor: 'blue' },
  { chave: 'autores', rotulo: 'Autores cadastrados', Icone: User, cor: 'purple' },
  { chave: 'editoras', rotulo: 'Editoras', Icone: BookOpen, cor: 'green' },
  { chave: 'generos', rotulo: 'Gêneros catalogados', Icone: BarChart3, cor: 'orange' },
] as const;
const PERIODOS: readonly (readonly [Periodo, string])[] = [['7d', '7 dias'], ['30d', '30 dias'], ['6m', '6 meses']];
const CORES = ['#2563eb', '#22c3d6', '#7c4fd8', '#bccaf5', '#f59e0b', '#17b26a'];
const TRILHA = '#e8eef9';

const fmt = (n?: number | null) => (n ?? 0).toLocaleString('pt-BR');
const soma = (lista: { quantidade: number }[]) => lista.reduce((t, i) => t + (i.quantidade || 0), 0);
const pct = (parte: number, total: number) => (total > 0 ? Math.round((parte / total) * 100) : 0);
const colorir = <T extends object>(lista: T[]) => lista.map((item, i) => ({ ...item, cor: CORES[i % CORES.length] }));

/* ---------- Layout (reaproveitável pelas outras páginas) ---------- */
export function Sidebar({ ativo = 'relatorios', relatorio, onExportar }: {
  ativo?: string; relatorio?: DashboardData['relatorio']; onExportar?: () => void;
}) {
  return (
    <aside className="bg-sidebar">
      <div className="bg-logo"><BookOpen size={34} strokeWidth={1.8} /><span>Biblio<b>Gestão</b></span></div>
      <nav className="bg-nav">
        {NAV.map(({ id, rotulo, href, Icone }) => (
          <a key={id} href={href} className={id === ativo ? 'is-active' : ''}>
            <Icone size={24} strokeWidth={1.8} />{rotulo}
          </a>
        ))}
      </nav>
      {relatorio && (
        <div className="bg-report">
          <small>RELATÓRIO MENSAL</small>
          <strong>{relatorio.titulo}</strong>
          <span>{relatorio.atualizacao}</span>
          <button type="button" onClick={onExportar}><Download size={15} />Exportar relatório</button>
        </div>
      )}
      <div className="bg-side-foot">
        <a href="/configuracoes"><Settings size={20} strokeWidth={1.8} />Configurações</a>
        <a href="/sair"><LogOut size={20} strokeWidth={1.8} />Sair</a>
      </div>
    </aside>
  );
}

export function Topbar({ usuario }: { usuario: DashboardData['usuario'] }) {
  return (
    <header className="bg-topbar">
      <label className="bg-search"><Search size={18} /><input placeholder="Buscar no sistema..." /></label>
      <div className="bg-top-right">
        <button type="button" className="bg-bell" aria-label="Notificações"><Bell size={22} strokeWidth={1.8} /><i /></button>
        <div className="bg-avatar"><User size={22} /></div>
        <div className="bg-user"><strong>{usuario.nome}</strong><span>{usuario.cargo}</span></div>
        <ChevronDown size={14} />
      </div>
    </header>
  );
}

/* ---------- Peças do dashboard ---------- */
function Variacao({ valor }: { valor?: number | string | null }) {
  if (valor === null || valor === undefined || valor === '') return null;
  const neg = typeof valor === 'number' && valor < 0;
  const Seta = neg ? TrendingDown : TrendingUp;
  const texto = typeof valor === 'number' ? `${fmt(Math.abs(valor))}%` : valor;
  return <em className={neg ? 'is-neg' : ''}><Seta size={9} /> {texto}</em>;
}

function Donut({ partes, cores, tamanho = 168, espessura = 22, children }: {
  partes: { v: number }[]; cores: string[]; tamanho?: number; espessura?: number; children?: ReactNode;
}) {
  const vazio = partes.every((p) => !p.v);
  return (
    <div className="bg-donut" style={{ width: tamanho, height: tamanho }}>
      <PieChart width={tamanho} height={tamanho}>
        <Pie data={vazio ? [{ v: 1 }] : partes} dataKey="v" innerRadius={tamanho / 2 - espessura} outerRadius={tamanho / 2}
             startAngle={90} endAngle={-270} stroke="none" isAnimationActive={false}>
          {(vazio ? [TRILHA] : cores).map((c, i) => <Cell key={i} fill={c} />)}
        </Pie>
      </PieChart>
      <div className="bg-donut-center">{children}</div>
    </div>
  );
}

function EvoTooltip({ active, payload }: { active?: boolean; payload?: { payload: PontoEvolucao }[] }) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  return <div className="bg-tip"><small>{p.titulo ?? p.rotulo}</small><strong>{fmt(p.livros)} livros</strong></div>;
}

/* ---------- Página ----------
   Props: data (formato do mockData.js), onExportar(), onMudarPeriodo(id: '7d' | '30d' | '6m') */
export default function Dashboard({ data = mockData, onExportar, onMudarPeriodo }: {
  data?: DashboardData; onExportar?: () => void; onMudarPeriodo?: (id: Periodo) => void;
}) {
  const [periodo, setPeriodo] = useState<Periodo>('30d');
  const totais = data.totais;
  const variacoes: NonNullable<DashboardData['variacoes']> = data.variacoes ?? {};
  const serie = data.evolucao?.[periodo] ?? [];
  const semCadastros = serie.every((p) => !p.livros);
  const generos = colorir(data.generos ?? []);
  const idiomas = colorir(data.idiomas ?? []);
  const totalGeneros = soma(generos);
  const totalIdiomas = soma(idiomas);

  const total = totais.livros || 0;
  const completos = data.qualidade?.completos || 0;
  const parciais = data.qualidade?.parciais || 0;
  const percentual = pct(completos, total);
  const revisar = Math.max(total - completos, 0);
  const tituloQualidade = total === 0 ? 'Sem livros cadastrados'
    : percentual >= 90 ? 'Dados bem organizados' : 'Há informações a completar';
  const textoQualidade = total === 0 ? 'Cadastre livros para acompanhar a qualidade do catálogo.'
    : `${fmt(completos)} livros possuem todos os campos essenciais preenchidos.`;

  const trocarPeriodo = (id: Periodo) => { setPeriodo(id); onMudarPeriodo?.(id); };

  return (
    <div className="bg-app">
      <Sidebar ativo="relatorios" relatorio={data.relatorio} onExportar={onExportar} />
      <div className="bg-main">
        <Topbar usuario={data.usuario} />
        <main className="bg-content">
          <div className="bg-head">
            <div>
              <small className="bg-eyebrow">VISÃO GERAL</small>
              <h1>Dashboard do acervo</h1>
              <p>Acompanhe a organização e o crescimento da sua biblioteca.</p>
            </div>
            <button type="button" className="bg-date"><Calendar size={18} />{data.periodo}<ChevronDown size={13} /></button>
          </div>

          <section className="bg-stats">
            {CARDS.map(({ chave, rotulo, Icone, cor }) => (
              <article key={chave} className={`bg-card bg-stat tone-${cor}`}>
                <span className="bg-stat-icon"><Icone size={24} strokeWidth={1.8} /></span>
                <div>
                  <small>{rotulo}</small>
                  <p><strong>{fmt(totais[chave])}</strong><Variacao valor={variacoes[chave]} /></p>
                </div>
              </article>
            ))}
          </section>

          <section className="bg-row bg-row-1">
            <article className="bg-card">
              <div className="bg-card-head">
                <div><h2>Evolução do acervo</h2><p>Novos livros cadastrados ao longo do tempo</p></div>
                <div className="bg-tabs" role="tablist">
                  {PERIODOS.map(([id, nome]) => (
                    <button key={id} type="button" role="tab" aria-selected={periodo === id}
                            className={periodo === id ? 'is-on' : ''} onClick={() => trocarPeriodo(id)}>{nome}</button>
                  ))}
                </div>
              </div>
              <div className="bg-legend"><i />Livros cadastrados</div>
              <div className="bg-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={serie} margin={{ top: 28, right: 16, left: 16, bottom: 0 }}>
                    <defs>
                      <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563eb" stopOpacity={0.18} />
                        <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} stroke="#e8eef9" />
                    <XAxis dataKey="rotulo" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#7b89a6' }} />
                    <YAxis hide domain={[0, (max: number) => Math.max(max, 10)]} />
                    <Tooltip content={<EvoTooltip />} cursor={false} />
                    <Area type="monotone" dataKey="livros" stroke="#2563eb" strokeWidth={2.5} fill="url(#bgGrad)"
                          activeDot={{ r: 7, fill: '#fff', stroke: '#2563eb', strokeWidth: 3 }} />
                  </AreaChart>
                </ResponsiveContainer>
                {semCadastros && <div className="bg-empty">Nenhum livro cadastrado neste período</div>}
              </div>
            </article>

            <article className="bg-card">
              <div className="bg-card-head">
                <div><h2>Distribuição por gênero</h2><p>Gêneros com maior presença no acervo</p></div>
                <button type="button" className="bg-more" aria-label="Mais opções"><MoreHorizontal size={22} /></button>
              </div>
              <div className="bg-genre">
                <Donut partes={generos.map((g) => ({ v: g.quantidade }))} cores={generos.map((g) => g.cor)}>
                  <strong>{fmt(total)}</strong><span>livros</span>
                </Donut>
                <ul>
                  {generos.map((g) => (
                    <li key={g.nome}><i style={{ background: g.cor }} />{g.nome}<b>{pct(g.quantidade, totalGeneros)}%</b></li>
                  ))}
                </ul>
              </div>
            </article>
          </section>

          <section className="bg-row bg-row-2">
            <article className="bg-card">
              <div className="bg-card-head">
                <div><h2>Qualidade do catálogo</h2><p>Completude das informações dos livros</p></div>
                <button type="button" className="bg-more" aria-label="Mais opções"><MoreHorizontal size={22} /></button>
              </div>
              <div className="bg-quality">
                <Donut partes={[{ v: completos }, { v: parciais }, { v: Math.max(total - completos - parciais, 0) }]}
                       cores={['#2f6fe4', '#22c3d6', '#e3e9f7']} tamanho={170} espessura={20}>
                  <strong className="big">{percentual}%</strong><span>completos</span>
                </Donut>
                <div>
                  <h3>{tituloQualidade}</h3>
                  <p>{textoQualidade}</p>
                  {revisar > 0 && <span className="bg-badge">{fmt(revisar)} livros para revisar</span>}
                </div>
              </div>
            </article>

            <article className="bg-card">
              <div className="bg-card-head">
                <div><h2>Idiomas do acervo</h2><p>Distribuição por linguagem cadastrada</p></div>
                <div className="bg-count"><strong>{idiomas.length}</strong> idiomas</div>
              </div>
              <div className="bg-langs">
                <div className="bg-stack" role="img" aria-label="Proporção de livros por idioma">
                  {idiomas.map((l) => (
                    <span key={l.nome} style={{ width: `${totalIdiomas > 0 ? (l.quantidade / totalIdiomas) * 100 : 0}%`, background: l.cor }} />
                  ))}
                </div>
                <ul className="bg-lang-grid">
                  {idiomas.map((l) => (
                    <li key={l.nome} style={{ '--c': l.cor } as CSSProperties}>
                      <span className="bg-lang-name"><i />{l.nome}</span>
                      <strong>{pct(l.quantidade, totalIdiomas)}%</strong>
                      <small>{fmt(l.quantidade)} livros</small>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </section>
        </main>
      </div>
    </div>
  );
}
