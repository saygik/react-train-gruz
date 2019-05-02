import {all, take, call, put, select,takeEvery} from 'redux-saga/effects'
import {appName} from '../config'
import {getPogrVygrTipOperFromColImm} from './utils'
import {OrderedMap, Record} from 'immutable'
import { createSelector } from 'reselect'
import {arrToEntities, fetchGruzSprav2} from '../services/api'


/************************************************************************
 * Constants
 * */
export const moduleName = 'spravka2'
export const rusName = 'Погрузка, выгрузка и поступление вагонов с местным грузом'
const prefix = `${appName}/${moduleName}`

export const FETCH_SPRAVKA_REQUEST = `${prefix}/FETCH_SPRAVKA_REQUEST`
export const FETCH_SPRAVKA_SUCCESS = `${prefix}/FETCH_SPRAVKA_SUCCESS`
export const FETCH_SPRAVKA_ERROR = `${prefix}/FETCH_SPRAVKA_ERROR`

export const SPRAVKA_CELL_CHANGE_REQUEST = `${prefix}/SPRAVKA_CELL_CHANGE_REQUEST`
export const SPRAVKA_CELL_UNCHECK = `${prefix}/SPRAVKA_CELL_UNCHECK`

export const SELECT_SPRAVKA_FIRSTLOAD = `${prefix}/SELECT_SPRAVKA_FIRSTLOAD`
export const SELECT_SPRAVKA_CELL = `${prefix}/SELECT_SPRAVKA_CELL`

/*************************************************************************
 * Reducer
 * */
export const ReducerRecord = Record({
    entities: new OrderedMap({}),
    autoUpdateTime:0,
    loading: false,
    firstLoad: true,
    infoMsg: '',
    sprav1SelectedCell: null
})

export const SpravRecord = Record({
    ID: null,
    NAME: null,
    KODS: null,
    TIPZAP: null,
    COLS:  null,
    COLS1:  null,
    COLS2:  null,
    COLS3:  null,
    COLS4:  null,
    COLS5:  null,
    COLS6:  null,
    COLP:  null,
    COLP1:  null,
    COLP2:  null,
    COLP3: null,
    COLP4: null,
    COLP5: null,
    COLP6: null,
    COLD: null,
    COLD1: null,
    COLD2: null,
    COLD3: null,
    COLD4: null,
    COLD5: null,
    COLD6: null,
    COL: null
})

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action

    switch (type) {
        case SELECT_SPRAVKA_FIRSTLOAD:
            return state
                .set('firstLoad', false)

        case SELECT_SPRAVKA_CELL:
            return state
                .set('sprav1SelectedCell', payload.cell)
        case SPRAVKA_CELL_UNCHECK:
            return state
                .set('sprav1SelectedCell', null)

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
export const selectedStationTipSelector = createSelector(stateSelector, state => state.sprav1SelectedCell)

export const dataSelector = createSelector(stateSelector, state=> state.entities.valueSeq().toArray())

export const entitiesSelector = createSelector(stateSelector, state=> state.entities)

export const selectedStationSelector = createSelector(selectedStationTipSelector, entitiesSelector, (station,entities )=> {
    return station && OrderedMap(entities.get(station.id)).set('col', station.col)
})
export const selectedStationAndTipSelector = createSelector( selectedStationSelector, (station) => {
    return station && getPogrVygrTipOperFromColImm(station)
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
        const res = yield call(fetchGruzSprav2);
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
        if (cellClicked.cell!==0 && cellClicked.stan!=='s001' && cellClicked.stan!=='s002') {

            const row = yield select(selectedStationAndTipSelector)
            if (row === null) {
                yield put({
                    type: SELECT_SPRAVKA_CELL,
                    payload: {cell: {id: cellClicked.id, col: cellClicked.col}}
                })
            } else {
                if (row.col === cellClicked.col && row.id===cellClicked.id) {
                    yield put({
                        type: SELECT_SPRAVKA_CELL,
                        payload: {cell: null}
                    })
                } else {
                    yield put({
                        type: SELECT_SPRAVKA_CELL,
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

