import React, { useContext } from 'react';
import { firebaseAuth } from '../../Context/AuthProvider/AuthProvider';
import './signup.css';

export default function SignUp(props) {
    const { handleSignUp, inputs, setInputs, errors } = useContext(firebaseAuth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleSignUp();
        if(localStorage.userToken){
            await props.history.push('/cart')
        }
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div className='signUpContainer'>
            <div className="signUpContent">
                <div>
                    <h1>Sign Up</h1>
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
                        <button type='submit'>Sign Up</button>
                    </form>
                    <a href='/signin'>Already have an account?</a>
                    {errors.length > 0 ? <p>{errors.map(err => err)}</p> : null}
                </div>
            </div>
        </div>
    )
}
