function BookForm() {
    return (
    <>
    <h1>BOOK INSERT</h1>
    <br></br>

    <form>
      <div className="mb-3">
        <label htmlFor="inputISBN" className="form-label">ISBN</label>
        <input type="number" className="form-control" id="inputISBN"/>
      </div>
      <div className="mb-3">
        <label htmlFor="inputTitle" className="form-label">Título</label>
        <input type="text" className="form-control" id="inputTitle"/>
      </div>
      <div className="mb-3">
        <label htmlFor="inputSubtitle" className="form-label">Subtítulo</label>
        <input type="text" className="form-control" id="inputSubtitle"/>
      </div>
      <div className="mb-3">
        <label htmlFor="inputEdition" className="form-label">Edição</label>
        <input type="number" className="form-control" id="inputEdition"/>
      </div>
      <div className="mb-3">
        <label htmlFor="inputLanguage" className="form-label">Idioma</label>
        <input type="text" className="form-control" id="inputLanguage"/>
      </div>
      <div className="mb-3">
        <label htmlFor="inputPublicationYear" className="form-label">Ano de Publicação</label>
        <input type="number" className="form-control" id="PublicationYear"/>
      </div>
      <div className="mb-3">
        <label htmlFor="inputEdition" className="form-label">Quantidade de livros a ser inseridos</label>
        <input type="number" className="form-control" id="inputEdition"/>
      </div>
      <div className="mb-3">
        <label htmlFor="inputCondition" className="form-label">Condição (0-5)</label>
        <input type="range" className="form-range" min="0" max="5" id="inputCondition"/>
        <div id="emailHelp" className="form-text">0 - Irrecuperável/Deterioração extrema; 1 - Condição Precária; 2 - Pouco Desgastado; 3 - Condição regular; 4 - Bem conservado; 5 - Novo</div>
      </div>
      <button type="submit" className="btn btn-primary">Enviar</button>
    </form>
    </>
    )
}    

export default BookForm;
