import { useState } from "react";

function ListGroup() {
  const movies = [
    "How To Train Your Dragon I",
    "Pulp Fiction",
    "The Dark Knight",
    "Kill Bill Vol. II",
    "Mônica's Ganga",
  ];
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h1>List</h1>
      <ul className="list-group">
        {movies.map((movie, index) => (
          <li
            className={
              selectedIndex == index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={movie}
            onClick={() => setSelectedIndex(index)}
          >
            {movie}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
