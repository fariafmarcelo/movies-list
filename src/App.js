import './App.css';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
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
      </header>
      <div class="container">
        <div class="row">
          {movies.map(item => (
            <div class="col-sm-12 col-md-6 col-lg-12 d-flex py-3">
              <div class="col-lg-2 position-relative image">
                <img class="img-fluid" src={defaultPath + item.poster_path}/>
                { item.vote_average !== 0 && (
                  <>
                    <span class="review-label d-flex justify-content-between align-items-center">
                      <FontAwesomeIcon icon={faStar}/>
                      { item.vote_average.toFixed(1) }
                    </span>
                  </>
                )}
              </div>
              <div className="col-lg-10 movie-thumb">
                <h3>{item.title}</h3>
                <span class="d-block"><b>Sinopse</b>: {item.overview}</span>
                <span class="d-block"><b>Data de Lançamento</b>: {item.release_date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;