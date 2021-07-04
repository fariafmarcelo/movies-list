import React from 'react';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import MoviesList from '../components/MoviesList/MoviesList';
import FullMoviePage from '../components/FullMoviePage/FullMoviePage';

export default function Routes() {
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={MoviesList}/>
            {/* <Route path="/sobre-o-filme" component={FullMoviePage}/> */}
        </Switch>
    </BrowserRouter>
}