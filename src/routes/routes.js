import React from 'react'

import {Router, Route, Redirect, Switch} from 'react-router-dom'

export default props => (
    <Router history={history}>
        <Switch>
            <Route path="/tarefas" component={Tarefa}/>
            <Route path="/about" component={About}/>
            <Redirect from="*" to="/tarefas"/>
        </Switch>
    </Router>
)