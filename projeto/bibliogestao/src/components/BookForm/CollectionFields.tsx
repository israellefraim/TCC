interface CollectionFieldsProps {
  numberBooksInserted: number;
  setNumberBooksInserted: React.Dispatch<React.SetStateAction<number>>;
  bookConditions: number[];
  setBookConditions: React.Dispatch<React.SetStateAction<number[]>>;
}

const conditions = [
  {
    number: 0,
    name: "Irrecuperável",
    description: "Sem condição de uso.",
  },
  {
    number: 1,
    name: "Precária",
    description: "Apresenta muitos sinais de uso e danos.",
  },
  {
    number: 2,
    name: "Desgastado",
    description: "Apresenta sinais de desgaste.",
  },
  {
    number: 3,
    name: "Regular",
    description: "Condição aceitável, com sinais normais de uso.",
  },
  {
    number: 4,
    name: "Bem conservado",
    description: "Pouco sinais de uso, ótimo estado.",
  },
  {
    number: 5,
    name: "Novo",
    description: "Sem sinais de uso.",
  },
];

function CollectionFields({
  numberBooksInserted,
  setNumberBooksInserted,
  bookConditions,
  setBookConditions,
}: CollectionFieldsProps) {

  const totalDistributed = bookConditions.reduce(
    (total, quantity) => total + quantity,
    0
  );

  function handleConditionChange(
    conditionNumber: number,
    quantity: number
  ) {
    const newConditions = [...bookConditions];

    newConditions[conditionNumber] = quantity;

    setBookConditions(newConditions);
  }

  return (
    <fieldset className="fieldset-bibliogestao">

      <legend className="float-none w-auto px-2 legend-bibliogestao">
        Acervo
      </legend>

      <div className="mb-5">

        <label
          htmlFor="inputNumberBooksInserted"
          className="form-label label-bibliogestao"
        >
          Quantidade total de livros a ser inseridos
        </label>

        <input
          type="number"
          className="form-control campo-bibliogestao"
          id="inputNumberBooksInserted"
          min="1"
          value={numberBooksInserted}
          onChange={(event) =>
            setNumberBooksInserted(Number(event.target.value))
          }
        />

      </div>

      <div className="d-flex fw-bold fs-5 mb-2">
        <div className="flex-grow-1">
          Condição
        </div>

        <div className="text-start flex-shrink-0">
          Quantidade
        </div>
      </div>

      {conditions.map((condition) => (
        <div
          key={condition.number}
          className="d-flex align-items-center border-bottom py-3"
        >

          <span
            className="badge fs-6"
            style={{
              backgroundColor: "#1A335B",
              minWidth: "35px",
              borderRadius: "10px",
            }}
          >
            {condition.number}
          </span>

          <div
            className="flex-grow-1 px-3"
            style={{ minWidth: 0 }}
          >
            <strong>
              {condition.name}
            </strong>

            <div className="text-muted small">
              {condition.description}
            </div>
          </div>

          <div style={{ width: "90px" }}>
            <input
              type="number"
              className="form-control campo-bibliogestao"
              min="0"
              value={bookConditions[condition.number]}
              onChange={(event) =>
                handleConditionChange(
                  condition.number,
                  Number(event.target.value)
                )
              }
            />
          </div>

        </div>
      ))}

      <div className="text-end mt-4">
        <strong>
          Total distribuído: {totalDistributed} / {numberBooksInserted}
        </strong>
      </div>

      {totalDistributed === numberBooksInserted && (
        <div className="text-success text-end mt-2">
          ✅ Quantidades conferem
        </div>
      )}

      {totalDistributed !== numberBooksInserted && (
        <div className="text-danger text-end mt-2">
          ⚠️ Quantidade não confere
        </div>
      )}

    </fieldset>
  );
}

export default CollectionFields;