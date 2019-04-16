import {all, take, call, put, select,takeEvery} from 'redux-saga/effects'
import {appName} from '../config'
import {Record} from 'immutable'
import { createSelector } from 'reselect'
import {fetchGruzSprav31} from '../services/api'


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
    entities: [],
    loading: false,
    loadingVagons: false,
    firstLoad: true,
    infoMsg: '',
    spravSelectedCell: null
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
                .set('entities', payload.data)
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
export const selectedStationTipSelector = createSelector(stateSelector, state => {
    return state.spravSelectedCell
})

export const selectedStationSelector = createSelector(selectedStationTipSelector, entitiesSelector, (station,entities )=> {
    if (station !== null) {
        return entities.filter(row => row.ID===station.id)
    } else {
        return []
    }
})
export const selectedStationAndTipSelector = createSelector( selectedStationSelector,selectedStationTipSelector, (rows, station) => {
    if (rows.length>0) {
        const stanpo=station.col.substring(1)
        let selectedStationWithTipAndPlace = {id: station.id, tip: 0,tipName:'' ,onStation: 0, onNod: 1, col: station.col};
        if (stanpo===rows[0].KODS) {
            selectedStationWithTipAndPlace.onStation=1
        }
        selectedStationWithTipAndPlace.stan=rows[0].KODS;
        selectedStationWithTipAndPlace.stanName=rows[0].NAME;
        selectedStationWithTipAndPlace.filter={stanPO: stanpo};
        return selectedStationWithTipAndPlace
    } else {
        return null
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

export const duckProps = {moduleName, rusName, actions , selectedStationAndTipSelector }