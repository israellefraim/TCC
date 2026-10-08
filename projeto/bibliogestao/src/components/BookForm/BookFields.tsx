interface BooksFieldProps {
  isbn: string;
  setISBN: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  subtitle: string;
  setSubtitle: React.Dispatch<React.SetStateAction<string>>;
  edition: number;
  setEdition: React.Dispatch<React.SetStateAction<number>>;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  publicationYear: number;
  setPublicationYear: React.Dispatch<React.SetStateAction<number>>;
  genres: string[];
  setGenres: React.Dispatch<React.SetStateAction<string[]>>;
  inputGenres: string;
  setInputGenres: React.Dispatch<React.SetStateAction<string>>;
}

function BookFields({
  isbn,
  setISBN,
  title,
  setTitle,
  subtitle,
  setSubtitle,
  edition,
  setEdition,
  language,
  setLanguage,
  publicationYear,
  setPublicationYear,
  genres,
  setGenres,
  inputGenres,
  setInputGenres,
}: BooksFieldProps) {

  const addGenre = () => {
    const genre = inputGenres.trim();

    if (!genre) return;

    if (genres.includes(genre)) {
      setInputGenres("");
      return;
    }

    setGenres([...genres, genre]);
    setInputGenres("");
  };

  const removeGenre = (genreToRemove: string) => {
    setGenres(genres.filter((genre) => genre !== genreToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addGenre();
    }
  };

  return (
    <fieldset className="fieldset-bibliogestao">

      <legend className="float-none w-auto px-2 legend-bibliogestao">
        Informações da Obra
      </legend>

      <div className="mb-4">
        <label htmlFor="inputISBN" className="form-label label-bibliogestao">
          ISBN
        </label>

        <input
          required
          type="text"
          maxLength={13}
          className="form-control campo-bibliogestao meu-placeholder"
          id="inputISBN"
          placeholder="Digite o ISBN"
          value={isbn}
          onChange={(event) => setISBN(event.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="inputTitle" className="form-label label-bibliogestao">
          Título
        </label>

        <input
          required
          type="text"
          className="form-control campo-bibliogestao meu-placeholder"
          id="inputTitle"
          placeholder="Digite o título da obra"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="inputSubtitle" className="form-label label-bibliogestao">
          Subtítulo
        </label>

        <input
          type="text"
          className="form-control campo-bibliogestao meu-placeholder"
          id="inputSubtitle"
          placeholder="Digite o subtítulo"
          value={subtitle}
          onChange={(event) => setSubtitle(event.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="inputEdition" className="form-label label-bibliogestao">
          Edição
        </label>

        <input
          type="number"
          className="form-control campo-bibliogestao"
          id="inputEdition"
          value={edition}
          onChange={(event) => setEdition(Number(event.target.value))}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="inputLanguage" className="form-label label-bibliogestao">
          Idioma
        </label>

        <input
          type="text"
          className="form-control campo-bibliogestao meu-placeholder"
          id="inputLanguage"
          placeholder="Ex.: Português"
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="inputPublicationYear"
          className="form-label label-bibliogestao"
        >
          Ano de Publicação
        </label>

        <input
          type="number"
          min={1000}
          max={9999}
          className="form-control campo-bibliogestao"
          id="inputPublicationYear"
          value={publicationYear}
          onChange={(event) =>
            setPublicationYear(Number(event.target.value))
          }
        />
      </div>

      <div className="mb-4">
        <label htmlFor="inputGenres" className="form-label label-bibliogestao">
          Gêneros
        </label>

        <div className="d-flex gap-2">
          <input
            type="text"
            className="form-control campo-bibliogestao meu-placeholder"
            id="inputGenres"
            placeholder="Digite um gênero"
            value={inputGenres}
            onKeyDown={handleKeyDown}
            onChange={(event) => setInputGenres(event.target.value)}
          />

          <button
            className="btn text-white rounded-4 px-4"
            style={{ backgroundColor: "#1A335B" }}
            type="button"
            onClick={addGenre}
          >
            Adicionar
          </button>
        </div>
      </div>

      <div className="mb-2 d-flex flex-wrap gap-2">
        {genres.map((genre) => (
          <span
            key={genre}
            className="badge fs-6 px-3 py-2"
            style={{
              backgroundColor: "#1A335B",
              borderRadius: "12px",
            }}
          >
            {genre}

            <button
              type="button"
              className="border-0 bg-transparent text-white fw-bold p-0"
              aria-label={`Remover ${genre}`}
              style={{
                fontSize: "1.1rem",
                lineHeight: 1,
                marginLeft: "8px",
              }}
              onClick={() => removeGenre(genre)}
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </fieldset>
  );
}

export default BookFields;