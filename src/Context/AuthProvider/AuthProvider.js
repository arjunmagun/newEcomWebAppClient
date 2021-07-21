import React, { createContext, useContext, useEffect, useState } from 'react'
import { authMethods } from "../../firebase/authMethods";
import { CartContext } from '../CartContext';

export const firebaseAuth = createContext();

export default function AuthProvider(props) {
    const [inputs, setInputs] = useState({
        displayName: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState([]);
    const [token, setToken] = useState(null)
    const [cart, setCart] = useContext(CartContext);
    const [adminLoggedIn, setAdminLoggedIn] = useState(false);

    const handleSignUp = () => {
        return authMethods.signUp(inputs.email, inputs.password, setErrors, setToken, inputs.displayName, cart);
    }

    const handleSignIn = () => {
        return authMethods.signIn(inputs.email, inputs.password, setErrors, setToken, inputs.displayName, cart);
    }

    const handleSignOut = () => (
        authMethods.signOut(setErrors, setToken)
    )

    const checkAdminLoggedIn = () => {
        let adminToken;
        const adminId = "ctql1N6sHXMFGVYhYfY1XQsIYdg2";
        if(localStorage.userToken){
            adminToken = JSON.parse(localStorage.getItem("userToken")).token.i;
            if(adminId === adminToken){
                setAdminLoggedIn(true)
            } else {
                setAdminLoggedIn(false)
            }
        }
    }

    useEffect(()=> {
        checkAdminLoggedIn();
    })

    return (
        <firebaseAuth.Provider
            value={{
                handleSignIn,
                handleSignUp,
                handleSignOut,
                inputs,
                setInputs,
                errors,
                token,
                adminLoggedIn
            }}
        >
            {props.children}
        </firebaseAuth.Provider>
    )
}
