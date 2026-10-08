import logonova from "../../assets/logonova.png";
import { useState } from "react";
import { supabase } from "../../lib/supabase-client";

import BookFields from "./BookFields";
import AuthorFields from "./AuthorFields";
import PublisherFields from "./PublisherFields";
import CollectionFields from "./CollectionFields";

import { findOrCreatePublisher } from "../../services/publisherService";
import { findOrCreateAuthors } from "../../services/authorService";
import { findOrCreateGenres } from "../../services/genreService";

function BookForm() {
  // Book
  const [isbn, setISBN] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [edition, setEdition] = useState(1);
  const [language, setLanguage] = useState("");
  const [publicationYear, setPublicationYear] = useState(2026);

  // Genres
  const [genres, setGenres] = useState<string[]>([]);
  const [inputGenres, setInputGenres] = useState("");

  // Author
  const [authorFullName, setAuthorFullName] = useState<string[]>([""]);

  // Publisher
  const [publisherName, setPublisherName] = useState("");
  const [publisherCountry, setPublisherCountry] = useState("");

  // Collection
  const [numberBooksInserted, setNumberBooksInserted] = useState(1);
  const [bookConditions, setBookConditions] = useState<number[]>([
    0,
    0,
    0,
    0,
    0,
    0,
  ]);

  async function sendForm(event: React.SubmitEvent) {
    event.preventDefault();

    const totalDistributed = bookConditions.reduce(
      (total, quantity) => total + quantity,
      0
    );

    if (totalDistributed !== numberBooksInserted) {
      console.log("A quantidade de livros não confere!");
      return;
    }

    const conditionsObject = Object.fromEntries(
      bookConditions.map((quantity, index) => [
        `condition_${index}`,
        quantity,
      ])
    );

    const publisherId = await findOrCreatePublisher(
      publisherName,
      publisherCountry
    );

    const authorIds = await findOrCreateAuthors(authorFullName);

    const genreIds = await findOrCreateGenres(genres);

    const newBook = {
      publisher_id: publisherId,
      isbn: isbn,
      title: title,
      subtitle: subtitle,
      edition: edition,
      language: language,
      publication_year: publicationYear,
      stock_quantity: numberBooksInserted,
      conditions: conditionsObject,
    };

    const { data, error } = await supabase
      .from("Books")
      .insert(newBook)
      .select("id")
      .single();

    if (error) {
      console.error("Erro ao cadastrar:", error);
      return;
    }

    const bookId = data.id;

    const bookAuthors = authorIds.map((authorId) => ({
      book_id: bookId,
      author_id: authorId,
    }));

    const bookGenres = genreIds.map((genreId) => ({
      book_id: bookId,
      genre_id: genreId,
    }));

    const { error: bookAuthorsError } = await supabase
      .from("BookAuthors")
      .insert(bookAuthors);

    if (bookAuthorsError) {
      console.error("Error BookAuthors:", bookAuthorsError);
      return;
    }

    const { error: bookGenresError } = await supabase
      .from("BookGenres")
      .insert(bookGenres);

    if (bookGenresError) {
      console.error("Error BookGenres:", bookGenresError);
      return;
    }

    return;
  }

  return (
    <>
      <style>
        {`
          .meu-placeholder::placeholder {
            color: #adacac;
            font-size: 17px;
          }

          .font-input {
            font-size: 17px;
          }

          .campo-bibliogestao {
            border-radius: 16px !important;
            font-size: 17px;
            padding: 12px 16px;
          }

          .fieldset-bibliogestao {
            border: 1px solid #dee2e6 !important;
            border-radius: 20px !important;
            padding: 25px !important;
            margin-bottom: 25px;
          }

          .legend-bibliogestao {
            font-weight: 700;
            color: #1A335B;
            font-size: 20px;
          }

          .label-bibliogestao {
            font-weight: 600;
            margin-bottom: 8px;
          }

          .botao-bibliogestao {
            background-color: #1A335B !important;
            border-color: #1A335B !important;
          }

          .botao-bibliogestao:hover {
            background-color: #0f1c35 !important;
            border-color: #0f1c35 !important;
          }
        `}
      </style>

      <div
        className="container-fluid min-vh-100 d-flex justify-content-center py-5"
        style={{ backgroundColor: "#0f1c35" }}
      >
        <div
          className="bg-light p-5 shadow-lg"
          style={{
            width: "700px",
            maxWidth: "95%",
            borderRadius: "30px",
          }}
        >
          <div className="text-center mb-4">
    <img
        src={logonova}
        alt="Logo BiblioGestão"
        style={{
            width: "90px",
            borderRadius: "22px"
        }}
    />
</div>
          <div className="mb-4">
            <h1 className="text-center fw-bold mb-2">
              Cadastro de Livros
            </h1>

            <p className="text-center text-secondary">
              Preencha as informações para cadastrar uma nova obra no acervo.
            </p>
          </div>

          <form onSubmit={sendForm}>
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
              genres={genres}
              setGenres={setGenres}
              inputGenres={inputGenres}
              setInputGenres={setInputGenres}
            />

            <AuthorFields
              authorFullName={authorFullName}
              setAuthorFullName={setAuthorFullName}
            />

            <PublisherFields
              publisherName={publisherName}
              setPublisherName={setPublisherName}
              publisherCountry={publisherCountry}
              setPublisherCountry={setPublisherCountry}
            />

            <CollectionFields
              numberBooksInserted={numberBooksInserted}
              setNumberBooksInserted={setNumberBooksInserted}
              bookConditions={bookConditions}
              setBookConditions={setBookConditions}
            />

            <button
              type="submit"
              className="btn btn-lg w-100 rounded-4 text-white botao-bibliogestao"
            >
              Cadastrar livro
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default BookForm;