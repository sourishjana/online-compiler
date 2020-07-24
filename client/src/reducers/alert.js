const initialState = []

// we get all the actions from the actions dir which have all these actions
export default function(state=initialState, action){
    const { type, payload } = action
    switch (type){
        case 'SET_ALERT':
            return [...state, payload] // we will concat the new aleart to the previous states
        case 'REMOVE_ALERT':
            return state.filter(aleart => ( aleart.id !== payload ) )
        default:
            return state
    }
}