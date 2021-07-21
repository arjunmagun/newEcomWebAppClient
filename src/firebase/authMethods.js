import firebaseconfig from './firebaseIndex';
import firebase from 'firebase';

export const authMethods = {
    signUp: (email, password, setErrors, setToken, displayName, cart) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async res => {
                const token = await Object.entries(res.user)[5][1].b;
                await localStorage.setItem('userToken', JSON.stringify({ userName: displayName, token, cart }))
                setToken(window.localStorage.userToken)
                window.location.assign('/')
            })
            .catch(err => {
                setErrors(prev => ([...prev, err.message]))
            })
    },
    signIn: (email, password, setErrors, setToken, displayName, cart) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async res => {
                const token = await Object.entries(res.user)[5][1].b;
                await localStorage.setItem('userToken', JSON.stringify({ userName: displayName, token, cart }))
                setToken(JSON.parse(window.localStorage.userToken))
                window.location.assign('/')
            })
            .catch(err => {
                setErrors(prev => [...prev, err.message])
            })
    },
    signOut: (setErrors, setToken) => {
        firebase.auth().signOut()
            .then(res => {
                localStorage.removeItem('userToken')
                setToken(null)
            })
            .catch(err => {
                setErrors(prev => [...prev, err.message])
                localStorage.removeItem('userToken')
                setToken(null)
            })
    }
}