import {all, take, call, put, select,takeEvery} from 'redux-saga/effects'
import {appName} from '../config'
import {Record} from 'immutable'
import { createSelector } from 'reselect'
import { fetchVagonHistory} from '../services/api'



/************************************************************************
 * Constants
 * */
export const moduleName = 'findvagonhistory'
export const rusName = 'История вагона'
const prefix = `${appName}/${moduleName}`


export const FETCH_DATA_REQUEST = `${prefix}/FETCH_DATA_REQUEST`
export const FETCH_DATA_SUCCESS = `${prefix}/FETCH_DATA_SUCCESS`
export const FETCH_DATA_ERROR = `${prefix}/FETCH_DATA_ERROR`
export const EMPTY_FIND_VAGONS = `${prefix}/EMPTY_FIND_VAGONS`
export const CRITERIA_CHANGE_FIND_VAGON = `${prefix}/CRITERIA_CHANGE_FIND_VAGONS`

/*************************************************************************
 * Reducer
 * */
export const ReducerRecord = Record({
    entities: [],
    loading: false,
    firstLoad: true,
    infoMsg: '',
    findCriteria: null
})



export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action

    switch (type) {
        case CRITERIA_CHANGE_FIND_VAGON:
            return state
                .set('findCriteria', payload.criteria)
        case FETCH_DATA_REQUEST:
            return state
                .set('loading', true)
        case FETCH_DATA_SUCCESS:
            return state
                .set('loading', false)
                .set('entities', payload.data)
        case EMPTY_FIND_VAGONS:
            return state
                .set('entities', [])
        case FETCH_DATA_ERROR:
            return state
                .set('loading', false)


        default:
            return state
    }
}

/*********************************************************************
 * Selectors
 * */
export const stateSelector = state => state[moduleName];
export const vagonRecordsSelector = createSelector(stateSelector, state=> state.entities)
export const findCriteriaSelector = createSelector(stateSelector, state=> state.findCriteria)
export const findVagonCaptionSelector = createSelector(findCriteriaSelector, (findCriteria)=> {
    return findCriteria
        ? `<p className="gruz-font-90 p-0 m-0">Вагон № <span class="text-success  font-weight-bold">${findCriteria.Kodv}</span></p>
           <p className="gruz-font-90 p-0 m-0">Грузополучатель: <span class="text-primary small font-weight-bold">${findCriteria.Nameklient}</span>,
           Груз: <span class="text-primary small font-weight-bold">${findCriteria.Namegruz}</span>,
           Вес: <span class="text-primary small font-weight-bold">${findCriteria.Ves}</span></p>`
        : ' '
})

/**********************************************************************
 * Action Creators
 * */
export const findVagonInHistory=(criteria) => ({type: CRITERIA_CHANGE_FIND_VAGON,payload: {criteria}})

/***********************************************************************
 * Sagas
 * */

export const criteriaChangeFindVagonSaga = function * (action) {
    try {
        const newCriteria=action.payload
        const oldCriteria = yield select(findCriteriaSelector)
        if (newCriteria !== oldCriteria) {
            yield put({
                type: EMPTY_FIND_VAGONS
            })
            yield put({
                type: FETCH_DATA_REQUEST
            })

        }
    } catch (_) {

    }

}

export const fetchFindVagonSaga = function * () {
    while (true) {
        yield take(FETCH_DATA_REQUEST)
        const criteria = yield select(findCriteriaSelector)

        // console.log('-criteria-',criteria)
        if (criteria === null) {
            yield put({
                type: EMPTY_FIND_VAGONS
            })
        }else {
            const res = yield call(fetchVagonHistory, criteria);
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
}

export function* saga() {
    yield all([
        fetchFindVagonSaga(),
        takeEvery(CRITERIA_CHANGE_FIND_VAGON,criteriaChangeFindVagonSaga),
    ])
}