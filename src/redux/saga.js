import {saga as gruzStatisticsSaga} from '../ducks/gruz-statistics'
import {saga as spravka1Saga} from '../ducks/spravka1'
import {saga as spravka2Saga} from '../ducks/spravka2'
import {saga as spravka31Saga} from '../ducks/spravka31'
import {saga as wagonapproachSaga} from '../ducks/vagonpodhod'
import {saga as findvagonsSaga} from '../ducks/findvagons'
import {saga as pogrvygrSaga} from '../ducks/pogrvygr'
import {saga as findvagonhistorySaga} from '../ducks/findvagonhistory'
import {saga as findpoezdvagonsSaga} from '../ducks/findpoezdvagons'
import {saga as naturkiSaga} from '../ducks/naturki'

import {all} from 'redux-saga/effects'

export default function * rootSaga() {
    yield all([
        gruzStatisticsSaga(),
        spravka1Saga(),
        spravka2Saga(),
        spravka31Saga(),
        wagonapproachSaga(),
        findvagonsSaga(),
        pogrvygrSaga(),
        findpoezdvagonsSaga(),
        findvagonhistorySaga(),
        naturkiSaga(),
    ])
}