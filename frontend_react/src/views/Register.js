import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Joi from '@hapi/joi';

export default function Register(){
    const history = useHistory();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [isError, setIsError] = useState(false);
    const [errorMgs, setErrorMsg] = useState('');
    // const [isLoggin, setIsLoggin] = useState(false);

    const REG_URL = 'http://localhost:3333/auth/signup';
    
    const schema = Joi.object().keys({
        username: Joi.string().regex(/^[a-zA-Z0-9_]+$/).min(2).max(30)
          .required(),
        password: Joi.string().trim().min(10).required(),
        confirmPassword: Joi.string().trim().min(10).required(),
    });

    useEffect(() => {
        if (isError === true)
            setIsError(false);
    }, [name, password, confirmPass]);

    async function validateUser(){
        setErrorMsg('');
        setIsError(false);
        if (password !== confirmPass) {
            setErrorMsg('Password must match');
            setIsError(true);
            return false
        };
        try {
            await schema.validateAsync({
                username: name,
                password: password,
                confirmPassword: confirmPass,
            })
            return true;
        } catch (err) {
            if (err.message.includes('username')){
                setErrorMsg('Username invalid');
            }
            setErrorMsg('Password invalid')
            setIsError(true);
            return false
        }
    };

    async function handleSubmit(event){
        event.preventDefault();
        setErrorMsg('');
        setIsError(false);
        const user = await validateUser();
        if (!user) {
            return 
        }
        const fetchBody = {
            method: 'POST',
            headers: {
                'content-type':'application/json'
            },
            body: JSON.stringify({
                username: name,
                password: password,
            }),
        };
        try {
            const data = await fetch(REG_URL, fetchBody);
            if (data.status === 200) {
                const result = await data.json();
                localStorage.token = result.token;
                history.push('/dashboard');
            }

        } catch (err) {
            console.log(err.message);
        }
    }

    return(
        <form
         className="container-md mt-5"
         autoComplete="off"
         onSubmit={handleSubmit}
         style={{maxWidth: 500}}>
            <fieldset>
                <legend>Sign Up</legend>
                
                { isError && 
                <div className="alert alert-dismissible alert-danger">
                    <button type="button" className="close" data-dismiss="alert">&times;</button>
                    {errorMgs}
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
                        onChange={event => setName(event.target.value)} 
                        placeholder="Enter username" 
                        required/>
                    <small 
                        id="emailHelp" 
                        className="form-text text-muted"
                    >Username name must have 10 to 30 alphanumeric characters.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        value={password}
                        type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Password"
                        onChange={event => setPassword(event.target.value)} 
                        required />
                    <small 
                        id="emailHelp" 
                        className="form-text text-muted"
                    >Password name must have at least 10 characters.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="checkPassword">Confirm Password</label>
                    <input 
                        value={confirmPass}
                        type="password" 
                        className="form-control" 
                        id="checkPassword" 
                        placeholder="Password"
                        onChange={event => setConfirmPass(event.target.value)} 
                        required />
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </fieldset>
        </form>
    )
}