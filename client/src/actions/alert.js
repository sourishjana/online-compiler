import { v4 as uuidv4 } from 'uuid'

export const setAlert = (msg, alertType,timeout=5000) => dispatch => {
    const id=uuidv4()
    dispatch({
        type: 'SET_ALERT',
        payload: { msg, alertType, id }
    })
    
    // we will be removing errors after certain amount of time automatically
    setTimeout(()=>{
        dispatch({
            type:'REMOVE_ALERT',
            payload: id
        })
    }, timeout) 
}

// redux setup and alerts -> lecture 3