import {all, take, call, put, select,takeEvery} from 'redux-saga/effects'
import {appName} from '../config'
import {OrderedMap, Record, } from 'immutable'
import { createSelector } from 'reselect'
import {arrToMapAsus, fetchAsusParks, fetchAsusWays} from '../services/api'



/************************************************************************
 * Constants
 * */
export const moduleName = 'asus'
export const rusName = 'Накопление на путях'
const prefix = `${appName}/${moduleName}`

export const FETCH_PARKS_REQUEST = `${prefix}/FETCH_PARKS_REQUEST`
export const FETCH_PARKS_SUCCESS = `${prefix}/FETCH_PARKS_SUCCESS`
export const FETCH_PARKS_ERROR = `${prefix}/FETCH_PARKS_ERROR`
export const SELECT_PARKS_FIRSTLOAD = `${prefix}/SELECT_PARKS_FIRSTLOAD`
export const FETCH_WAYS_REQUEST = `${prefix}/FETCH_WAYS_REQUEST`
export const FETCH_WAYS_SUCCESS = `${prefix}/FETCH_WAYS_SUCCESS`
export const FETCH_WAYS_ERROR = `${prefix}/FETCH_WAYS_ERROR`






/*************************************************************************
 * Reducer
 * */
export const ReducerRecord = Record({
    parks: new OrderedMap({}),
    loading: false,
    autoUpdateTime: 60000,
    firstLoad: false,
    infoMsg: ''
})


export const parkRecord = Record({
    id: null,
    num: null,
    name: null,
    tip: null,
    loading: false,
    ways: new OrderedMap({}),
})

export const wayRecord = Record({
    id: null,
    num_park: null,
    num_way: null,
    long_way: null,
    weight_way: null,
    lng_sum: null,
    ves_sum: null,
    kto_vgn: null,
    prk_id: null,
    loading: false,
    vagons: new OrderedMap({}),
})

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action

    switch (type) {
        case FETCH_PARKS_REQUEST:
            return state
                .set('loading', true)
                .set('infoMsg', "Обновление данных...")
        case FETCH_WAYS_REQUEST:
              return state
                .setIn(['parks', payload,'loading'], true)

        case FETCH_WAYS_SUCCESS:
            return state
                .setIn(['parks', payload.parkId,'loading'], false)
                .setIn(['parks', payload.parkId,'ways'], arrToMapAsus(payload.data, wayRecord))
        case FETCH_PARKS_SUCCESS:
            return state
                .set('loading', false)
                .set('infoMsg', payload.msg)
                .set('parks', arrToMapAsus(payload.data, parkRecord))
        case FETCH_PARKS_ERROR:
            return state
                .set('loading', false)
                .set('firstLoad', false)
                .set('infoMsg', payload.msg)

        default:
            return state
    }
}

/*********************************************************************
 * Selectors
 * */
const stateSelector = state => state[moduleName]
const parksSelector = createSelector(stateSelector, state=> {
//    console.log('-parks-',state.parks)
    return state.parks.valueSeq().toArray()
})

export const selectors= {
    parksSelector
}

/**********************************************************************
 * Action Creators
 * */
export const actions = {
    fetchAll: () => ({type: FETCH_PARKS_REQUEST}),
    fetchWays:  (payload) => ({type: FETCH_WAYS_REQUEST, payload: payload}),


}

/***********************************************************************
 * Sagas
 * */
export const fetchAllSaga = function * () {

    while (true){
        yield take(FETCH_PARKS_REQUEST)
        const state= yield select(stateSelector)
        const res = yield call(fetchAsusParks);

        if (res.fetchOK) {
            if (state.firstLoad ) {
                yield put({
                    type: SELECT_PARKS_FIRSTLOAD
                })
            }
            yield put({
                type: FETCH_PARKS_SUCCESS,
                payload: {data: res.data, msg: res.msg}
            })

        }else {
            yield put({
                type: FETCH_PARKS_ERROR,
                payload: {msg: res.msg }
            })
        }

    }
}
export const fetchWaysSaga = function * (action) {
    try {
        const parkId=action.payload
        const res = yield call(fetchAsusWays,parkId);
        if (res.fetchOK) {
            yield put({
                type: FETCH_WAYS_SUCCESS,
                payload: {data: res.data, msg: res.msg, parkId: parkId}
            })

        }else {
            yield put({
                type: FETCH_WAYS_ERROR,
                payload: {msg: res.msg }
            })
        }
    } catch (_) {

    }

}


export function* saga() {
    yield all([
        fetchAllSaga(),
        takeEvery(FETCH_WAYS_REQUEST,fetchWaysSaga)

    ])
}
