import {all, take, call, put, select,takeEvery} from 'redux-saga/effects'
import {appName} from '../config'
import {OrderedMap, Record, List} from 'immutable'
import { createSelector } from 'reselect'
import { fetchAsusParks } from '../services/api'
import {FETCH_SPRAVKA_REQUEST} from "./naturki"

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



/*************************************************************************
 * Reducer
 * */
export const ReducerRecord = Record({
    entities: new OrderedMap({}),
    loading: false,
    autoUpdateTime: 60000,
    firstLoad: false,
    infoMsg: ''
})



export const SpravRecord = Record({

})

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action

    switch (type) {
        case FETCH_PARKS_REQUEST:
            return state
                .set('loading', true)
                .set('infoMsg', "Обновление данных...")

        default:
            return state
    }
}

/*********************************************************************
 * Selectors
 * */
const stateSelector = state => state[moduleName]

export const selectors= {

}

/**********************************************************************
 * Action Creators
 * */
export const actions = {
    fetchAll: () => ({type: FETCH_PARKS_REQUEST})
  }

/***********************************************************************
 * Sagas
 * */
export const fetchAllSaga = function * () {

    while (true){
        yield take(FETCH_PARKS_REQUEST)
        console.log('Request')
        const state= yield select(stateSelector)
        const res = yield call(fetchAsusParks);

        if (res.fetchOK) {
            if (state.firstLoad ) {
                yield put({
                    type: SELECT_PARKS_FIRSTLOAD
                })
            }
            console.log(res.data)
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

export function* saga() {
    yield all([
        fetchAllSaga()
    ])
}
