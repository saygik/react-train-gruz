import {all, take, call, put, select,takeEvery} from 'redux-saga/effects'
import {appName} from '../config'
import { getFindVagonTipFromCol} from './utils'
import {Record} from 'immutable'
import { createSelector } from 'reselect'
import {fetchGruzSprav1} from '../services/api'


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
    entities: [],
    loading: false,
    firstLoad: true,
    infoMsg: '',
    sprav1SelectedCell: null
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
                .set('entities', payload.data)
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

export const entitiesSelector = createSelector(stateSelector, state=> state.entities)

export const selectedStationSelector = createSelector(selectedStationTipSelector, entitiesSelector, (station,entities )=> {
    if (station !== null) {
        return entities.filter(row => row.ID===station.id)
    } else {
        return []
    }
})
export const selectedStationAndTipSelector = createSelector( selectedStationSelector,selectedStationTipSelector, (rows, station) => {
    if (rows.length>0) {
        let selectedStationWithTipAndPlace = getFindVagonTipFromCol(station);
        selectedStationWithTipAndPlace.stan=rows[0].KODS;
        selectedStationWithTipAndPlace.stanName=rows[0].NAME;
        return selectedStationWithTipAndPlace
    } else {
        return null
    }
})


/**********************************************************************
 * Action Creators
 * */
export const actions = {
    fetchAll: () => ({type: FETCH_SPRAVKA1_REQUEST}),
    selectCell: (row)=> ({type: SPRAVKA1_CELL_CHANGE_REQUEST, payload: row}),
    closeExpanded: () => ({type: SPRAVKA1_CELL_UNCHECK})
}
// export const fetchAll=() => ({type: FETCH_SPRAVKA1_REQUEST})
// export const selectSprav1Cell=(row)=> ({type: SPRAVKA1_CELL_CHANGE_REQUEST, payload: row})
// export const closeFindVagons=() => ({type: SPRAVKA1_CELL_UNCHECK})


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
export const duckProps = {moduleName, rusName, actions , selectedStationAndTipSelector }
