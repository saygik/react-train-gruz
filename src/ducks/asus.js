import {all, take, call, put, select,takeEvery} from 'redux-saga/effects'
import {appName} from '../config'
import {OrderedMap, Record, } from 'immutable'
import { createSelector } from 'reselect'
import {arrToMapAsus,arrToMapAsusVagons, fetchAsusParks, fetchAsusWays, fetchAsusVagons} from '../services/api'



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
export const COLLAPSE_PARK = `${prefix}/COLLAPSE_PARK`
export const FETCH_VAGONS_REQUEST = `${prefix}/FETCH_VAGONS_REQUEST`
export const FETCH_VAGONS_SUCCESS = `${prefix}/FETCH_VAGONS_SUCCESS`
export const FETCH_VAGONS_ERROR = `${prefix}/FETCH_VAGONS_ERROR`
export const COLLAPSE_WAY = `${prefix}/COLLAPSE_WAY`






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
    expanded: false,
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
    expanded: false,
    vagons: new OrderedMap({}),
})
export const vagonRecord = Record({
    ord_num: null,
    id_vgn: null,
    rod_v: null,
    ves_gruz: null,
    destn: null,
    cod_gruz: null,
    cod_grpl: null
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
                  .setIn(['parks', payload.parkId,'loading'], true)
        case FETCH_WAYS_SUCCESS:
            return state
                .setIn(['parks', payload.parkId,'loading'], false)
                .setIn(['parks', payload.parkId,'expanded'], true)
                .setIn(['parks', payload.parkId,'ways'], arrToMapAsus(payload.data, wayRecord))
        case FETCH_WAYS_ERROR:
            return state
                .setIn(['parks', payload.parkId,'loading'], false)
                .setIn(['parks', payload.parkId,'expanded'], false)
                .setIn(['parks', payload.parkId,'ways'], new OrderedMap({}))
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
        case COLLAPSE_PARK:
            return state
                .setIn(['parks', payload.parkId,'loading'], false)
                .setIn(['parks', payload.parkId,'expanded'], false)
                .setIn(['parks', payload.parkId,'ways'], new OrderedMap({}))
        case FETCH_VAGONS_REQUEST:
            return state
                .setIn(['parks',payload.parkId,'ways',payload.wayId,'loading'], true)
        case FETCH_VAGONS_SUCCESS:
            return state
                .setIn(['parks',payload.parkId,'ways',payload.wayId,'loading'], false)
                .setIn(['parks',payload.parkId,'ways',payload.wayId,'expanded'], true)
                .setIn(['parks',payload.parkId,'ways',payload.wayId,'vagons'], arrToMapAsusVagons(payload.data, vagonRecord))
        case FETCH_VAGONS_ERROR:
            return state
                .setIn(['parks',payload.parkId,'ways',payload.wayId,'loading'], false)
                .setIn(['parks',payload.parkId,'ways',payload.wayId,'expanded'], false)
                .setIn(['parks',payload.parkId,'ways',payload.wayId,'vagons'], new OrderedMap({}))
        case COLLAPSE_WAY:
            return state
                .setIn(['parks',payload.parkId,'ways',payload.wayId,'loading'], false)
                .setIn(['parks',payload.parkId,'ways',payload.wayId,'expanded'], false)
        default:
            return state
    }
}

/*********************************************************************
 * Selectors
 * */
const stateSelector = state => state[moduleName]
const parksSelector = createSelector(stateSelector, state => {
//    console.log('-parks-',state.parks)
    return state.parks.valueSeq().toArray()
})
const parksRecordSelector = createSelector(stateSelector, state => {
    return state.parks
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
    fetchVagons:  (payload) => ({type: FETCH_VAGONS_REQUEST, payload: payload}),

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
        const parkId=action.payload.parkId
        const parks = yield select(parksRecordSelector)
        const expandedPark = parks.get(parkId).get('expanded')
        if (expandedPark) {
            yield put({
                type: COLLAPSE_PARK,
                payload: {parkId: parkId}
            })
        } else {
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
        }
    } catch (_) {

    }
}
export const fetchVagonsSaga = function * (action) {
    try {
        const parkId=action.payload.parkId
        const wayId=action.payload.wayId
        const parks = yield select(parksRecordSelector)
        const expandedWay = parks.getIn([parkId,'ways',wayId,'expanded'])
        if (expandedWay) {
            yield put({
                type: COLLAPSE_WAY,
                payload: {parkId: parkId, wayId: wayId}
            })
        } else {
            const res = yield call(fetchAsusVagons,wayId);
            if (res.fetchOK) {
                yield put({
                    type: FETCH_VAGONS_SUCCESS,
                    payload: {data: res.data, msg: res.msg, parkId: parkId, wayId: wayId}
                })

            }else {
                yield put({
                    type: FETCH_VAGONS_ERROR,
                    payload: {msg: res.msg }
                })
            }
        }
    } catch (err) {
        console.log('-ERROR-',err)
    }

}

export function* saga() {
    yield all([
        fetchAllSaga(),
        takeEvery(FETCH_WAYS_REQUEST,fetchWaysSaga),
        takeEvery(FETCH_VAGONS_REQUEST,fetchVagonsSaga)
    ])
}
