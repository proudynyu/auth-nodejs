import React from 'react';
import { Link } from 'react-router-dom';

export default function Home(){
    return (
        <div className="jumbotron text-center container-md mt-5">
            <h1 className="display-3">Sign Up!</h1>
            <p className="lead">This is a test page, to learn more, sign up!</p>
            <hr className="my-4" />
            <p>Made by Igor Becker</p>
            <p className="lead">
            <Link 
                className="btn btn-primary btn-md"
                to="/signup"
                role="button"
            >SignUp</Link>
            </p>
        </div>
    );
}