import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Joi from '@hapi/joi';

export default function SigIn() {
    const history = useHistory();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const LOG_URL = 'http://localhost:3333/auth/signin';

    useEffect(() => {
        if (isError === true) {
            setErrorMsg('');
            setIsError(false);
        };
    }, [name, password]);

    const schema = Joi.object().keys({
        username: Joi.string().regex(/^[a-zA-Z0-9_]+$/).min(2).max(30)
          .required(),
        password: Joi.string().trim().min(10).required(),
    });
    
    const user = {
        username: name,
        password: password,
    };

    async function validateUser() {
        setErrorMsg('');
        setIsError(false);
        try {
            await schema.validateAsync({ 
                username: user.username,
                password: user.password,
             });
            return true;
        } catch (err) {
            setErrorMsg('Failed to login, try again');
            setIsError(true);
        }
        return false;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const result = await validateUser();
        const fetchBody = {
            method: 'POST',
            headers: {
                'content-type':'application/json',
            },
            body: JSON.stringify(user),
        };
        if (!result) {
            return
        }
        try {
            const data = await fetch(LOG_URL, fetchBody);
            if (data.status !== 200) {
                const error = await data.json();
                throw error;
            }
            const token = await data.json();
            localStorage.token = token.token;
            history.push('/dashboard');
        } catch (err) {
            setErrorMsg(err.error);
            setIsError(true);
        }
    }

    return(
        <form
         className="container-sm mt-5"
         style={{maxWidth: 500}}
         autoComplete="off"
         onSubmit={handleSubmit}>
            <fieldset>
                <legend>Sign Up</legend>
                
                { isError &&
                <div className="alert alert-dismissible alert-danger">
                    <button type="button" className="close" data-dismiss="alert">&times;</button>
                    {errorMsg}
                </div>
                }

                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input 
                        value={name}
                        type="text" 
                        className="form-control" 
                        id="username" 
                        aria-describedby="userHelp"
                        placeholder="Enter username"
                        onChange={e => setName(e.target.value)}
                        required/>
                    {/* <small 
                        id="emailHelp" 
                        className="form-text text-muted"
                    >Username name must have 10 to 30 alphanumeric characters.</small> */}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        value={password}
                        type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)}
                        required />
                    {/* <small 
                        id="emailHelp" 
                        className="form-text text-muted"
                    >Password name must have at least 10 characters.</small> */}
                </div>               
                <button type="submit" className="btn btn-primary mt-3">Submit</button>
            </fieldset>
        </form>
    )
}