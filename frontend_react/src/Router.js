import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Register from './views/Register';
import Home from './views/Home';

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/signup" component={Register} />
                <Route path="/" exact component={Home} />
            </Switch>
        </BrowserRouter>
    );
}