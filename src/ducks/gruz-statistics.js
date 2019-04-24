import {all, take, call, put} from 'redux-saga/effects'
import {appName} from '../config'
import {Record} from 'immutable'
import { createSelector } from 'reselect'
import { fetchStatistics} from '../services/api'



/************************************************************************
 * Constants
 * */
export const moduleName = 'gruzStatistics'
export const rusName = 'Показатели'
const prefix = `${appName}/${moduleName}`


export const FETCH_DATA_REQUEST = `${prefix}/FETCH_DATA_REQUEST`
export const FETCH_DATA_SUCCESS = `${prefix}/FETCH_DATA_SUCCESS`
export const FETCH_DATA_ERROR = `${prefix}/FETCH_DATA_ERROR`

/*************************************************************************
 * Reducer
 * */
export const ReducerRecord = Record({
    loading: false,
    autoUpdateTime: 60000,
    infoMsg: '',
    statistics: [
        {id: 1,value: 0, name:'Вагонов на отделении всего'},
        {id: 2,value: 0, name:'Вагонов на станциях'},
        {id: 3,value: 0, name:'Вагонов на ближних подходах'},
        {id: 4,value: 0, name:'Вагонов на дальних подходах'},
        {id: 5,value: 0, name:'Вагонов погружено'},
        {id: 6,value: 0, name:'Вес погруженных вагонов'},
        {id: 7,value: 0, name:'Вагонов выгружено'},
        {id: 8,value: 0, name:'Поступило вагонов на отделение'}
    ]
})



export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action

    switch (type) {
        case FETCH_DATA_REQUEST:
            return state
                .set('loading', true)
                .set('infoMsg', "Обновление данных...")
        case FETCH_DATA_SUCCESS:
            return state
                .set('loading', false)
                .set('infoMsg', payload.msg)
                .set('statistics', payload.data)
        case FETCH_DATA_ERROR:
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
export const statisticsSelector = createSelector(stateSelector, state=> state.statistics)
export const loadingSelector = createSelector(stateSelector, state=> state.loading)
export const autoUpdateTimeSelector = createSelector(stateSelector, state=> state.autoUpdateTime)
export const infoMsgSelector = createSelector(stateSelector, state=> state.infoMsg)

/**********************************************************************
 * Action Creators
 * */
export const fetchAll=() => ({type: FETCH_DATA_REQUEST})

/***********************************************************************
 * Sagas
 * */


export const fetchStatisticsSaga = function * () {
    while (true) {
        yield take(FETCH_DATA_REQUEST)
        // console.log('-criteria-',criteria)
            const res = yield call(fetchStatistics)
            if (res.fetchOK) {
                yield put({
                    type: FETCH_DATA_SUCCESS,
                    payload: {data: res.data, msg: res.msg}
                })
            }else {
                yield put({
                    type: FETCH_DATA_ERROR,
                    payload: {msg:  res.msg}
                })
            }
        }

}

export function* saga() {
    yield all([
        fetchStatisticsSaga()
    ])
}