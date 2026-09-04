import BookForm from "./components/BookForm/BookForm.tsx";

function App() {
  const movies = [
    "How To Train Your Dragon I",
    "Pulp Fiction",
    "The Dark Knight",
    "Kill Bill Vol. II",
    "Mônica's Ganga",
  ];

  return <BookForm/> //<ListGroup items={movies} heading="Movies" />; 
}

export default App;