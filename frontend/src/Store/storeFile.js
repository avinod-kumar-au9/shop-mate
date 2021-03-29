import Reducer from '../Reducers/combineReducers '
import {logger} from 'redux-logger'
import {createStore, applyMiddleware} from 'redux'
import ReduxThunk from 'redux-thunk'

let store = createStore(Reducer,applyMiddleware(ReduxThunk))

export default store