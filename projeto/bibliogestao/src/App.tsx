import "./App.css";
import BookForm from "./components/BookForm/BookForm";
//import LoginForm from "./components/LoginForm";

function App() {
  const movies = [
    "How To Train Your Dragon I",
    "Pulp Fiction",
    "The Dark Knight",
    "Kill Bill Vol. II",
    "Mônica's Ganga",
  ];

  //return <LoginForm/> 
  return <BookForm/> //<ListGroup items={movies} heading="Movies" />; 
}

export default App;
