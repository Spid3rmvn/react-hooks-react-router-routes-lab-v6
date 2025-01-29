import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";

function Movie() {
  const [movie, setMovie] = useState(null); // Start with null to avoid issues
  const { id: movieId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/movies/${movieId}`)
      .then((r) => r.json())
      .then((data) => {
        console.log("Fetched movie:", data); // Debugging
        setMovie(data);
      })
      .catch((error) => console.error("Fetch error:", error));
  }, [movieId]);

  if (!movie) {
    return <h1>Loading...</h1>;
  }

  // Ensure genres is not undefined before mapping
  const genres = movie.genres
    ? movie.genres.map((genre) => <span key={genre}>{genre} </span>)
    : null;

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <h1>{movie.title}</h1>
        <p>{movie.time}</p>
        {genres}
      </main>
    </>
  );
}

export default Movie;
