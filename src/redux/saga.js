import {saga as spravka1Saga} from '../ducks/spravka1'
import {all} from 'redux-saga/effects'

export default function * rootSaga() {
    yield all([
        spravka1Saga()
    ])
}