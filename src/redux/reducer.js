import {combineReducers} from 'redux'
import { connectRouter } from 'connected-react-router'

import spravka1Reducer, {moduleName as spravka1Module} from '../ducks/spravka1'
import spravka31Reducer, {moduleName as spravka31Module} from '../ducks/spravka31'
import spravka2Reducer, {moduleName as spravka2Module} from '../ducks/spravka2'
import podhodReducer, {moduleName as podhodModule} from '../ducks/wagonapproach'


export default (history) => combineReducers({
    router: connectRouter(history),
    [spravka1Module]: spravka1Reducer,
    [spravka2Module]: spravka2Reducer,
    [spravka31Module]: spravka31Reducer,
    [podhodModule]: podhodReducer,
})