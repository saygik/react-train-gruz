import {combineReducers} from 'redux'
import { connectRouter } from 'connected-react-router'

import spravka1Reducer, {moduleName as spravka1Module} from '../ducks/spravka1'


export default (history) => combineReducers({
    router: connectRouter(history),
    [spravka1Module]: spravka1Reducer,
})