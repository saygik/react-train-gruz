import {all, take, call, put, select,takeEvery} from 'redux-saga/effects'
import {appName} from '../config'
import {OrderedMap, Record} from 'immutable'
import { createSelector } from 'reselect'
import {arrToEntities, fetchGruzSprav31} from '../services/api'


/************************************************************************
 * Constants
 * */
export const moduleName = 'spravka31'
export const rusName = 'Наличие вагонов с местным грузом'
const prefix = `${appName}/${moduleName}`

export const FETCH_SPRAVKA_REQUEST = `${prefix}/FETCH_SPRAVKA_REQUEST`
export const FETCH_SPRAVKA_SUCCESS = `${prefix}/FETCH_SPRAVKA_SUCCESS`
export const FETCH_SPRAVKA_ERROR = `${prefix}/FETCH_SPRAVKA_ERROR`


export const SPRAVKA_CELL_CHANGE_REQUEST = `${prefix}/SPRAVKA_CELL_CHANGE_REQUEST`
export const SPRAVKA_CELL_UNCHECK = `${prefix}/SPRAVKA_CELL_UNCHECK`
export const SELECT_SPRAVKA_FIRSTLOAD = `${prefix}/SELECT_SPRAVKA_FIRSTLOAD`
export const SPRAVKA_CELL_CHECK = `${prefix}/SPRAVKA_CELL_CHECK`

/*************************************************************************
 * Reducer
 * */
export const ReducerRecord = Record({
    entities: new OrderedMap({}),
    autoUpdateTime:0,
    loading: false,
    loadingVagons: false,
    firstLoad: true,
    infoMsg: '',
    spravSelectedCell: null
})

export const SpravRecord = Record({
    ID: null,
    NAME: null,
    KODS: null,
    TIPZAP: null,
    S1387:0,
    S1386:0,
    S1391:0,
    S1390:0,
    S1389:0,
    S1385:6,
    S1399:0,
    S1398:0,
    S1396:0,
    S1395:0,
    S1393:0,
    S1392:0,
    S1394:0,
    S1520:0,
    S1521:0,
    S1369:0,
    S1371:0,
    S1370:0,
    S1368:0,
    S1367:0,
    S1362:0,
    S1356:0,
    S1373:0,
    S1372:0,
    S1354:0,
    S1345:0,
    S1353:0,
    S1352:0,
    S1347:0,
    S1351:0,
    S1375:0,
    S1374:0,
    S1380:0,
    S1623:0,
    S1624:0,
    S1377:0,
    S1378:0,
    S1376:0,
    S1382:0,
    S1384:0,
    S1348:0,
    S1357:0,
    S1358:0,
    S1363:0
})


export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action

    switch (type) {
        case SELECT_SPRAVKA_FIRSTLOAD:
            return state
                .set('firstLoad', false)
        case SPRAVKA_CELL_CHECK:
            return state
                .set('spravSelectedCell', payload.cell)
        case SPRAVKA_CELL_UNCHECK:
            return state
                .set('spravSelectedCell', null)
        case FETCH_SPRAVKA_REQUEST:
            return state
                .set('loading', true)
                .set('infoMsg', "Обновление данных...")
        case FETCH_SPRAVKA_SUCCESS:
            return state
                .set('loading', false)
                .set('infoMsg', payload.msg)
                .set('entities', arrToEntities(payload.data, SpravRecord))
        case FETCH_SPRAVKA_ERROR:
            return state
                .set('loading', false)
                .set('infoMsg', payload.msg)

        default:
            return state
    }
}

/*********************************************************************
 * Selectors
 * */
export const stateSelector = state => state[moduleName];
export const entitiesSelector = createSelector(stateSelector, state=> state.entities)
export const selectedStationTipSelector = createSelector(stateSelector, state => state.spravSelectedCell)
export const dataSelector = createSelector(stateSelector, state=> state.entities.valueSeq().toArray())

export const selectedStationSelector = createSelector(selectedStationTipSelector, entitiesSelector, (station,entities )=> {
    return station && OrderedMap(entities.get(station.id)).set('col', station.col)
})
export const selectedStationAndTipSelector = createSelector( selectedStationSelector, ( station) => {
    return station && {
            id: station.get('ID'),
            tip: 0,
            tipName: '' ,
            onNod: 1,
            col: station.get('col'),
            stan: station.get('KODS'),
            stanName: station.get('NAME'),
            filter: {stanPO: station.get('col').substring(1)},
            onStation: station.get('col').substring(1)===station.get('KODS') ? 1 : 0
        }

})


/**********************************************************************
 * Action Creators
 * */

export const actions = {
    fetchAll: () => ({type: FETCH_SPRAVKA_REQUEST}),
    selectCell: (row)=> ({type: SPRAVKA_CELL_CHANGE_REQUEST, payload: row}),
    closeExpanded: () => ({type: SPRAVKA_CELL_UNCHECK})
}

/***********************************************************************
 * Sagas
 * */

export const fetchAllSaga = function * () {

    while (true){
        yield take(FETCH_SPRAVKA_REQUEST)
        const state= yield select(stateSelector)
        const res = yield call(fetchGruzSprav31);

        if (res.fetchOK) {
            if (state.firstLoad ) {
                yield put({
                    type: SELECT_SPRAVKA_FIRSTLOAD
                })
            }
            yield put({
                type: FETCH_SPRAVKA_SUCCESS,
                payload: {data: res.data, msg: res.msg}
            })

        }else {
            yield put({
                type: FETCH_SPRAVKA_ERROR,
                payload: {msg: res.msg }
            })
        }
    }
}

export const cellChange = function * (action) {

    try {
        const cellClicked=action.payload
        if (cellClicked.cell!==0 && cellClicked.stan!=='s001' && cellClicked.stan!=='s002' && cellClicked.stan!=='s000') {

            const row = yield select(selectedStationAndTipSelector)
            if (row === null) {
                yield put({
                    type: SPRAVKA_CELL_CHECK,
                    payload: {cell: {id: cellClicked.id, col: cellClicked.col}}
                })
            } else {
                if (row.col === cellClicked.col && row.id===cellClicked.id) {
                    yield put({
                        type: SPRAVKA_CELL_CHECK,
                        payload: {cell: null}
                    })
                } else {
                    yield put({
                        type: SPRAVKA_CELL_CHECK,
                        payload: {cell: {id: cellClicked.id, col: cellClicked.col}}
                    })

                }

            }

        }
    } catch (_) {

    }
}

export function* saga() {
    yield all([
        fetchAllSaga(),
        takeEvery(SPRAVKA_CELL_CHANGE_REQUEST,cellChange)

    ])
}

