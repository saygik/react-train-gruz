import {saga as spravka1Saga} from '../ducks/spravka1'
import {saga as spravka2Saga} from '../ducks/spravka2'
import {saga as wagonapproachSaga} from '../ducks/wagonapproach'
import {all} from 'redux-saga/effects'

export default function * rootSaga() {
    yield all([
        spravka1Saga(),
        spravka2Saga(),
        wagonapproachSaga(),
    ])
}