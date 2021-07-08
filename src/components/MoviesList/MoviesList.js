import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import apiTheMovieDb from '../../services/apiTheMovieDb';

import { Link } from "react-router-dom";

const searchData = {
    text: '',
};

function App() {

    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState(searchData);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [showPagination, setShowPagination] = useState(true);

    const defaultPath = 'https://image.tmdb.org/t/p/w300';
    const API_KEY = process.env.REACT_APP_API_KEY;

    async function getDataFromApi() {

        const response = await apiTheMovieDb.get(`/movie/upcoming?api_key=${API_KEY}&language=pt-BR&page=${currentPage}`);

        if (response.data) {
            setMovies(response.data.results);
            setTotalPages(response.data.total_pages);
        }

    }

    async function sOnChange(e) {

        const { name, value } = e.target;
        setSearch(value);

        if (value == '') {
            getDataFromApi();
            setShowPagination(true);
        } else {
            setShowPagination(false);
            const searchResponse = await apiTheMovieDb.get(`/search/movie?api_key=${API_KEY}&query=${value}&language=pt-BR&`);
            if (searchResponse.data.results) {
                console.log(searchResponse.data.results);
                setMovies(searchResponse.data.results);
            }
        }
    }

    function nextPage() {
        if ( currentPage < totalPages ) {
            let page = currentPage + 1;
            setCurrentPage(page);
        }
    }

    function previousPage() {
        if (currentPage > 1) {
            let page = currentPage - 1;
            setCurrentPage(page);
        }
    }

    useEffect(() => {
        getDataFromApi();
        window.scrollTo(0, 0);
    }, [currentPage]);

    useEffect(() => {
        try {
            getDataFromApi();
        } catch (error) {
            console.log('error: ', error);
        }
    }, []);

    return (
        <div className="App">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container d-lg-flex justify-content-lg-between">
                    <Link to='/' className="navbar-brand">Busca Filmes</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-lg-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                            <form action="">
                                <div className="input-field">
                                <input placeholder="Pesquisar" id="search" type="text" onChange={(e) => sOnChange(e)} value={search.text}/>
                                </div>
                            </form>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container">
                <div className="row">
                    {movies.map(item => (
                    <>
                        { item.poster_path && (
                            <div className="col-6 col-sm-6 col-md-4 col-lg-3 py-3">
                                <div className="position-relative image">
                                <Link to={`/sobre-o-filme/${item.id}`}>
                                    <img className="img-fluid" src={defaultPath + item.poster_path}/>
                                    { item.vote_average !== 0 && (
                                    <span className="review-label d-flex justify-content-between align-items-center">
                                        <FontAwesomeIcon icon={faStar}/>
                                        { item.vote_average.toFixed(1) }
                                    </span>
                                    )}
                                </Link>
                                </div>
                            </div>
                        )}
                    </>
                    ))}
                    { showPagination && (
                        <ul className="pagination justify-content-center pt-4">
                            <li className="page-item">
                                <button className="page-link" onClick={(previousPage)}>Anterior</button>
                            </li>
                            <li className="page-item">
                                <span className="page-link">
                                    {currentPage}
                                </span>
                            </li>
                            <li className="page-item">
                                <span className="page-link">
                                    ...
                                </span>
                            </li>
                            <li className="page-item">
                                <span className="page-link">
                                    {totalPages}
                                </span>
                            </li>
                            <li className="page-item">
                                <button className="page-link" onClick={nextPage}>Próxima</button>
                            </li>
                        </ul>
                    )}
                    { !movies.length && (
                        <div className="text-white text-center py-5">
                            <h3>Nenhum filme encontrado, por favor verifique a busca e tente novamente</h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;