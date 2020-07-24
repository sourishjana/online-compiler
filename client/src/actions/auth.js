import axios from 'axios'
import { setAlert } from './alert'
import setAuthToken from '../utils/setAuthToken'

// load user :

export const loadUser = () => async dispatch =>{
     if(localStorage.token){
        setAuthToken(localStorage.token)
     }
     try {
         // just getting the user using the jwt token in local storage
         const res= await axios.get('/api/auth')

         dispatch({
             type: 'USER_LOADED',
             payload: res.data
         })
     } catch (err) {
         dispatch({
             type:'AUTH_ERROR'
         })
     }
 }




// register user :

export const register = ({ username, email, password }) => async dispatch => {
    // Prepare data to send using api by axios
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body=JSON.stringify({ username, email, password })

    // making api call
    try {
        const res= await axios.post('/api/users', body, config)
        dispatch({
            type:'REGISTER_SUCCESS',
            payload: res.data
        })

        // calling the loaduser from this file -> top function
        dispatch(loadUser())

    } catch (err) {
        console.log(err)
        const errors= err.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: 'REGISTER_FAIL'
        })
    }
}



// login user :

export const login = (email, password) => async dispatch => {
    // Prepare data to send using api by axios
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body=JSON.stringify({ email, password })

    // making api call
    try {
        const res= await axios.post('/api/auth', body, config)
        dispatch({
            type:'LOGIN_SUCCESS',
            payload: res.data
        })
        
        // calling the loaduser from this file -> top function
        dispatch(loadUser())

    } catch (err) {
        console.log(err)
        const errors= err.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: 'LOGIN_FAIL'
        })
    }
}


// logout :


export const logout = () => dispatch =>{
    dispatch({ type:'LOGOUT' })
}


