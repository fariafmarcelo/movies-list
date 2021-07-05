import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import MoviesList from '../components/MoviesList/MoviesList';
import FullMoviePage from '../components/FullMoviePage/FullMoviePage';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={MoviesList}/>
                <Route path="/sobre-o-filme/:movieId" component={FullMoviePage}/>
            </Switch>
        </BrowserRouter>
    );
}