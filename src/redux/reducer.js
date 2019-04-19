import {combineReducers} from 'redux'
import { connectRouter } from 'connected-react-router'
import ducksReducers from '../ducks'

export default (history) => combineReducers({
    router: connectRouter(history),
    ...ducksReducers
} )