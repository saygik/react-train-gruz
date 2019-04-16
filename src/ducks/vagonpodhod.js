import {all, take, call, put, select,takeEvery} from 'redux-saga/effects'
import {appName} from '../config'
import {Record} from 'immutable'
import { createSelector } from 'reselect'
import {fetchPodhod, fetchGruzStantions} from '../services/api'

/************************************************************************
 * Constants
 * */
export const moduleName = 'podhod'
export const rusName = 'Подход вагонов'
const prefix = `${appName}/${moduleName}`

export const FETCH_PODHOD_REQUEST = `${prefix}/FETCH_PODHOD_REQUEST`
export const FETCH_PODHOD_SUCCESS = `${prefix}/FETCH_PODHOD_SUCCESS`
export const FETCH_PODHOD_ERROR = `${prefix}/FETCH_PODHOD_ERROR`
export const PODHOD_EMPTY = `${prefix}/PODHOD_EMPTY`
export const FETCH_PODHOD_STANTIONS_REQUEST = `${prefix}/FETCH_PODHOD_STANTIONS_REQUEST`
export const FETCH_PODHOD_STANTIONS_SUCCESS = `${prefix}/FETCH_PODHOD_STANTIONS_SUCCESS`
export const FETCH_PODHOD_STANTIONS_ERROR = `${prefix}/FETCH_PODHOD_STANTIONS_ERROR`
export const SELECT_CURRENT_PODHOD = `${prefix}/SELECT_CURRENT_PODHOD`
export const SELECT_CURRENT_STANTION = `${prefix}/SELECT_CURRENT_STANTION`
export const SELECT_PODHOD_FIRSTLOAD = `${prefix}/SELECT_PODHOD_FIRSTLOAD`
export const SELECT_ROW_FIND_VAGONS_REQUEST = `${prefix}/SELECT_ROW_FIND_VAGONS_REQUEST`
export const SELECT_ROW_FIND_VAGONS_SUCCESS = `${prefix}/SELECT_ROW_FIND_VAGONS_SUCCESS`
export const DESELECT_ROW_FIND_VAGONS = `${prefix}/DESELECT_ROW_FIND_VAGONS`

/*************************************************************************
 * Reducer
 * */
export const ReducerRecord = Record({
    stantions: [],
    stantionPodhod: [],
    loading: false,
    firstLoad: true,
    selectedPodhod: 2,
    selectedStantion: null,
    selectedVagon: null,
    infoMsg: '',
    sprav1SelectedCell: null
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
        case PODHOD_EMPTY:
            return state
                .set('stantionPodhod', [])
        case FETCH_PODHOD_REQUEST:
            return state
                .set('loading', true)
                .set('infoMsg', payload.msg)
        case FETCH_PODHOD_SUCCESS:
            return state
                .set('loading', false)
                .set('infoMsg', payload.msg)
                .set('stantionPodhod', payload.data)
        case FETCH_PODHOD_ERROR:
            return state
                .set('loading', false)
                .set('infoMsg', payload.msg)
                .set('stantionPodhod', [])

        case SELECT_CURRENT_PODHOD:
            return state
                .set('selectedPodhod', payload.podhod)
        case SELECT_CURRENT_STANTION:
            return state
                .set('selectedStantion', payload.stantion)
        case SELECT_PODHOD_FIRSTLOAD:
            return state
                .set('firstLoad', false)

        case FETCH_PODHOD_STANTIONS_REQUEST:
            return state
                .set('loading', true)
        case FETCH_PODHOD_STANTIONS_SUCCESS:
            return state
                .set('loading', false)
                .set('firstLoad', false)
                .set('stantions', payload.data)
        case FETCH_PODHOD_STANTIONS_ERROR:
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
export const stantionsSelector = createSelector(stateSelector, state=> state.stantions)
export const selectedPodhodSelector = createSelector(stateSelector, state=> state.selectedPodhod)
export const stantionsPodhodSelector = createSelector(stateSelector, state=> state.stantionPodhod)
export const stantionsPodhodFiltredSelector = createSelector(stantionsPodhodSelector, selectedPodhodSelector, (podhod, selectedPodhod)=> {
    return podhod.filter((onePodhod)=>onePodhod.IdPodhod===selectedPodhod).map((elem, index)=>{
        const el=elem
        el.Idd=index+1
        return el
    })

})
export const sVagonSelector = createSelector(stateSelector, state=> state.selectedVagon)
export const filtredSelectedvagonsSelector = createSelector(sVagonSelector, stantionsPodhodFiltredSelector, (selectedVagon,vagons )=> {
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

export const numPodhodsFiltredSelector = createSelector(stantionsPodhodFiltredSelector, (podhods)=> {
    return podhods.length
})

export const stantionsPodhodOnStantionSelector = createSelector(stantionsPodhodSelector, (podhod)=> {
    return podhod.filter((onePodhod)=> onePodhod.IdPodhod===2).reduce((sum, elem) => sum + 1,0)
})
export const stantionsPodhodOnNodSelector = createSelector(stantionsPodhodSelector, (podhod)=> {
    return podhod.filter((onePodhod)=> onePodhod.IdPodhod===1).reduce((sum, elem) => sum + 1,0)
})
export const stantionsPodhodOnDorSelector = createSelector(stantionsPodhodSelector, (podhod)=> {
    return podhod.filter((onePodhod)=> onePodhod.IdPodhod===0).reduce((sum, elem) => sum + 1,0)
})

export const numPodhodsSelector = createSelector(stantionsPodhodOnStantionSelector, stantionsPodhodOnNodSelector,stantionsPodhodOnDorSelector, (onStation, onNod, onDor)=> {
    return [onDor, onNod, onStation]
})

export const selectedStantionSelector = createSelector(stateSelector, state=> state.selectedStantion)
export const stantionsOptionsSelector = createSelector(stantionsSelector, (stantions)=> {
    return stantions.map((stantion)=>{
        return     { value: stantion.Kod, label: stantion.Name }
    })
})



/**********************************************************************
 * Action Creators
 * */
export const actions = {
    fetchStantions: () => ({type: FETCH_PODHOD_STANTIONS_REQUEST}),
    selectCurrentPodhod: (podhod)=> ({type: SELECT_CURRENT_PODHOD, payload: {podhod}}),
    selectCurrentStantion: (stantion)=> ({type: SELECT_CURRENT_STANTION, payload: {stantion}}),
    selectVagon: (row)=> ({type: SELECT_ROW_FIND_VAGONS_REQUEST, payload: {row}}),
    closeExpanded: () => ({type: DESELECT_ROW_FIND_VAGONS})

}

/***********************************************************************
 * Sagas
 * */

export const fetchStantionsSaga = function * () {

    try {
        const res = yield call(fetchGruzStantions);
        if (res.fetchOK) {
            yield put({
                type: FETCH_PODHOD_STANTIONS_SUCCESS,
                payload: {data: res.data, msg: res.msg}
            })
        }else {
            yield put({
                type: FETCH_PODHOD_STANTIONS_ERROR,
            })
            }
        } catch (_) {

        }

}
export const fetchPodhodSaga = function * () {

    while (true){
        const action = yield take(FETCH_PODHOD_REQUEST)
        yield put({
            type: PODHOD_EMPTY
        })
        const stantion = action.payload.stantion
        const res = yield call(fetchPodhod,stantion.value);

        if (res.fetchOK) {
            yield put({
                type: FETCH_PODHOD_SUCCESS,
                payload: {data: res.data, msg: res.msg}
            })

            const nOnStantion = yield select(stantionsPodhodOnStantionSelector)
            if (nOnStantion>0) {
                yield put({
                    type: SELECT_CURRENT_PODHOD,
                    payload: {podhod: 2 }
                })
            } else {
                const nNodStantion = yield select(stantionsPodhodOnNodSelector)
                if (nNodStantion>0) {
                    yield put({
                        type: SELECT_CURRENT_PODHOD,
                        payload: {podhod: 1 }
                    })
                } else {
                    const nDorStantion = yield select(stantionsPodhodOnDorSelector)
                    if (nDorStantion>0) {
                        yield put({
                            type: SELECT_CURRENT_PODHOD,
                            payload: {podhod: 0 }
                        })
                    } else {
                        yield put({
                            type: SELECT_CURRENT_PODHOD,
                            payload: {podhod: 2 }
                        })
                    }

                }

            }

        }else {
            yield put({
                type: FETCH_PODHOD_ERROR,
                payload: {msg: res.msg }
            })
        }
    }
}

export const selectCurrentPodhodSaga = function * () {
    try {
        const stantion = yield select(selectedStantionSelector)
        if (stantion) {
            yield put({
                type: FETCH_PODHOD_REQUEST,
                payload: {stantion: stantion, msg: `Обновление данных` }
            })

        }
    } catch (_) {

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
        fetchPodhodSaga(),
        takeEvery(SELECT_CURRENT_STANTION, selectCurrentPodhodSaga),
        takeEvery(FETCH_PODHOD_STANTIONS_REQUEST,fetchStantionsSaga),
        takeEvery(SELECT_ROW_FIND_VAGONS_REQUEST,selectRowSaga)
    ])
}