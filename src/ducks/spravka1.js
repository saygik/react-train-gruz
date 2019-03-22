import {all, take, call, put, select,takeEvery} from 'redux-saga/effects'
import {appName,apiConfig} from '../config'
import {getCurrentDateTime, getFindVagonTipFromCol} from './utils'
import {Record} from 'immutable'
import { createSelector } from 'reselect'
import stanc2 from '../services/stanc'


/************************************************************************
 * Constants
 * */
export const moduleName = 'spravka1'
const prefix = `${appName}/${moduleName}`

export const FETCH_SPRAVKA1_REQUEST = `${prefix}/FETCH_SPRAVKA1_REQUEST`
export const FETCH_SPRAVKA1_SUCCESS = `${prefix}/FETCH_SPRAVKA1_SUCCESS`
export const FETCH_SPRAVKA1_ERROR = `${prefix}/FETCH_SPRAVKA1_ERROR`

export const FETCH_FIND_VAGONS_REQUEST = `${prefix}/FETCH_FIND_VAGONS_REQUEST`
export const FETCH_FIND_VAGONS_SUCCESS = `${prefix}/FETCH_FIND_VAGONS_SUCCESS`
export const FETCH_FIND_VAGONS_ERROR = `${prefix}/FETCH_FIND_VAGONS_ERROR`
export const EMPTY_FIND_VAGONS = `${prefix}/EMPTY_FIND_VAGONS`

export const SPRAVKA1_CELL_CHANGE_REQUEST = `${prefix}/SPRAVKA1_CELL_CHANGE_REQUEST`
export const SPRAVKA1_CELL_UNCHECK = `${prefix}/SPRAVKA1_CELL_UNCHECK`

export const SELECT_SPRAVKA1_FIRSTLOAD = `${prefix}/SELECT_SPRAVKA1_FIRSTLOAD`
export const SELECT_SPRAVKA1_CELL = `${prefix}/SELECT_SPRAVKA1_CELL`

/*************************************************************************
 * Reducer
 * */
export const ReducerRecord = Record({
    entities: [],
    vagons: [],
    loading: false,
    loadingVagons: false,
    firstLoad: true,
    infoMsg: '',
    sprav1SelectedCell: null
})



export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action

    switch (type) {
        case FETCH_FIND_VAGONS_REQUEST:
            return state
                .set('loadingVagons', true)
        case FETCH_FIND_VAGONS_SUCCESS:
            return state
                .set('loadingVagons', false)
                .set('vagons', payload.data)
        case EMPTY_FIND_VAGONS:
            return state
                .set('vagons', [])
        case FETCH_FIND_VAGONS_ERROR:
            return state
                .set('loadingVagons', false)

        case SELECT_SPRAVKA1_FIRSTLOAD:
            return state
                .set('firstLoad', false)

        case SELECT_SPRAVKA1_CELL:
            return state
                .set('sprav1SelectedCell', payload.cell)
        case SPRAVKA1_CELL_UNCHECK:
            return state
                .set('vagons', [])
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
export const vagonsSelector = createSelector(stateSelector, state=> state.vagons)
export const sumVesFindVagonsSelector = createSelector(vagonsSelector, (vagons)=> {
    if (vagons.length>0) {
        return vagons.reduce((sum,row) => sum + parseInt(row.Ves),0)
    } else return 0
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
        let selectedStationWithTipAndPlace = getFindVagonTipFromCol(station)
        selectedStationWithTipAndPlace.stan=rows[0].KODS
        selectedStationWithTipAndPlace.stanName=rows[0].NAME
        return selectedStationWithTipAndPlace
    } else {
        return null
    }
})


/**********************************************************************
 * Action Creators
 * */

export const fetchAll=() => {
    return {
        type: FETCH_SPRAVKA1_REQUEST
    }
}
export const selectSprav1Cell=(row)=> {
    return {
        type: SPRAVKA1_CELL_CHANGE_REQUEST,
        payload: row
    }
}

export const closeFindVagons=() => {
    return {
        type: SPRAVKA1_CELL_UNCHECK
    }
}



/***********************************************************************
 * Sagas
 * */

export const fetchAllSaga = function * () {

    while (true){
        yield take(FETCH_SPRAVKA1_REQUEST)
        const state= yield select(stateSelector)
        try {
            const response = yield call(fetch, apiConfig.apiGruzUrl+"gruzSprav1");

            if (response.status===200) {
                const data = yield call([response, response.json])
                if (state.firstLoad && data ) {
                    yield put({
                        type: SELECT_SPRAVKA1_FIRSTLOAD
                    })
                }
                yield put({
                    type: FETCH_SPRAVKA1_SUCCESS,
                    payload: {data: data.addata, msg: `Данные успешно обновлены ${getCurrentDateTime()}`}
                })

            } else {
                 yield put({
                    type: FETCH_SPRAVKA1_ERROR,
                    payload: {msg: `Ошибка получения данных с сервера` }
                })
            }

                //     yield put({
                //         type: SELECT_SPRAVKA1_FIRSTLOAD
                //     })
                //
                // yield put({
                //     type: FETCH_SPRAVKA1_SUCCESS,
                //     payload: {data: stanc2, msg: `Данные успешно обновлены ${getCurrentDateTime()}`}
                // })

        } catch (e) {
            console.log('error:',e);
            return null; // good to return something here
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
                 yield put({
                     type: EMPTY_FIND_VAGONS
                 })
                 yield put({
                     type: FETCH_FIND_VAGONS_REQUEST
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
                     yield put({
                         type: EMPTY_FIND_VAGONS
                     })
                        yield put({
                            type: FETCH_FIND_VAGONS_REQUEST
                        })

                 }

                 }

         }
    } catch (_) {

    }
}
export const fetchFindVagonsSaga = function * () {
    while (true) {
        yield take(FETCH_FIND_VAGONS_REQUEST)
//        const state= yield select(stateSelector)
        const row = yield select(selectedStationAndTipSelector)

        if (row === null) {
            yield put({
                type: EMPTY_FIND_VAGONS
            })
          }else {
            try {
                const response = yield call(fetch, apiConfig.apiGruzUrl + `gruzFindVagons/${row.stan}/${row.tip}/${row.onStation}/${row.onNod}`);
                if (response.status === 200) {
                    const data = yield call([response, response.json])
                    yield put({
                        type: FETCH_FIND_VAGONS_SUCCESS,
                        payload: {data: data.data, msg: `Данные успешно обновлены ${getCurrentDateTime()}`}
                    })
                } else {
                    yield put({
                        type: FETCH_FIND_VAGONS_ERROR,
                        payload: {msg: `Ошибка получения данных с сервера`}
                    })
                }

            } catch (e) {
                console.log('error:', e);
                return null; // good to return something here
            }
        }
    }
}


export function* saga() {
    yield all([
        fetchAllSaga(),
        fetchFindVagonsSaga(),
        takeEvery(SPRAVKA1_CELL_CHANGE_REQUEST,cellChange)
    ])
}