import React, { useContext, useState } from 'react';
import { firebaseAuth } from '../../Context/AuthProvider/AuthProvider';
import 'react-notifications/lib/notifications.css';
import './signin.css';

export default function SignIn(props) {
    const { handleSignIn, inputs, setInputs, errors } = useContext(firebaseAuth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleSignIn();
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div>
        <div className="signInContainer">
            <div className="content">
                <div>
                    <h1>Log In</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            onChange={handleChange}
                            name="displayName"
                            placeholder='Username'
                            value={inputs.displayName}
                        />
                        <input
                            onChange={handleChange}
                            name="email"
                            placeholder='Email Address'
                            type='email'
                            value={inputs.email}
                        />
                        <input
                            onChange={handleChange}
                            name="password"
                            placeholder='Password'
                            type='password'
                            value={inputs.password}
                        />
                        <button type='submit'>Sign In</button>
                    </form>
                    <a href='/signup'>Create a New account</a>
                </div>
            </div>
        </div>
        </div>
    )
}
