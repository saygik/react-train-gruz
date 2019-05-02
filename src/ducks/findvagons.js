import {all, take, call, put, select,takeEvery} from 'redux-saga/effects'
import {appName} from '../config'
import {Record} from 'immutable'
import { createSelector } from 'reselect'
import { fetchFindVagons} from '../services/api'

import stanc from '../services/stanc'



/************************************************************************
 * Constants
 * */
export const moduleName = 'findvagons'
export const rusName = 'Поиск вагонов'
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
    vagons: [],
    loading: false,
    firstLoad: true,
    infoMsg: '',
    selectedVagon: null,
    findCriteria: null
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
                .set('vagons', payload.data)
        case EMPTY_FIND_VAGONS:
            return state
                .set('vagons', [])
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
export const vagonsSelector = createSelector(stateSelector, state=> state.vagons)
export const sVagonSelector = createSelector(stateSelector, state=> state.selectedVagon)
export const filtredSelectedvagonsSelector = createSelector(sVagonSelector, vagonsSelector, (selectedVagon,vagons )=> {
    if (selectedVagon !== null ) {
        return vagons.filter(row => row.Id===selectedVagon.id)
    } else {
        return []
    }
})

export const selectedVagonSelector = createSelector( filtredSelectedvagonsSelector, sVagonSelector, (filtredVagons, vagon) => {
    if (vagon && filtredVagons.length>0) {
        let selectedVagon=vagon
        selectedVagon.Kodv=filtredVagons[0].Kodv
        selectedVagon.Ves=filtredVagons[0].Ves
        selectedVagon.Namegruz=filtredVagons[0].Namegruz
        selectedVagon.Nameklient=filtredVagons[0].Nameklient
        return selectedVagon
    } else {
        return null
    }
})

export const findCriteriaSelector = createSelector(stateSelector, state=> state.findCriteria)
export const findCriteriaSelectorUI = createSelector(stateSelector, state=> {
 if (state.findCriteria !==null) {
     return state.findCriteria
 }
    return {stanName:'', onStation:0, onNod:0, tipName:''}
})

export const filtredStationPOSelector = createSelector(findCriteriaSelector, (criteria )=> {
    if (stanc && criteria) {
        const filterVagons=criteria.filter
        let filtradStanPO = []
        if (filterVagons) {
            filtradStanPO= stanc.filter(row => row.Kod===filterVagons.stanPO)
            return filtradStanPO.length===1 ? filtradStanPO[0].Name : ''
        }
    }
    return ''
})
export const filtredVagonsSelector = createSelector(findCriteriaSelector, vagonsSelector, (criteria,vagons )=> {
    if (vagons !== null && criteria !== null) {
        const filterVagons=criteria.filter
        if (filterVagons) {
            return vagons.filter(row => {
                let res=true
                if (filterVagons.stanPO){
                    res= (row.Kodslast===filterVagons.stanPO)
                }
                return res
            })
        } else {
            return vagons
        }

    } else {
        return []
    }
})
export const sumVesFindVagonsSelector = createSelector(filtredVagonsSelector, (vagons)=> {
    if (vagons && vagons.length>0) {
        return vagons.reduce((sum,row) => sum + parseInt(row.Ves),0)
    } else return 0
})

export const filtredNumeredVagonsSelector = createSelector(filtredVagonsSelector, (vagons )=> {
    if (vagons !== null) {
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
export const actions = {
    findVagonsByCriteria: (criteria)=> ({type: CRITERIA_CHANGE_FIND_VAGONS, payload: {criteria}}),
    selectVagon: (row)=> ({type: SELECT_ROW_FIND_VAGONS_REQUEST, payload: {row}}),
    closeFindVagonsHistory: () => ({type: DESELECT_ROW_FIND_VAGONS})

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

         // console.log('-criteria-',criteria)
        if (criteria === null) {
            yield put({
                type: EMPTY_FIND_VAGONS
            })
        }else {
            const res = yield call(fetchFindVagons, criteria);
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
        const row = yield select(selectedVagonSelector)
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