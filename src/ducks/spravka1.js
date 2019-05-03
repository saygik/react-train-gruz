import {all, take, call, put, select,takeEvery} from 'redux-saga/effects'
import {appName} from '../config'
import { getFindVagonTipFromColImm} from './utils'
import {OrderedMap, Record} from 'immutable'
import { createSelector } from 'reselect'
import {fetchGruzSprav1,arrToEntities} from '../services/api'


/************************************************************************
 * Constants
 * */
export const moduleName = 'spravka1'
export const rusName = 'Дислокация вагонов'
const prefix = `${appName}/${moduleName}`


export const FETCH_SPRAVKA1_REQUEST = `${prefix}/FETCH_SPRAVKA1_REQUEST`
export const FETCH_SPRAVKA1_SUCCESS = `${prefix}/FETCH_SPRAVKA1_SUCCESS`
export const FETCH_SPRAVKA1_ERROR = `${prefix}/FETCH_SPRAVKA1_ERROR`
export const SPRAVKA1_CELL_CHANGE_REQUEST = `${prefix}/SPRAVKA1_CELL_CHANGE_REQUEST`
export const SPRAVKA1_CELL_UNCHECK = `${prefix}/SPRAVKA1_CELL_UNCHECK`
export const SELECT_SPRAVKA1_FIRSTLOAD = `${prefix}/SELECT_SPRAVKA1_FIRSTLOAD`
export const SELECT_SPRAVKA1_CELL = `${prefix}/SELECT_SPRAVKA1_CELL`

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
        case SELECT_SPRAVKA1_FIRSTLOAD:
            return state
                .set('firstLoad', false)
        case SELECT_SPRAVKA1_CELL:
            return state
                .set('sprav1SelectedCell', payload.cell)
        case SPRAVKA1_CELL_UNCHECK:
            return state
                .set('sprav1SelectedCell', null)

        case FETCH_SPRAVKA1_REQUEST:
            return state
                .set('loading', true)
                .set('infoMsg', "Обновление данных...")
        case FETCH_SPRAVKA1_SUCCESS:
            return state
                .set('loading', false)
                .set('infoMsg', payload.msg)
                .set('entities', arrToEntities(payload.data, SpravRecord))
        case FETCH_SPRAVKA1_ERROR:
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
export const selectedStationTipSelector = createSelector(stateSelector, state => {
    return state.sprav1SelectedCell
})

export const dataSelector = createSelector(stateSelector, state=> state.entities.valueSeq().toArray())

export const entitiesSelector = createSelector(stateSelector, state=> state.entities)


export const selectedStationSelector = createSelector(selectedStationTipSelector, entitiesSelector, (station,entities )=> {
    return station && OrderedMap(entities.get(station.id)).set('col', station.col)
})
export const selectedStationAndTipSelector = createSelector( selectedStationSelector, (station) => {
    return station && getFindVagonTipFromColImm(station)
})


/**********************************************************************
 * Action Creators
 * */
export const actions = {
    fetchAll: () => ({type: FETCH_SPRAVKA1_REQUEST}),
    selectCell: (row)=> ({type: SPRAVKA1_CELL_CHANGE_REQUEST, payload: row}),
    closeExpanded: () => ({type: SPRAVKA1_CELL_UNCHECK})
}

/***********************************************************************
 * Sagas
 * */

export const fetchAllSaga = function * () {

    while (true){
        yield take(FETCH_SPRAVKA1_REQUEST)
        const state= yield select(stateSelector)
            const res = yield call(fetchGruzSprav1);
            if (res.fetchOK) {
                if (state.firstLoad ) {
                    yield put({
                        type: SELECT_SPRAVKA1_FIRSTLOAD
                    })
                }
                yield put({
                    type: FETCH_SPRAVKA1_SUCCESS,
                    payload: {data: res.data, msg: res.msg}
                })

            }else {
                yield put({
                    type: FETCH_SPRAVKA1_ERROR,
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
                     type: SELECT_SPRAVKA1_CELL,
                     payload: {cell: {id: cellClicked.id, col: cellClicked.col}}
                 })
             } else {
                 if (row.col === cellClicked.col && row.id===cellClicked.id) {
                     yield put({
                         type: SELECT_SPRAVKA1_CELL,
                         payload: {cell: null}
                     })
                     } else {
                        yield put({
                            type: SELECT_SPRAVKA1_CELL,
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
        takeEvery(SPRAVKA1_CELL_CHANGE_REQUEST,cellChange)
    ])
}

