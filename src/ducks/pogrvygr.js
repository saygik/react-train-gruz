import {all, take, call, put, select,takeEvery} from 'redux-saga/effects'
import {appName} from '../config'
import {OrderedMap, Record} from 'immutable'
import { createSelector } from 'reselect'
import {arrToMap, fetchPogrVygr} from '../services/api'
import { declOfNum} from './utils'



/************************************************************************
 * Constants
 * */
export const moduleName = 'pogrvygr'
export const rusName = 'Погрузка, выгрузка, поступление вагонов'
const prefix = `${appName}/${moduleName}`


export const FETCH_FIND_VAGONS_REQUEST = `${prefix}/FETCH_FIND_VAGONS_REQUEST`
export const FETCH_FIND_VAGONS_SUCCESS = `${prefix}/FETCH_FIND_VAGONS_SUCCESS`
export const FETCH_FIND_VAGONS_ERROR = `${prefix}/FETCH_FIND_VAGONS_ERROR`
export const EMPTY_FIND_VAGONS = `${prefix}/EMPTY_FIND_VAGONS`
export const CRITERIA_CHANGE_FIND_VAGONS = `${prefix}/CRITERIA_CHANGE_FIND_VAGONS`
export const SELECT_ROW_FIND_VAGONS_REQUEST = `${prefix}/SELECT_ROW_FIND_VAGONS_REQUEST`
export const SELECT_ROW_FIND_VAGONS_SUCCESS = `${prefix}/SELECT_ROW_FIND_VAGONS_SUCCESS`
export const DESELECT_ROW_FIND_VAGONS = `${prefix}/DESELECT_ROW_FIND_VAGONS`

/*************************************************************************
 * Reducer
 * findCriteria {
 *               stan: ''
 *               tip: 0
 *               onStation: 1
 *               onNod: 1
 *              }
 * */
export const ReducerRecord = Record({
     vagons:  new OrderedMap({}),
     loading: false,
     firstLoad: true,
     infoMsg: '',
     selectedVagon: null,
     findCriteria: null
} )
export const SpravRecord = Record({
    Id: null,
    Kodv: null,
    Nameoper: null,
    Datelast:  null,
    Timelast:  null,
    Namekods:  null,
    Nameklient:  null,
    Namegruz:  null,
    Ves:  null,
    Nametip:  null,
    Namelast:  null,
    Oper:  null,
})


export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action

    switch (type) {
        case SELECT_ROW_FIND_VAGONS_SUCCESS:
            return state
                .set('selectedVagon', payload.vagon)
        case DESELECT_ROW_FIND_VAGONS:
            return state
                .set('selectedVagon', null)
        case CRITERIA_CHANGE_FIND_VAGONS:
            return state
                .set('findCriteria', payload.criteria)
        case FETCH_FIND_VAGONS_REQUEST:
            return state
                .set('loading', true)
        case FETCH_FIND_VAGONS_SUCCESS:
            return state
                .set('loading', false)
                .set('vagons', arrToMap(payload.data, SpravRecord))

        case EMPTY_FIND_VAGONS:
            return state
                .set('vagons', new OrderedMap({}))
        case FETCH_FIND_VAGONS_ERROR:
            return state
                .set('loadingVagons', false)


        default:
            return state
    }
}

/*********************************************************************
 * Selectors
 * */
export const stateSelector = state => state[moduleName];
export const vagonsSelector = createSelector(stateSelector, state=> {
    return state.vagons
})
export const dataSelector = createSelector(stateSelector, state=> state.vagons.valueSeq().toArray())
export const sVagonSelector = createSelector(stateSelector, state=> state.selectedVagon)
export const filtredSelectedvagonsSelector = createSelector(sVagonSelector, vagonsSelector, (selectedVagon,vagons )=> {
    return selectedVagon && OrderedMap(vagons.get(selectedVagon.id)).set('col', selectedVagon.col)
})

export const selectedVagonSelector = createSelector( filtredSelectedvagonsSelector, (filtredVagons) => {
    return filtredVagons && {
        id: filtredVagons.get('Id'),
        Kodv: filtredVagons.get('Kodv'),
        Ves: filtredVagons.get('Ves'),
        Namegruz: filtredVagons.get('Namegruz'),
        Nameklient: filtredVagons.get('Nameklient'),
    }
})

export const findCriteriaSelector = createSelector(stateSelector, state=> state.findCriteria)
export const findCriteriaSelectorUI = createSelector(stateSelector,vagonsSelector, (state, vagons)=> {
    const operations={88 : 'Погружено', 89: `Выгружено`, 10: 'Поступило'}
    const onStations={88 : 'станции', 89: `станции`, 10: 'станцию'}
    if (state.findCriteria !==null) {
        let criteria=state.findCriteria
        if (vagons && vagons.size>0) {
            criteria.caption=`${operations[criteria.oper]} ${vagons.size} 
                               <span class="text-primary">${criteria.tipName}</span>
                               ${declOfNum(vagons.length,['вагон','вагона','вагонов'])} на ${onStations[criteria.oper]} 
                                <span class="badge badge-secondary">${criteria.stanName}</span>`
        } else {
            criteria.caption=` `
        }
        return criteria
    }
    return {stanName:'', onStation:0, onNod:0, tipName:''}
})

export const filtredNumeredVagonsSelector = createSelector(dataSelector, (vagons )=> {
    if (vagons && vagons.length>0) {
        return vagons.map((elem, index)=>{
            const el=elem
            el.Idd=index+1
            return el
        })
    } else {
        return vagons
    }
})

/**********************************************************************
 * Action Creators
 * */
export const findVagonsByCriteria=(criteria) => {
    return {
        type: CRITERIA_CHANGE_FIND_VAGONS,
        payload: {criteria}

    }
}
export const selectVagon=(row) => {
    return {
        type: SELECT_ROW_FIND_VAGONS_REQUEST,
        payload: {row}

    }
}

export const closeFindVagonsHistory=() => {
    return {
        type: DESELECT_ROW_FIND_VAGONS

    }
}

/***********************************************************************
 * Sagas
 * */

export const criteriaChangeFindVagonsSaga = function * (action) {
    try {
        const newCriteria=action.payload
        const oldCriteria = yield select(findCriteriaSelector)
        if (newCriteria !== oldCriteria) {
            yield put({
                type: EMPTY_FIND_VAGONS
            })
            yield put({
                type: DESELECT_ROW_FIND_VAGONS
            })
            yield put({
                type: FETCH_FIND_VAGONS_REQUEST
            })

        }
    } catch (_) {

    }

}

export const fetchFindVagonsSaga = function * () {
    while (true) {
        yield take(FETCH_FIND_VAGONS_REQUEST)
        const criteria = yield select(findCriteriaSelector)

//         console.log('-criteria-',criteria)
        if (criteria === null) {
            yield put({
                type: EMPTY_FIND_VAGONS
            })
        }else {
            const res = yield call(fetchPogrVygr, criteria);
            if (res.fetchOK) {
                yield put({
                    type: FETCH_FIND_VAGONS_SUCCESS,
                    payload: {data: res.data, msg: res.msg}
                })

            }else {
                yield put({
                    type: FETCH_FIND_VAGONS_ERROR,
                    payload: {msg:  res.msg}
                })
            }
        }
    }
}
export const selectRowSaga = function * (action) {

    try {
        const rowClicked=action.payload
//        console.log('-rowClicked-',rowClicked)
        const row = yield select(selectedVagonSelector)
//        console.log('-row-',row)
        if (row === null || row.id!==rowClicked.row.id) {
            yield put({
                type: SELECT_ROW_FIND_VAGONS_SUCCESS,
                payload: {vagon: {id: rowClicked.row.id}}
            })
        } else {
            yield put({
                type: SELECT_ROW_FIND_VAGONS_SUCCESS,
                payload: {vagon: null}
            })
        }
    } catch (_) {

    }
}


export function* saga() {
    yield all([
        fetchFindVagonsSaga(),
        takeEvery(CRITERIA_CHANGE_FIND_VAGONS,criteriaChangeFindVagonsSaga),
        takeEvery(SELECT_ROW_FIND_VAGONS_REQUEST,selectRowSaga)
    ])
}