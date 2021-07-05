import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiTheMovieDb from '../../services/apiTheMovieDb';
import styled from "styled-components";

import moment from 'moment';

import 'bootstrap/dist/css/bootstrap.css';

const MasterContainer = styled.div`
  background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.97) 10%,
      rgba(0, 0, 0, 0.92) 20%,
      rgba(0, 0, 0, 0.92) 80%,
      rgba(0, 0, 0, 0.97) 100%
    ),
    no-repeat center center url(${(props) => props.posterPath});
  background-size: cover;
  height: 100vh;
  font-size: 1rem;
  color: white;
  display: flex;
  background-color: #2c3949;
  align-items: center;
`;


export default function FullMoviePage() {

    const [movie, setMovie] = useState([]);
    const defaultPath = 'https://image.tmdb.org/t/p/original';
    const bannerPath = 'http://image.tmdb.org/t/p/w300/';

    let { movieId } = useParams();

    async function getDataFromApi() {

        const response = await apiTheMovieDb.get(`/${movieId}?api_key=fe65f8e840e15d06c5c00bf13084da74&language=pt-BR`);

        console.log(response.data);
        if (response.data) {
            setMovie(response.data);
        }
        console.log(movie)
    }

    useEffect(() => {
        try {
            getDataFromApi();
        } catch (error) {
            console.log('error: ', error);
        }
    }, []);

    return (
        <MasterContainer posterPath={defaultPath + movie.backdrop_path}>
        <div className="container">
            {/* <img className="img-fluid" style={{ position: "fixed", maxWidth: "100vw", maxHeight: "100vh", zIndex: "-1" }} src={defaultPath + movie.backdrop_path}/> */}
            <div className="row">
                <div className="col-lg-3 d-flex flex-wrap justify-content-center align-items-center">
                    <img src={bannerPath + movie.poster_path} />
                    <span className="movie-subtitle my-3">{movie.tagline}</span>
                </div>
                <div className="col-lg-9 position-relative  d-flex flex-wrap align-items-end">
                    <div className="bottom-0 flex-column d-flex flex-wrap justify-content-end">
                        <h3 className="mb-2"><i>{movie.title}</i></h3>
                        {/* { movie.genres !== 0 && (
                            <>
                                <div className="genres d-block mb-4">
                                    {movie.genres.map(genre => (
                                        <span className="custom-spaces">{genre.name}</span>
                                    ))}
                                </div>
                            </>
                        )} */}
                        <div className="movie-description mb-4">
                            {movie.overview}
                        </div>
                        <div className="row">
                            { movie.runtime !== 0 && (
                                <div className="col text-center">
                                    <span className="d-block" style={{fontStyle: "italic", fontWeight: "700"}}>Tempo de Duração:</span>
                                    <span className="d-block">{movie.runtime}m</span>
                                </div>
                            )}
                            { movie.release_date !== 0 && (
                                <div className="col text-center">
                                    <span className="d-block" style={{fontStyle: "italic", fontWeight: "700"}}>Data de Lançamento:</span>
                                    <span className="d-block">{moment(`${movie.release_date}`).format("D/M/YYYY")}</span>
                                </div>
                            )}
                            { movie.original_language !== 0 && (
                                <div className="col text-center">
                                    <span className="d-block" style={{fontStyle: "italic", fontWeight: "700"}}>Áudio Original:</span>
                                    <span className="d-block text-uppercase">{movie.original_language}</span>
                                </div>
                            )}
                            { movie.vote_average !== 0 && (
                                <div className="col text-center">
                                    <span className="d-block" style={{fontStyle: "italic", fontWeight: "700"}}>Classificação:</span>
                                    <span className="d-block">{movie.vote_average}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </MasterContainer>
    );
}