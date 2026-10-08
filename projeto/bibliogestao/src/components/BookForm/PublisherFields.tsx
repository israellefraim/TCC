interface PublisherFieldsProps {
  publisherName: string;
  setPublisherName: React.Dispatch<React.SetStateAction<string>>;
  publisherCountry: string;
  setPublisherCountry: React.Dispatch<React.SetStateAction<string>>;
}

function PublisherFields({
  publisherName,
  setPublisherName,
  publisherCountry,
  setPublisherCountry,
}: PublisherFieldsProps) {

  return (
    <fieldset className="fieldset-bibliogestao">

      <legend className="float-none w-auto px-2 legend-bibliogestao">
        Editora
      </legend>

      <div className="mb-4">

        <label
          htmlFor="inputPublisherName"
          className="form-label label-bibliogestao"
        >
          Nome da Editora
        </label>

        <input
          required
          type="text"
          className="form-control campo-bibliogestao meu-placeholder"
          id="inputPublisherName"
          placeholder="Digite o nome da editora"
          value={publisherName}
          onChange={(event) => setPublisherName(event.target.value)}
        />

      </div>

      <div className="mb-2">

        <label
          htmlFor="inputPublisherCountry"
          className="form-label label-bibliogestao"
        >
          País de Origem
        </label>

        <input
          required
          type="text"
          className="form-control campo-bibliogestao meu-placeholder"
          id="inputPublisherCountry"
          placeholder="Digite o país de origem"
          value={publisherCountry}
          onChange={(event) => setPublisherCountry(event.target.value)}
        />

      </div>

    </fieldset>
  );
}

export default PublisherFields;