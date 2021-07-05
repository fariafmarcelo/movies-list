import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import 'bootstrap/dist/css/bootstrap.css';

import apiTheMovieDb from '../../services/apiTheMovieDb';

import { Link } from "react-router-dom";

function App() {

  const [movies, setMovies] = useState([]);
  const defaultPath = 'https://image.tmdb.org/t/p/original';

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
      <div className="container">
        <div className="row">
          {movies.map(item => (
            <div className="col-6 col-sm-6 col-md-4 col-lg-3 d-flex py-3">
              <div className="position-relative image">
                <Link to={`/sobre-o-filme/${item.id}`}>
                  <img className="img-fluid" src={defaultPath + item.poster_path}/>
                  { item.vote_average !== 0 && (
                    <>
                      <span className="review-label d-flex justify-content-between align-items-center">
                        <FontAwesomeIcon icon={faStar}/>
                        { item.vote_average.toFixed(1) }
                      </span>
                    </>
                  )}
                </Link>
              </div>
              {/* <FullMoviePage title={item.title} overview={item.overview} release={item.release_date} /> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;