
const initialState = {
    todos: [],
    todo:null,
    loading: true,
    error: {}
}

export default  function (state = initialState, action){
    const {type, payload}=action
    switch(type){
        case 'GET_TODOS':
            return {
                ...state,
                todos: payload,
                loading: false
            }
        case 'GET_TODO':
            return {
                ...state,
                todo: payload,
                loading: false
            }
        case 'ADD_TODO':
            return {
                ...state,
                todos: [ payload,...state.todos ],
                loading: false
            }
        case 'DELETE_TODO':
            return {
                ...state,
                todos: state.todos.filter(todo => todo._id!==payload),
                loading: false
            }
        case 'POST_ERROR':
            return {
                ...state,
                error:payload,
                loading: false
            }
        default:
            return state
    }
}


