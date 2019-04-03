import {all, take, call, put, select,takeEvery} from 'redux-saga/effects'
import {appName} from '../config'
import { getFindVagonTipFromCol} from './utils'
import {Record} from 'immutable'
import { createSelector } from 'reselect'
import {fetchGruzSprav31, fetchFindVagons} from '../services/api'


/************************************************************************
 * Constants
 * */
export const moduleName = 'spravka31'
export const rusName = 'Наличие вагонов с местным грузом'
const prefix = `${appName}/${moduleName}`

export const FETCH_SPRAVKA31_REQUEST = `${prefix}/FETCH_SPRAVKA31_REQUEST`
export const FETCH_SPRAVKA31_SUCCESS = `${prefix}/FETCH_SPRAVKA31_SUCCESS`
export const FETCH_SPRAVKA31_ERROR = `${prefix}/FETCH_SPRAVKA31_ERROR`



export const SELECT_SPRAVKA31_FIRSTLOAD = `${prefix}/SELECT_SPRAVKA31_FIRSTLOAD`

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
        case SELECT_SPRAVKA31_FIRSTLOAD:
            return state
                .set('firstLoad', false)

        case FETCH_SPRAVKA31_REQUEST:
            return state
                .set('loading', true)
                .set('infoMsg', "Обновление данных...")
        case FETCH_SPRAVKA31_SUCCESS:
            return state
                .set('loading', false)
                .set('infoMsg', payload.msg)
                .set('entities', payload.data)
        case FETCH_SPRAVKA31_ERROR:
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

export const fetchAll=() => {
    return {
        type: FETCH_SPRAVKA31_REQUEST
    }
}



/***********************************************************************
 * Sagas
 * */

export const fetchAllSaga = function * () {

    while (true){
        yield take(FETCH_SPRAVKA31_REQUEST)
        const state= yield select(stateSelector)
        const res = yield call(fetchGruzSprav31);

        if (res.fetchOK) {
            if (state.firstLoad ) {
                yield put({
                    type: SELECT_SPRAVKA31_FIRSTLOAD
                })
            }
            yield put({
                type: FETCH_SPRAVKA31_SUCCESS,
                payload: {data: res.data, msg: res.msg}
            })

        }else {
            yield put({
                type: FETCH_SPRAVKA31_ERROR,
                payload: {msg: res.msg }
            })
        }
    }
}



export function* saga() {
    yield all([
        fetchAllSaga(),
    ])
}