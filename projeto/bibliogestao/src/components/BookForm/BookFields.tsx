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
}

function BookFields ({ 
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
}: BooksFieldProps) {

    return (
        <>
            <fieldset className="border border-dark p-3 rounded mb-3">
              <legend className="float-none w-auto px-2">Informações da Obra</legend>
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
            </fieldset>
        </>
    )
}

export default BookFields;