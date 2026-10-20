import type { MouseEvent, ReactNode } from "react";
import {
  HouseDoorFill,
  BookFill,
  JournalPlus,
  BarChartFill,
  JournalBookmarkFill,
} from "react-bootstrap-icons";

// Versão só visual: os links não levam a lugar nenhum por enquanto
const links = [
  { label: "Início", icon: HouseDoorFill, ativo: true },
  { label: "Acervo", icon: BookFill },
  { label: "Cadastro", icon: JournalPlus },
  { label: "Relatórios", icon: BarChartFill },
];

const bloquear = (e: MouseEvent) => e.preventDefault();

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      {/* Sidebar (desktop) */}
      <aside className="sidebar">
        <div className="brand">
          <JournalBookmarkFill size={26} />
          <span>BiblioGestão</span>
        </div>
        <nav>
          {links.map(({ label, icon: Icon, ativo }) => (
            <a key={label} href="#" className={ativo ? "active" : ""} onClick={bloquear}>
              <Icon size={18} />
              {label}
            </a>
          ))}
        </nav>
      </aside>

      {/* Topbar */}
      <header className="topbar">
        <div className="brand brand-mobile">
          <JournalBookmarkFill size={22} />
          <span>BiblioGestão</span>
        </div>
        <div className="conta">
          <span className="avatar">B</span>
          <span className="conta-info">
            <strong>Bibliotecário</strong>
            <small>Biblioteca</small>
          </span>
        </div>
      </header>

      <main className="content">{children}</main>

      {/* Barra inferior (celular) */}
      <nav className="bottom-nav">
        {links.map(({ label, icon: Icon, ativo }) => (
          <a key={label} href="#" className={ativo ? "active" : ""} onClick={bloquear}>
            <Icon size={20} />
            <small>{label}</small>
          </a>
        ))}
      </nav>
    </div>
  );
}
