import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiTheMovieDb from '../../services/apiTheMovieDb';
import styled from "styled-components";

import { Link } from "react-router-dom";

import moment from 'moment';

import 'bootstrap/dist/css/bootstrap.css';

const MasterContainer = styled.div`
    @media only screen and (min-width: 992px) {
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
        display: flex;
        background-color: #2c3949;
        align-items: center;
    }
    color: #fff;
`;


export default function FullMoviePage() {

    const [movie, setMovie] = useState([]);
    const defaultPath = 'https://image.tmdb.org/t/p/original';
    const bannerPath = 'http://image.tmdb.org/t/p/w300/';

    let { movieId } = useParams();

    async function getDataFromApi() {

        const response = await apiTheMovieDb.get(`movie/${movieId}?api_key=fe65f8e840e15d06c5c00bf13084da74&language=pt-BR`);

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
                <div className="row">
                    <div className="col-lg-3 d-flex flex-wrap justify-content-center align-items-center mt-4 mt-lg-0">
                        <img src={bannerPath + movie.poster_path} />
                        <span className="movie-subtitle my-3">{movie.tagline}</span>
                    </div>
                    <div className="col-lg-9 position-relative d-flex flex-wrap align-items-end">
                        <div className="bottom-0 flex-column d-flex flex-wrap justify-content-end">
                            <h3 className="mb-2 mt-4 mt-lg-0 text-center text-lg-start"><i>{movie.title}</i></h3>
                            {/* { movie.genres !== 0 && (
                                <>
                                    <div className="genres d-block mb-4">
                                        {movie.genres.map(genre => (
                                            <span className="custom-spaces">{genre.name}</span>
                                        ))}
                                    </div>
                                </>
                            )} */}
                            <div className="movie-description text-sm-center text-lg-start mb-4">
                                {movie.overview}
                            </div>
                            <div className="row">
                                { movie.runtime !== 0 && (
                                    <div className="col-sm-6 col-md-3 mt-sm-4 mt-lg-0 text-center">
                                        <span className="d-block" style={{fontStyle: "italic", fontWeight: "700"}}>Tempo de Dura????o:</span>
                                        <span className="d-block">{movie.runtime}m</span>
                                    </div>
                                )}
                                { movie.release_date !== 0 && (
                                    <div className="col-sm-6 col-md-3 mt-sm-4 mt-lg-0 text-center">
                                        <span className="d-block" style={{fontStyle: "italic", fontWeight: "700"}}>Data de Lan??amento:</span>
                                        <span className="d-block">{moment(`${movie.release_date}`).format("D/M/YYYY")}</span>
                                    </div>
                                )}
                                { movie.original_language !== 0 && (
                                    <div className="col-sm-6 col-md-3 mt-sm-4 mt-lg-0 text-center">
                                        <span className="d-block" style={{fontStyle: "italic", fontWeight: "700"}}>??udio Original:</span>
                                        <span className="d-block text-uppercase">{movie.original_language}</span>
                                    </div>
                                )}
                                { movie.vote_average !== 0 && (
                                    <div className="col-sm-6 col-md-3 mt-sm-4 mt-lg-0 text-center">
                                        <span className="d-block" style={{fontStyle: "italic", fontWeight: "700"}}>Classifica????o:</span>
                                        <span className="d-block">{movie.vote_average}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <Link to='/' className="btn btn-light back-btn text-center mt-5 text-center mb-sm-5 mb-lg-0">
                        Voltar para p??gina inicial
                    </Link>
                </div>
            </div>
        </MasterContainer>
    );
}
