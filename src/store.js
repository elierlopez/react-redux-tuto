
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

//Reducers specify how the application's state changes in response to actions sent to the store. Remember that actions only describe what happened, but don't describe how the application's state changes.
//Elier-So, the action is sent to the store but reducer is the one decides what happens to the state 
//after action is executed

const initialState = {
    cart: [],
    products: []
}

//The reducers not necessarily should be all imported when required
//we can make reduce composition as explained in https://redux.js.org/basics/reducers#splitting-reducers 
const reducer = (state = initialState, action) => {

    if (action.type === 'REPLACE_PRODUCTS')
        return {
            ...state,
            products: action.products
        }
    else if (action.type === 'ADD_TO_CART') {
        return {
            // las dos lineas de abajo significan:
            //1: se crea una copia del estado 
            //2: se reemplaza la propiedad cart con un unevo valor que es: el arreglo cart mas un elemnto
            // que se le concatena. Este nuevo elemento viene en el action: action.product   
            ...state,
            cart: state.cart.concat(action.product)
        }
    }
    if (action.type === 'REMOVE_FROM_CART') {
        return {
            ...state,
            cart: state.cart.filter(e => e !== action.product)
        }
    }

    return state
}

const logger = store => next => action => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
}

export default createStore(reducer, initialState, applyMiddleware(logger, thunk))
// The store holds the state and takes care of calling the reducer when an action is dispatched
/*
    store responsabilities:

    Holds application state;
    Allows access to state via getState();
    Allows state to be updated via dispatch(action);
    Registers listeners via subscribe(listener);
    Handles unregistering of listeners via the function returned by subscribe(listener).

    Inside Reducer is where the initial state is set. In this app sample, the
    initial state is directly passed to createStore function
    initial state is { cart:[] }. It only contains a property: an array called cart
*/