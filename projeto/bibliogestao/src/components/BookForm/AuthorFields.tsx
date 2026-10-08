interface AuthorFieldsProps {
  authorFullName: string[];
  setAuthorFullName: React.Dispatch<React.SetStateAction<string[]>>;
}

function AuthorFields({
  authorFullName,
  setAuthorFullName,
}: AuthorFieldsProps) {

  function addAuthor() {
    setAuthorFullName([...authorFullName, ""]);
  }

  function handleAuthorChange(index: number, value: string) {
    const newAuthors = [...authorFullName];
    newAuthors[index] = value;

    setAuthorFullName(newAuthors);
  }

  function removeAuthor(index: number) {
    const newAuthors = authorFullName.filter((_, i) => i != index);

    setAuthorFullName(newAuthors);
  }

  return (
    <fieldset className="fieldset-bibliogestao">

      <legend className="float-none w-auto px-2 legend-bibliogestao">
        Autoria
      </legend>

      {authorFullName.map((author, index) => (
        <div className="mb-4" key={index}>

          <label
            htmlFor={`author-${index}`}
            className="form-label label-bibliogestao"
          >
            Autor {index + 1}
          </label>

          <div className="d-flex gap-2">

            <input
              className="form-control campo-bibliogestao meu-placeholder"
              list="datalistOptions"
              id={`author-${index}`}
              placeholder="Digite o nome do autor..."
              value={author}
              onChange={(event) =>
                handleAuthorChange(index, event.target.value)
              }
            />

            {index > 0 && (
              <button
                type="button"
                className="btn btn-outline-danger rounded-4 px-4"
                onClick={() => removeAuthor(index)}
              >
                Remover
              </button>
            )}

          </div>
        </div>
      ))}

      <button
        className="btn text-white rounded-4"
        type="button"
        style={{ backgroundColor: "#1A335B" }}
        onClick={addAuthor}
      >
        + Adicionar outro autor
      </button>

      <datalist id="datalistOptions"></datalist>
    </fieldset>
  );
}

export default AuthorFields;