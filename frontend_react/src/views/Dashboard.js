import React from 'react';

export default function Dashboard() {
    return (
        <div className="jumbotron mt-5 container-sm">
            <h1 className="display-3">Hello, world!</h1>
            <p className="lead">Welcome to the Dashboard.</p>
            <hr className="my-4" />
            <p>If you are here, you token is valid.</p>
            <p className="lead">
            <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
            </p>
        </div>
    )
}