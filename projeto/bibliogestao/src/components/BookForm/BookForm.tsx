import { useState } from "react";
import { supabase } from "../../lib/supabase-client.ts";

import BookFields from "./BookFields.tsx";
import AuthorFields from "./AuthorFields.tsx";

function BookForm() {
    const [isbn, setISBN] = useState("");
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [edition, setEdition] = useState(1);
    const [language, setLanguage] = useState("");
    const [publicationYear, setPublicationYear] = useState(2026);
    const [numberBooksInserted, setNumberBooksInserted] = useState(1);
    
    const [authorFullName, setAuthorFullName] = useState("");
    
    const [publisherName, setPublisherName] = useState("");
    const [publisherCNPJ, setPublisherCNPJ] = useState("");
    const [publisherCountry, setPublisherCountry] = useState("");
    
    const [genres, setGenres] = useState<string[]>([]);

    const [condition, setCondition] = useState(0);

    async function sendForm(event: React.FormEvent) {
      event.preventDefault();
      
      const newBook = {
        isbn: isbn,
        title: title,
        subtitle: subtitle,
        edition: edition,
        language: language,
        publication_year: publicationYear,
        //numberBooksInserted,
        condition: condition
      }

      const { data, error } = await supabase
        .from("Books")
        .insert(newBook)

      if (error) {
        console.error("Erro ao cadastrar:", error);
        return;
      }

      console.log("Livro cadastrado!");
    }

    return (
    <>
      <h1>Cadastro de Livros</h1>
      <br></br>
      <form onSubmit={sendForm}>

        {/* BOOKS FIELD */}
        <BookFields 
          isbn={isbn}
          setISBN={setISBN}
          title={title}
          setTitle={setTitle}
          subtitle={subtitle} 
          setSubtitle={setSubtitle}
          edition={edition}
          setEdition={setEdition}
          language={language}
          setLanguage={setLanguage}
          publicationYear={publicationYear}
          setPublicationYear={setPublicationYear}
        />

        {/* AUTHOR FIELD */}
        <AuthorFields />

        {/* PUBLISHERS FIELD */}
        <fieldset className="border border-dark p-3 rounded mb-3">
          <legend className="float-none w-auto px-2">Editora</legend>
        </fieldset>

        {/* COLLECTION FIELD */}
        <fieldset className="border border-dark p-3 rounded mb-3">
          <legend className="float-none w-auto px-2">Acervo</legend>
          {/* Condition -- Number */}
          <div className="mb-3">
            <label htmlFor="inputCondition" className="form-label">Condição (0-5)</label>
            <input type="range" className="form-range" min="0" max="5" id="inputCondition" value={condition} onChange={(event) => setCondition(Number(event.target.value))}/>
            <div id="emailHelp" className="form-text">0 - Irrecuperável; 1 - Condição Precária; 2 - Desgastado; 3 - Condição regular; 4 - Bem conservado; 5 - Novo</div>
          </div>
          {/* Books Qty. -- Number */}
          <div className="mb-3">
            <label htmlFor="inputNumberBooksInserted" className="form-label">Quantidade de livros a ser inseridos</label>
            <input type="number" className="form-control" id="inputNumberBooksInserted" value={numberBooksInserted} onChange={(event) => setNumberBooksInserted(Number(event.target.value))}/>
          </div>
        </fieldset>

        <button type="submit" className="btn btn-primary">Enviar</button>
        
      </form>
      <br></br>
    </>
    )
}    

export default BookForm;
