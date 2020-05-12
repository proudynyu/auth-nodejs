import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Register(){
    const history = useHistory();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    async function handleSubmit(event){
        event.preventDefault();
        
    }

    return(
        <form className="container-md mt-5" autoComplete="off" onSubmit={handleSubmit}>
            <fieldset>
                <legend>Sign Up</legend>
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