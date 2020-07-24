import {combineReducers} from 'redux'
import alert from './alert'
import auth from './auth'
//import todo from './todo'

// we will manually import all the reducers and add them one by one here
export default combineReducers({
    alert,
    auth
})