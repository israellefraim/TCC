// Dados do Dashboard do acervo, zerados.
// ESTE OBJETO É O "CONTRATO": o grupo monta um objeto com este mesmo formato
// a partir do Supabase e passa em <Dashboard data={dados} />.
// Porcentagens são calculadas pelo componente: envie só as QUANTIDADES.

export type Periodo = '7d' | '30d' | '6m';
export interface PontoEvolucao { rotulo: string; livros: number; titulo?: string }
export interface ItemQuantidade { nome: string; quantidade: number }
export interface Totais { livros: number; autores: number; editoras: number; generos: number }
export type VariacaoValor = number | string | null;

export interface DashboardData {
  usuario: { nome: string; cargo: string };
  periodo: string;
  relatorio?: { titulo: string; atualizacao: string };
  totais: Totais;
  variacoes?: Partial<Record<keyof Totais, VariacaoValor>>;
  evolucao: Record<Periodo, PontoEvolucao[]>;
  generos: ItemQuantidade[];
  idiomas: ItemQuantidade[];
  qualidade: { completos: number; parciais?: number };
}

const zeros = (rotulos: string[]): PontoEvolucao[] => rotulos.map((rotulo) => ({ rotulo, livros: 0 }));

export const mockData: DashboardData = {
  usuario: { nome: 'Bibliotecário', cargo: 'Administrador' },
  periodo: '01 — 30 Set, 2026',
  relatorio: { titulo: 'Setembro 2026', atualizacao: 'Dados atualizados hoje' },

  // Totais dos 4 cards do topo
  totais: { livros: 0, autores: 0, editoras: 0, generos: 0 },

  // Opcional. Número (ex.: 8.4 ou -2.1, vira "8,4%"), texto (ex.: '3 novos') ou null para esconder
  variacoes: { livros: null, autores: null, editoras: null, generos: null },

  // Livros cadastrados por período. Cada ponto: { rotulo: 'Jan', livros: 60 }
  // (opcional: titulo: 'JAN 2026', que aparece no balão ao passar o mouse)
  evolucao: {
    '7d': zeros(['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']),
    '30d': zeros(['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul']),
    '6m': zeros(['Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set']),
  },

  // Quantidade de livros por gênero / idioma (a lista pode ter qualquer tamanho)
  generos: [
    { nome: 'Romance', quantidade: 0 },
    { nome: 'Ficção', quantidade: 0 },
    { nome: 'Fantasia', quantidade: 0 },
    { nome: 'Outros', quantidade: 0 },
  ],
  idiomas: [
    { nome: 'Português', quantidade: 0 },
    { nome: 'Inglês', quantidade: 0 },
    { nome: 'Espanhol', quantidade: 0 },
    { nome: 'Outros', quantidade: 0 },
  ],

  // completos = livros com todos os campos essenciais; parciais (opcional) = com alguns campos faltando.
  // "para revisar" = totais.livros - completos
  qualidade: { completos: 0, parciais: 0 },
};
