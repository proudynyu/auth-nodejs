import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

export default function AuthRoute({ component: Component, ...rest }) {
    return(
        <Route {...rest} render={props => (
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect to="/signin" />
            )
        )} />
    );
}