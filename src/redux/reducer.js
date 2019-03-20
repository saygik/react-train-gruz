import {combineReducers} from 'redux'
import spravka1Reducer, {moduleName as spravka1Module} from '../ducks/spravka1'

export default combineReducers({
    [spravka1Module]: spravka1Reducer,
})
