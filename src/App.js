import './App.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import apiTheMovieDb from './services/apiTheMovieDb';

const initialData = {
  image: '',
  title:  '',
  synopsis: '',
  releaseDate: '',
}

function App() {

  const [movies, setMovies] = useState(initialData);

  async function getDataFromApi() {

    const response = await apiTheMovieDb.get(`/upcoming?api_key=fe65f8e840e15d06c5c00bf13084da74&language=pt-BR&page=1`);

    console.log(response.data);
    if (response.data.length) {
      setMovies(initialData);
    }

  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          testetesteteste
        </p>
        { movies.map((movie, key) => (
          <span>{movie.results.title}</span>
        )) }
        <button
          type="button"
          onClick={(e) => getDataFromApi()}
          className="btn btn-success btn-100"
          >
          Conhecer Filmes
        </button>
      </header>
    </div>
  );
}

export default App;
