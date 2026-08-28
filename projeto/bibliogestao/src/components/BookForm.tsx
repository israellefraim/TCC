import { useState } from "react";
import { supabase } from "../lib/supabase-client.ts";

function BookForm() {
    const [isbn, setISBN] = useState("");
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [edition, setEdition] = useState("");
    const [language, setLanguage] = useState("");
    const [publicationYear, setPublicationYear] = useState("");
    const [numberBooksInserted, setNumberBooksInserted] = useState("");
    const [condition, setCondition] = useState("");

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
      <h1>BOOK INSERT</h1>
      <br></br>
      <form onSubmit={sendForm}>
        {/* ISBN -- Required Text MaxLength=13 */}
        <div className="mb-3">
          <label htmlFor="inputISBN" className="form-label">ISBN</label>
          <input required type="text" maxLength={13} className="form-control" id="inputISBN" value={isbn} onChange={(event) => setISBN(event.target.value)}/>
        </div>
        {/* Title -- Required */}
        <div className="mb-3">
          <label htmlFor="inputTitle" className="form-label">Título</label>
          <input required type="text" className="form-control" id="inputTitle" value={title} onChange={(event) => setTitle(event.target.value)}/>
        </div>
        {/* Subtitle input */}
        <div className="mb-3">
          <label htmlFor="inputSubtitle" className="form-label">Subtítulo</label>
          <input type="text" className="form-control" id="inputSubtitle" value={subtitle} onChange={(event) => setSubtitle(event.target.value)}/>
        </div>
        {/* Edition -- Number */}
        <div className="mb-3">
          <label htmlFor="inputEdition" className="form-label">Edição</label>
          <input type="number" className="form-control" id="inputEdition" value={edition} onChange={(event) => setEdition(Number(event.target.value))}/>
        </div>
        {/* Language input */}
        <div className="mb-3">
          <label htmlFor="inputLanguage" className="form-label">Idioma</label>
          <input type="text" className="form-control" id="inputLanguage" value={language} onChange={(event) => setLanguage(event.target.value)}/>
        </div>
        {/* Publication Year -- Number Min=1000 Max=9999 */}
        <div className="mb-3">
          <label htmlFor="inputPublicationYear" className="form-label">Ano de Publicação</label>
          <input type="number" min={1000} max={9999} className="form-control" id="inputPublicationYear" value={publicationYear} onChange={(event) => setPublicationYear(Number(event.target.value))}/>
        </div>
        {/* Books Qty. -- Number */}
        <div className="mb-3">
          <label htmlFor="inputNumberBooksInserted" className="form-label">Quantidade de livros a ser inseridos</label>
          <input type="number" className="form-control" id="inputNumberBooksInserted" value={numberBooksInserted} onChange={(event) => setNumberBooksInserted(Number(event.target.value))}/>
        </div>
        {/* Condition -- Number */}
        <div className="mb-3">
          <label htmlFor="inputCondition" className="form-label">Condição (0-5)</label>
          <input type="range" className="form-range" min="0" max="5" id="inputCondition" value={condition} onChange={(event) => setCondition(Number(event.target.value))}/>
          <div id="emailHelp" className="form-text">0 - Irrecuperável; 1 - Condição Precária; 2 - Desgastado; 3 - Condição regular; 4 - Bem conservado; 5 - Novo</div>
        </div>
        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>
    </>
    )
}    

export default BookForm;
