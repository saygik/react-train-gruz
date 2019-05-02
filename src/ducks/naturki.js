import {all, take, call, put, select,takeEvery} from 'redux-saga/effects'
import {appName} from '../config'
import {OrderedMap, Record, List} from 'immutable'
import { createSelector } from 'reselect'
import { arrToMap, fetchGruzNaturki} from '../services/api'


/************************************************************************
 * Constants
 * */
export const moduleName = 'naturki'
export const rusName = 'Натурки мест'
const prefix = `${appName}/${moduleName}`


export const FETCH_SPRAVKA_REQUEST = `${prefix}/FETCH_SPRAVKA_REQUEST`
export const FETCH_SPRAVKA_SUCCESS = `${prefix}/FETCH_SPRAVKA_SUCCESS`
export const FETCH_SPRAVKA_ERROR = `${prefix}/FETCH_SPRAVKA_ERROR`
export const SELECT_SPRAVKA_FIRSTLOAD = `${prefix}/SELECT_SPRAVKA_FIRSTLOAD`
export const CHECK_ALL_NATURKI = `${prefix}/CHECK_ALL_NATURKI`
export const CHECK_NOD = `${prefix}/CHECK_NOD`
export const SELECT_STANTION_FROM = `${prefix}/SELECT_STANTION_FROM`
export const SELECT_STANTION_TO = `${prefix}/SELECT_STANTION_TO`
export const SELECT_ROW_SUCCESS = `${prefix}/SELECT_ROW_SUCCESS`
export const SELECT_ROW_REQUEST = `${prefix}/SELECT_ROW_REQUEST`
export const DESELECT_ROW = `${prefix}/DESELECT_ROW`

/*************************************************************************
 * Reducer
 * */
export const ReducerRecord = Record({
    entities: new OrderedMap({}),
    loading: false,
    autoUpdateTime: 60000,
    firstLoad: true,
    bAllNaturki: false,
    bNod: true,
    infoMsg: '',
    selectedStantionTo: new List([]),
    selectedStantionFrom: new List([]),
    selectedRowId: null
})

// export const SpravOptionsRecord = Record({
//     value: null,
//     label: null,
// })

export const SpravRecord = Record({
    Id: null,
    Namekodsfrom: null,
    Namekods: null,
    Number: null,
    Ind: null,
    Nameoper: null,
    Datelast: null,
    Timelast: null,
    Namekodslast: null,
    Kodp: null,
    Colvag: null,
    Ves: null,
    Nod: null,
    Kodso: null,
    Kodsp: null,
    Fullnatur: null,
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

        case SELECT_STANTION_FROM:
            return state
                .set('selectedStantionFrom', List(payload))
        case SELECT_STANTION_TO:
            return state
                .set('selectedStantionTo', List(payload))
        case CHECK_ALL_NATURKI:
            return state
                .set('bAllNaturki', payload)
        case CHECK_NOD:
            return state
                .set('bNod', payload)
        case SELECT_SPRAVKA_FIRSTLOAD:
            return state
                .set('firstLoad', false)
        case FETCH_SPRAVKA_REQUEST:
            return state
                .set('loading', true)
                .set('infoMsg', "Обновление данных...")
        case FETCH_SPRAVKA_SUCCESS:
            return state
                .set('loading', false)
                .set('infoMsg', payload.msg)
                .set('entities', arrToMap(payload.data, SpravRecord))

        case FETCH_SPRAVKA_ERROR:
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
const entitiesSelector = createSelector(stateSelector, state=> state.entities.valueSeq().toArray())
const bAllNaturkiSelector = createSelector(stateSelector, state => state.bAllNaturki)
const selectedRowIdSelector = createSelector(stateSelector, state => state.selectedRowId)

const bNodSelector = createSelector(stateSelector, state => state.bNod)
const autoUpdateTimeSelector = createSelector(stateSelector, state => state.autoUpdateTime)
const selectedStantionFromValueSelector = createSelector(stateSelector, state => state.selectedStantionFrom.valueSeq().toArray())
const selectedStantionToValueSelector = createSelector(stateSelector, state => state.selectedStantionTo.valueSeq().toArray())

// export const selectedCellSelector = createSelector(stateSelector, state => state.spravSelectedCell)

const filtredEntitiesSelector = createSelector( entitiesSelector, bAllNaturkiSelector, bNodSelector,selectedStantionFromValueSelector, selectedStantionToValueSelector,
                                              ( entities, bAllNaturki, bNod, selectedStantionFromValue, selectedStantionToValue )=> {
        return entities.filter(row =>
               row.Fullnatur===bAllNaturki
            && row.Nod===bNod
            && (selectedStantionFromValue.length===0 || selectedStantionFromValue.some(e => e.label === row.Namekodsfrom))
            && (selectedStantionToValue.length===0 || selectedStantionToValue.some(e => e.label === row.Namekods))
        )
})

const filtredEntitiesForOptionsSelector = createSelector( entitiesSelector, bAllNaturkiSelector, bNodSelector,selectedStantionFromValueSelector, ( entities, bAllNaturki, bNod, selectedStantionFromValue )=> {
    return entities.filter(row => row.Fullnatur===bAllNaturki && row.Nod===bNod )
})

const selectedStantionFromSelector = createSelector(filtredEntitiesForOptionsSelector, (naturki )=> {
    const arr=naturki.map((elem)=> ({ value: elem.Id, label: elem.Namekodsfrom }))
    return arr
        .map(e => e['label'])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter(e => arr[e]).map(e => arr[e])
        .sort((a, b) => a.label.localeCompare(b.label))
})
const selectedStantionToSelector = createSelector(filtredEntitiesForOptionsSelector, (naturki )=> {
    const arr= naturki.map((elem)=> ({ value: elem.Id, label: elem.Namekods }))
    return arr
        .map(e => e['label'])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter(e => arr[e]).map(e => arr[e])
        .sort((a, b) => a.label.localeCompare(b.label))
})

const filtredNumeredEntitiesSelector = createSelector(filtredEntitiesSelector, (naturki )=> {
    if (naturki && naturki.length>0) {
        return naturki.map((elem, index)=>{
            const el=elem
            el.Idd=index+1
            return el
        })
    } else {
        return naturki
    }
})
const selectedNaturalRowSelector = createSelector(filtredNumeredEntitiesSelector, selectedRowIdSelector, (entities, selectedRow )=> {
    if (selectedRow !== null) {
        const selectedRows = entities.filter(row => row.Id===selectedRow.id)
        return selectedRows.length>0 ? selectedRows[0] : {}
    } else {
        return {}
    }
})
const selectedRowSelector = createSelector( selectedNaturalRowSelector,(row) => {
    return {
        id: row.Id,
        namekodsfrom: row.Namekodsfrom,
        namekods: row.Namekods,
        kodp: row.Kodp,
        number: row.Number,
        ind: row.Ind,
        fullnatur: row.Fullnatur ? 1 : 0,
    }
})

export const selectors= {
    selectedStantionToSelector,
    selectedStantionFromSelector,
    selectedStantionFromValueSelector,
    selectedStantionToValueSelector,
    filtredNumeredEntitiesSelector,
    bNodSelector,
    bAllNaturkiSelector,
    autoUpdateTimeSelector,
    selectedRowSelector
}

/**********************************************************************
 * Action Creators
 * */
export const actions = {
    fetchAll: () => ({type: FETCH_SPRAVKA_REQUEST}),
    allNaturkiCheck: (payload) => ({type: CHECK_ALL_NATURKI, payload: payload}),
    nodCheck: (payload) => ({type: CHECK_NOD, payload: payload}),
    selectStantionFrom: (payload) => ({type: SELECT_STANTION_FROM, payload: payload}),
    selectStantionTo: (payload) => ({type: SELECT_STANTION_TO, payload: payload}),
    selectRow: (payload) => ({type: SELECT_ROW_REQUEST, payload: payload}),
    closeExpanded: () => ({type: DESELECT_ROW})

}

/***********************************************************************
 * Sagas
 * */

export const fetchAllSaga = function * () {

    while (true){
        yield take(FETCH_SPRAVKA_REQUEST)
        const state= yield select(stateSelector)
        const res = yield call(fetchGruzNaturki);

        if (res.fetchOK) {
            if (state.firstLoad ) {
                yield put({
                    type: SELECT_SPRAVKA_FIRSTLOAD
                })
            }
            yield put({
                type: FETCH_SPRAVKA_SUCCESS,
                payload: {data: res.data, msg: res.msg}
            })

        }else {
            yield put({
                type: FETCH_SPRAVKA_ERROR,
                payload: {msg: res.msg }
            })
        }

    }
}

export const selectRowSaga = function * (action) {

    try {
        const rowClicked=action.payload
        const row = yield select(selectedRowIdSelector)
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
    } catch (err) {
        console.log('---',err)
    }
}

export function* saga() {
    yield all([
        fetchAllSaga(),
        takeEvery(SELECT_ROW_REQUEST,selectRowSaga)
    ])
}
