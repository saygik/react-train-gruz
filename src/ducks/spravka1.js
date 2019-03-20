import {all, take, call, put, select} from 'redux-saga/effects'
import {appName,apiConfig} from '../config'
import {getCurrentDateTime} from './utils'
import {Record} from 'immutable'



/************************************************************************
 * Constants
 * */
export const moduleName = 'spravka1'
const prefix = `${appName}/${moduleName}`

export const FETCH_SPRAVKA1_REQUEST = `${prefix}/FETCH_SPRAVKA1_REQUEST`
export const FETCH_SPRAVKA1_SUCCESS = `${prefix}/FETCH_SPRAVKA1_SUCCESS`
export const FETCH_SPRAVKA1_ERROR = `${prefix}/FETCH_SPRAVKA1_ERROR`
export const SELECT_SPRAVKA1_COL = `${prefix}/SELECT_SPRAVKA1_COL`
export const SELECT_SPRAVKA1_ROW = `${prefix}/SELECT_SPRAVKA1_ROW`
export const SELECT_SPRAVKA1_FIRSTLOAD = `${prefix}/SELECT_SPRAVKA1_FIRSTLOAD`

/*************************************************************************
 * Reducer
 * */
export const ReducerRecord = Record({
    entities: [],
    vagons: [],
    loading: false,
    firstLoad: true,
    infoMsg: '',
    sprav1ExpandedRows:[],
    sprav1ExpandedCol:''
})



export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action

    switch (type) {
        case FETCH_SPRAVKA1_REQUEST:
            return state
                .set('loading', true)
                .set('infoMsg', "Обновление данных...")
        case SELECT_SPRAVKA1_FIRSTLOAD:
            return state
                .set('firstLoad', false)
        case SELECT_SPRAVKA1_COL:
            return state
                .set('sprav1ExpandedCol', payload.col)
        case SELECT_SPRAVKA1_ROW:
            return state
                .set('sprav1ExpandedRows', payload.row)
        case FETCH_SPRAVKA1_ERROR:
            return state
                .set('loading', false)
                .set('infoMsg', payload.msg)

        case FETCH_SPRAVKA1_SUCCESS:
            return state
                .set('loading', false)
                .set('infoMsg', payload.msg)
                .set('entities', payload.data)

        default:
            return state
    }
}

/*********************************************************************
 * Selectors
 * */
export const stateSelector = state => state[moduleName]

/**********************************************************************
 * Action Creators
 * */

export function fetchAll() {
    return {
        type: FETCH_SPRAVKA1_REQUEST
    }
}
export function selectSprav1ExpandedCol(col) {
    return {
        type: SELECT_SPRAVKA1_COL,
        payload: {col}
    }
}
export function selectSprav1ExpandedRow(row) {
    return {
        type: SELECT_SPRAVKA1_ROW,
        payload: {row}
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

            if (response.status=="200") {
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

        } catch (e) {
            console.log('error:',e);
            return null; // good to return something here
        }

    }
}





export function* saga() {
    yield all([
        fetchAllSaga()
    ])
}