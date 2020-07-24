// If we have a jwt token then we will send it as header
// else we will delete the header
import axios from 'axios'

const setAuthToken = token => {
    if(token){
        axios.defaults.headers.common['x-auth-token']=token
    }else{
        delete axios.defaults.headers.common['x-auth-token']
    }
}

export default setAuthToken
