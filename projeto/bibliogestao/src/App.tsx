import ListGroup from "./components/ListGroup";

function App() {
  const movies = [
    "How To Train Your Dragon I",
    "Pulp Fiction",
    "The Dark Knight",
    "Kill Bill Vol. II",
    "Mônica's Ganga",
  ];

  return <ListGroup items={movies} heading="Movies" />;
}

export default App;