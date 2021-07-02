import './App.css';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import apiTheMovieDb from './services/apiTheMovieDb';

function App() {

  const [movies, setMovies] = useState([]);
  const defaultPath = 'http://image.tmdb.org/t/p/w185/';

  async function getDataFromApi() {

    const response = await apiTheMovieDb.get(`/upcoming?api_key=fe65f8e840e15d06c5c00bf13084da74&language=pt-BR&page=1`);

    console.log(response.data);
    if (response.data) {
      setMovies(response.data.results);
    }

    console.log(movies)

  }

  useEffect(() => {
    try {
      getDataFromApi();
    } catch (error) {
      console.log('error: ', error);
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
      <div class="row">
        {movies.map(item => (
          <div class="col-lg-3">
            <div class="image">
              <img src={defaultPath + item.poster_path}/>
            </div>
            <span>{item.title}</span>
          </div>
        ))}
      </div>
      </header>
    </div>
  );
}

export default App;