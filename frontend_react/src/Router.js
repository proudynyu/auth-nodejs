import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Register from './views/Register';
import Home from './views/Home';
import SignIn from './views/Login';
import Dashboard from './views/Dashboard';

import AuthRoute from './components/authRoute';

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/signin" component={SignIn} />
                <Route path="/signup" component={Register} />
                <Route path="/" exact component={Home} />
                <AuthRoute path="/dashboard" component={Dashboard} />
            </Switch>
        </BrowserRouter>
    );
}