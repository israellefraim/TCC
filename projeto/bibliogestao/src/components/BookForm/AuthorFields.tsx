interface AuthorFieldsProps {
    authorFullName: string[];
    setAuthorFullName: React.Dispatch<React.SetStateAction<string[]>>;
}

function AuthorFields ({
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

    return (
        <>
        {/* AUTHOR FIELD */}
        <fieldset className="border border-dark p-3 rounded mb-3">
            <legend className="float-none w-auto px-2">
                Autoria
            </legend>

            {authorFullName}
            <div className="input-group mb-3">
                <label htmlFor="inputGroupSelect01" className="input-group-text">Autor 1</label>
                    <input className="form-control" list="datalistOptions" id="inputGroupSelect01" placeholder="Digite o nome do autor..."/>
                    <datalist id="datalistOptions">
                    <option value="San Francisco"/>
                    <option value="New York"/>
                    <option value="Seattle"/>
                    <option value="Los Angeles"/>
                    <option value="Chicago"/>
                    </datalist>                
            </div>
            <div className="d-grip gap-2">
                <button className="btn btn-primary" type="button">+ Adicionar outro autor</button>
            </div>
        </fieldset>
        </>
    )
}


export default AuthorFields;