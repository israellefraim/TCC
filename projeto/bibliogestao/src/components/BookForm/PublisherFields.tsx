interface PublisherFieldsProps {
    publisherName: string;
    setPublisherName: React.Dispatch<React.SetStateAction<string>>;
    publisherCNPJ: string;
    setPublisherCNPJ: React.Dispatch<React.SetStateAction<string>>;
    publisherCountry: string;
    setPublisherCountry: React.Dispatch<React.SetStateAction<string>>;
}

function PublisherFields ({
    publisherName,
    setPublisherName,
    publisherCNPJ,
    setPublisherCNPJ,
    publisherCountry,
    setPublisherCountry,
}) {

    return (
        <>
        <fieldset className="border border-dark p-3 rounded mb-3">
          <legend className="float-none w-auto px-2">Editora</legend>
          {/* Publisher Name -- Required */}
          <div className="mb-3">
            <label htmlFor="inputPublisherName" className="form-label">Nome da Editora</label>
            <input required type="text" className="form-control" id="inputPublisherName" value={publisherName} onChange={(event) => setPublisherName(event.target.value)}/>
          </div>
          {/* Publisher CNPJ -- Required */}
          <div className="mb-3">
            <label htmlFor="inputPublisherCNPJ" className="form-label">CNPJ</label>
            <input required type="text" className="form-control" id="inputPublisherCNPJ" value={publisherCNPJ} onChange={(event) => setPublisherCNPJ(event.target.value)}/>
          </div>
          {/* Publisher Country -- Required */}
          <div className="mb-3">
            <label htmlFor="inputPublisherCountry" className="form-label">País de Origem</label>
            <input required type="text" className="form-control" id="inputPublisherCountry" value={publisherCountry} onChange={(event) => setPublisherCountry(event.target.value)}/>
          </div>
        </fieldset>
        </>
    )

}

export default PublisherFields;