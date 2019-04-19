import {all, take, call, put, select,takeEvery} from 'redux-saga/effects'
import {appName} from '../config'
import {Record} from 'immutable'
import { createSelector } from 'reselect'
import { fetchPoezdVagons} from '../services/api'



/************************************************************************
 * Constants
 * */
export const moduleName = 'findpoezdvagons'
export const rusName = 'Вагоны поезда'
const prefix = `${appName}/${moduleName}`


export const FETCH_DATA_REQUEST = `${prefix}/FETCH_DATA_REQUEST`
export const FETCH_DATA_SUCCESS = `${prefix}/FETCH_DATA_SUCCESS`
export const FETCH_DATA_ERROR = `${prefix}/FETCH_DATA_ERROR`
export const EMPTY_DATA = `${prefix}/EMPTY_DATA`
export const CRITERIA_CHANGE_FIND_DATA = `${prefix}/CRITERIA_CHANGE_FIND_DATA`
export const SELECT_ROW_SUCCESS = `${prefix}/SELECT_ROW_SUCCESS`
export const SELECT_ROW_REQUEST = `${prefix}/SELECT_ROW_REQUEST`
export const DESELECT_ROW = `${prefix}/DESELECT_ROW`


/*************************************************************************
 * Reducer
 * */
export const ReducerRecord = Record({
    entities: [],
    loading: false,
    firstLoad: true,
    infoMsg: '',
    findCriteria: null,
    selectedRowId: null

})



export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action

    switch (type) {
        case SELECT_ROW_SUCCESS:
            return state
                .set('selectedRowId', payload)
        case DESELECT_ROW:
            return state
                .set('selectedRowId', null)
        case CRITERIA_CHANGE_FIND_DATA:
            return state
                .set('findCriteria', payload.criteria)
        case FETCH_DATA_REQUEST:
            return state
                .set('loading', true)
        case FETCH_DATA_SUCCESS:
            return state
                .set('loading', false)
                .set('entities', payload.data)
        case EMPTY_DATA:
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
export const stateSelector = state => state[moduleName]
export const entitiesSelector = createSelector(stateSelector, state=> state.entities)
export const findCriteriaSelector = createSelector(stateSelector, state=> state.findCriteria)
const selectedRowIdSelector = createSelector(stateSelector, state => state.selectedRowId)
export const sumVesSelector = createSelector(entitiesSelector, (vagons)=> {
    if (vagons && vagons.length>0) {
        return vagons.reduce((sum,row) => sum + parseInt(row.Ves),0)
    } else return 0
})
export const findPoezdCaptionSelector = createSelector(entitiesSelector, findCriteriaSelector,sumVesSelector, (vagons, findCriteria, sumVes)=> {
    return findCriteria
        ? `<p className="gruz-font-90 p-0 m-0">Поезд №<span class="text-success small font-weight-bold">${findCriteria.number}</span>
           индекс <span class="text-success font-weight-bold">${findCriteria.ind}</span>
            (<span class="text-primary small font-weight-bold">${findCriteria.namekodsfrom}-${findCriteria.namekods}</span>)</p>
           <p className="gruz-font-90 p-0 m-0">Всего вагонов: <span class="text-primary  font-weight-bold">${vagons.length}</span> Общий вес: <span class="text-primary  font-weight-bold">${sumVes}</span></p>`
        : ' '
})

const selectedNaturalRowSelector = createSelector(entitiesSelector, selectedRowIdSelector, (entities, selectedRow )=> {
    if (selectedRow !== null) {
        const selectedRows = entities.filter(row => row.Id===selectedRow.id)
        return selectedRows.length>0 ? selectedRows[0] : {}
    } else {
        return null
    }
})
export const selectedRowSelector = createSelector( selectedNaturalRowSelector,(row) => {
    return row ? {id: row.Id, Kodv: row.Kodv, Nameklient: row.Nameklient, Namegruz: row.Namegruz, Ves: row.Ves} : null
})



/**********************************************************************
 * Action Creators
 * */
export const actions = {
    findData:  (criteria) => ({type: CRITERIA_CHANGE_FIND_DATA, payload: {criteria}}),
    selectRow:  (payload) => ({type: SELECT_ROW_REQUEST, payload: payload}),
    closeExpandedVagon:  () => ({type: DESELECT_ROW})
}
/***********************************************************************
 * Sagas
 * */

export const criteriaChangeFindDataSaga = function * (action) {
    try {
        const newCriteria=action.payload
        const oldCriteria = yield select(findCriteriaSelector)
        if (newCriteria !== oldCriteria) {
            yield put({
                type: EMPTY_DATA
            })
            yield put({
                type: DESELECT_ROW
            })
            yield put({
                type: FETCH_DATA_REQUEST
            })

        }
    } catch (_) {

    }

}

export const fetchFindDataSaga = function * () {
    while (true) {
        yield take(FETCH_DATA_REQUEST)
        const criteria = yield select(findCriteriaSelector)

        // console.log('-criteria-',criteria)
        if (criteria === null) {
            yield put({
                type: EMPTY_DATA
            })
        }else {
            const res = yield call(fetchPoezdVagons, criteria);
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
export const selectRowSaga = function * (action) {

    try {
        const rowClicked=action.payload
        console.log('-1-',rowClicked)
        const row = yield select(selectedRowIdSelector)
        console.log('-2-',row)
        if (row === null || row.id!==rowClicked.id) {
            yield put({
                type: SELECT_ROW_SUCCESS,
                payload: {id: rowClicked.id}
            })
        } else {
            yield put({
                type: SELECT_ROW_SUCCESS,
                payload: null
            })
        }
    } catch (_) {

    }
}

export function* saga() {
    yield all([
        fetchFindDataSaga(),
        takeEvery(CRITERIA_CHANGE_FIND_DATA,criteriaChangeFindDataSaga),
        takeEvery(SELECT_ROW_REQUEST,selectRowSaga)
    ])
}