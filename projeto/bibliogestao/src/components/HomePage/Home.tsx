import type { FormEvent, MouseEvent } from "react";
import { Button } from "react-bootstrap";
import {
  Search,
  Camera,
  Plus,
  UpcScan,
  ChevronRight,
  BookHalf,
  BarChartFill,
} from "react-bootstrap-icons";
import Layout from "../Layout";
import "./home.css";

function saudacao() {
  const h = new Date().getHours();
  if (h < 12) return "Bom dia";
  if (h < 18) return "Boa tarde";
  return "Boa noite";
}

// Versão só visual: nenhum botão faz nada ainda
const bloquear = (e: MouseEvent | FormEvent) => e.preventDefault();

export default function Home() {
  return (
    <Layout>
      {/* 1. Cabeçalho */}
      <section className="home-header">
        <p className="saudacao">{saudacao()}, bibliotecário.</p>
        <h1>O que você procura hoje?</h1>
      </section>

      {/* 2. Busca */}
      <form className="busca" onSubmit={bloquear} role="search">
        <div className="busca-campo">
          <Search size={18} />
          <input type="search" placeholder="Título, autor ou ISBN" aria-label="Pesquisar no acervo" />
        </div>
        <Button type="submit" className="btn-buscar">
          Buscar
        </Button>
      </form>

      {/* 3. Cadastro + atalhos */}
      <section className="acoes">
        <div className="card-cadastro">
          <div className="card-cadastro-topo">
            <span className="icone-caixa">
              <UpcScan size={28} />
            </span>
            <div>
              <h2>Cadastrar livro</h2>
              <p>Preencha os dados do livro para adicionar ao acervo.</p>
            </div>
          </div>

          {/* O scanner só aparece em telas de toque (celular), via CSS */}
          <div className="so-toque">
            <Button type="button" className="btn-escanear">
              <Camera size={20} /> Escanear ISBN
            </Button>
            <div className="divisor">
              <span>ou</span>
            </div>
          </div>

          <Button type="button" variant="outline-light" className="btn-manual">
            <Plus size={22} /> Cadastrar manualmente
          </Button>
        </div>

        <a href="#" className="card-atalho" onClick={bloquear}>
          <Search size={26} />
          <div>
            <strong>Consultar acervo</strong>
            <span>Pesquise e encontre livros e autores</span>
          </div>
          <ChevronRight />
        </a>

        <a href="#" className="card-atalho" onClick={bloquear}>
          <BarChartFill size={26} />
          <div>
            <strong>Relatórios</strong>
            <span>Veja estatísticas do acervo</span>
          </div>
          <ChevronRight />
        </a>
      </section>

      {/* 4. Últimos livros */}
      <section className="ultimos">
        <div className="ultimos-topo">
          <h2>
            <BookHalf size={22} /> Últimos livros cadastrados
          </h2>
          <a href="#" onClick={bloquear}>
            Ver todos
          </a>
        </div>

        <div className="vazio">
          <p>Nenhum livro cadastrado ainda.</p>
          <Button type="button" className="btn-buscar">
            <Plus size={20} /> Cadastrar o primeiro livro
          </Button>
        </div>
      </section>
    </Layout>
  );
}
