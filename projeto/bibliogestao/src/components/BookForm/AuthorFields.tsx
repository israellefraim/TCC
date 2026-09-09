interface AuthorFieldsProps {
    authorFullName: string;
    setAuthorFullName: React.Dispatch<React.SetStateAction<string>>;
}

function AuthorFields ({
    authorFullName,
    setAuthorFullName,
}: AuthorFieldsProps) {  

    return (
        <>
        {/* AUTHOR FIELD */}
        <fieldset className="border border-dark p-3 rounded mb-3">
          <legend className="float-none w-auto px-2">Autoria</legend>
        </fieldset>
        </>
    )
}


export default AuthorFields;