import {all, take, call, put, select,takeEvery, putResolve} from 'redux-saga/effects'
import {appName} from '../config'
import {List, OrderedMap, Record, Map} from 'immutable'
import { createSelector } from 'reselect'
import { fetchFindVagonsAll, fetchGruzStantions, fetchGruzClients, fetchGruzGruz} from '../services/api'

import stanc from '../services/stanc'



/************************************************************************
 * Constants
 * */
export const moduleName = 'findvagonsall'
export const rusName = 'Поиск вагонов'
const prefix = `${appName}/${moduleName}`


// export const FETCH_FIND_ALL_VAGONS_REQUEST = `${prefix}/FETCH_FIND_ALL_VAGONS_REQUEST`
// export const FETCH_FIND_ALL_VAGONS_SUCCESS = `${prefix}/FETCH_FIND_ALL_VAGONS_SUCCESS`
export const FETCH_FIND_VAGONS_REQUEST = `${prefix}/FETCH_FIND_VAGONS_REQUEST`
export const FETCH_FIND_VAGONS_SUCCESS = `${prefix}/FETCH_FIND_VAGONS_SUCCESS`
export const FETCH_FIND_VAGONS_ERROR = `${prefix}/FETCH_FIND_VAGONS_ERROR`
export const EMPTY_FIND_VAGONS = `${prefix}/EMPTY_FIND_VAGONS`
export const CRITERIA_CHANGE_FIND_VAGONS = `${prefix}/CRITERIA_CHANGE_FIND_VAGONS`
export const SELECT_ROW_FIND_VAGONS_REQUEST = `${prefix}/SELECT_ROW_FIND_VAGONS_REQUEST`
export const SELECT_ROW_FIND_VAGONS_SUCCESS = `${prefix}/SELECT_ROW_FIND_VAGONS_SUCCESS`
export const DESELECT_ROW_FIND_VAGONS = `${prefix}/DESELECT_ROW_FIND_VAGONS`
export const FIRST_LOAD_CHANGE = `${prefix}/FIRST_LOAD_CHANGE`
export const SELECT_STANTION_TO = `${prefix}/SELECT_STANTION_TO`
export const SELECT_STANTION_TO_VALUES = `${prefix}/SELECT_STANTION_TO_VALUES`
export const SELECT_CLIENT = `${prefix}/SELECT_CLIENT`
export const SELECT_CLIENT_VALUES = `${prefix}/SELECT_CLIENT_VALUES`
export const FETCH_FILTERS_DATA_REQUEST = `${prefix}/FETCH_FILTERS_DATA_REQUEST`
export const SELECT_PODHOD = `${prefix}/SELECT_PODHOD`
export const SELECT_TIP_VAGONS = `${prefix}/SELECT_TIP_VAGONS`
export const SELECT_GRUZ = `${prefix}/SELECT_GRUZ`
export const SELECT_GRUZ_VALUES = `${prefix}/SELECT_GRUZ_VALUES`
export const SELECT_VAGON_KOD = `${prefix}/SELECT_VAGON_KOD`

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
    autoUpdateTime:0,
    selectedVagon: null,
    selectedStantionTo: new List([]),
    selectedStantionToValues:  null,
    selectedClient: new List([]),
    selectedGruz: new List([]),
    selectedClientValues:  null,
    selectedGruzValues:  null,
    selectedVagonKod:  '',
    selectedPodhod:1,
    selectedTipVagons:0,
   findCriteria: null
})



export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action

    switch (type) {
        case FIRST_LOAD_CHANGE:
            return state
                .set('firstLoad', payload)
        case SELECT_PODHOD:
            return state
                .set('selectedPodhod', payload)
        case SELECT_VAGON_KOD:
            return state
                .set('selectedVagonKod', payload)
        case SELECT_TIP_VAGONS:
            return state
                .set('selectedTipVagons', payload)
        case SELECT_STANTION_TO:
            return state
                .set('selectedStantionTo', List(payload))
        case SELECT_STANTION_TO_VALUES:
            return state
                .set('selectedStantionToValues', payload)
        case SELECT_CLIENT_VALUES:
            return state
                .set('selectedClientValues', payload)
        case SELECT_GRUZ_VALUES:
            return state
                .set('selectedGruzValues', payload)
        case SELECT_CLIENT:
            return state
                .set('selectedClient', List(payload))
        case SELECT_GRUZ:
            return state
                .set('selectedGruz', List(payload))
        // case FETCH_FIND_ALL_VAGONS_REQUEST:
        //     return state
        //         .set('loading', true)
        //         .set('infoMsg', 'Загрузка данных')
        // case FETCH_FIND_ALL_VAGONS_SUCCESS:
        //     return state
        //         .set('loading', false)
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
                .set('firstLoad', false)
                .set('infoMsg', payload.msg)
                .set('vagons', payload.data)
        case EMPTY_FIND_VAGONS:
            return state
                .set('vagons', [])
        case FETCH_FIND_VAGONS_ERROR:
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
export const stateSelector = state => state[moduleName];
export const vagonsSelector = createSelector(stateSelector, state=> state.vagons)
export const sVagonSelector = createSelector(stateSelector, state=> state.selectedVagon)
export const autoUpdateTimeSelector = createSelector(stateSelector, state=> state.autoUpdateTime)
export const selectedPodhodSelector = createSelector(stateSelector, state=> state.selectedPodhod)
export const selectedTipVagonsSelector = createSelector(stateSelector, state=> state.selectedTipVagons)
export const selectedVagonKodSelector = createSelector(stateSelector, state=> state.selectedVagonKod)

export const selectedStantionToSelector= createSelector(stateSelector, state=> state.selectedStantionTo.valueSeq().toArray())
export const selectedStantionToValuesSelector= createSelector(stateSelector, state=> state.selectedStantionToValues )
export const selectedClientValuesSelector= createSelector(stateSelector, state=> state.selectedClientValues )
export const selectedClientSelector= createSelector(stateSelector, state=> state.selectedClient.valueSeq().toArray())
export const selectedGruzValuesSelector= createSelector(stateSelector, state=> state.selectedGruzValues )
export const selectedGruzSelector= createSelector(stateSelector, state=> state.selectedGruz.valueSeq().toArray())

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


const filtredVagonsSelector = createSelector(vagonsSelector,selectedPodhodSelector,selectedTipVagonsSelector, (vagons,podhod,tipVagons )=> {
    let filtredVagons=[]
    const podh=(!!podhod).toString()
    if (podhod !==2) {
        filtredVagons=vagons.filter(elem=>elem.Nod===podh)
    } else filtredVagons=[...vagons]
    switch (tipVagons) {
        case 1:
            return filtredVagons.filter(elem=>{
                return elem.Ves>0 && elem.Kodgruz.substring(0,2)!=='42'  && elem.Pr!=='9'
            })

        case 2:
            return filtredVagons.filter(elem=>elem.Ves==='0' && elem.Kodgruz.substring(0,2)!=='42' && elem.Pr!=='9')
        case 3:
            return filtredVagons.filter(elem=>elem.Pripis==='1')
        default:
            return filtredVagons
    }
})

export const filtredNumeredVagonsSelector = createSelector(filtredVagonsSelector, (vagons )=> {
    if (vagons !== []) {
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
    selectVagon: (row)=> ({type: SELECT_ROW_FIND_VAGONS_REQUEST, payload: {row}}),
    closeFindVagonsHistory: () => ({type: DESELECT_ROW_FIND_VAGONS}),
    fetchAll: () => ({type: FETCH_FILTERS_DATA_REQUEST}),
    selectStantionTo: (payload) => ({type: SELECT_STANTION_TO_VALUES, payload: payload}),
    selectTipVagons: (payload) => ({type: SELECT_TIP_VAGONS, payload: payload}),
    selectPodhod: (payload) => ({type: SELECT_PODHOD, payload: payload}),
    selectClient: (payload) => ({type: SELECT_CLIENT_VALUES, payload: payload}),
    selectGruz: (payload) => ({type: SELECT_GRUZ_VALUES, payload: payload}),
    selectVagonKod: (payload) => ({type: SELECT_VAGON_KOD, payload: payload.target.value}),
    clearVagonKod: (payload) => ({type: SELECT_VAGON_KOD, payload: ''}),
    findVagons: () => ({type: FETCH_FIND_VAGONS_REQUEST}),

}

/***********************************************************************
 * Sagas
 * */

export const fetchFindVagonsSaga = function * () {
    while (true) {
        yield take(FETCH_FIND_VAGONS_REQUEST)
        let stantion = yield select(selectedStantionToValuesSelector)
        let client = yield select(selectedClientValuesSelector)
        let gruz = yield select(selectedGruzValuesSelector)
        let vagon = yield select(selectedVagonKodSelector)

        stantion=stantion ? stantion.value : 0
        client=client ? client.value : 0
        vagon=vagon.length>0 ? vagon : 0
        gruz=gruz ? gruz.value.substring(0,2) : 0
        const criteria= {
            stan: stantion ,
            client:client,
            gruz:gruz,
            vagon:vagon
        }
         console.log('-criteria-',criteria)
        if (criteria === null) {
            yield put({
                type: EMPTY_FIND_VAGONS
            })
        }else {
            yield put({
                type: EMPTY_FIND_VAGONS
            })
            const res = yield call(fetchFindVagonsAll, criteria);
            if (res.fetchOK) {
                yield put({
                    type: FETCH_FIND_VAGONS_SUCCESS,
                    payload: {data: res.data, msg: res.msg}
                })

            }else {
                yield put({
                    type: FETCH_FIND_VAGONS_ERROR,
                    payload: {msg:  'Результат не обнаружен'}
                })
            }
        }
    }
}
export const fetchFiltersDataSaga = function * () {
    while (true) {
        yield take(FETCH_FILTERS_DATA_REQUEST)
            let res = yield call(fetchGruzStantions);
            if (res.fetchOK) {
                yield put({
                    type: SELECT_STANTION_TO,
                    payload: res.data.map(elem=> ({ value: elem.Kod, label: `${elem.Kod} ${elem.Name}` }))
                })

                // console.log('---',res.data.map(elem=> ({ value: elem.Kod, label: `${elem.Kod} ${elem.Name}` }))
            }else {
            }

        res = yield call(fetchGruzClients);
        if (res.fetchOK) {
            yield put({
                type: SELECT_CLIENT,
                payload: res.data.map(elem=> ({ value: elem.KodClient, label: `${elem.KodClient} ${elem.NameClient}` }))
            })
        }else {
        }
        res = yield call(fetchGruzGruz);

        if (res.fetchOK) {
            yield put({
                type: SELECT_GRUZ,
                payload: res.data.map(elem=> ({ value: elem.KodGruz, label: `${elem.KodGruz} ${elem.NameGruz}` }))
            })
            yield put({
                type: FIRST_LOAD_CHANGE, payload: false
            })

            // console.log('---',res.data.map(elem=> ({ value: elem.Kod, label: `${elem.Kod} ${elem.Name}` }))
        }else {
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

// export const fetchFindAllVagonsSaga = function * () {
//
//     try {
//         yield put({
//             type: FIRST_LOAD_CHANGE, payload: true
//         })
//         yield put({
//             type: CRITERIA_CHANGE_FIND_VAGONS, payload: {criteria:{stan:'1385',tip:0,onStation:0,onNod:0} }
//         })
//         yield put({
//             type: EMPTY_FIND_VAGONS
//         })
//         yield put({
//             type: DESELECT_ROW_FIND_VAGONS
//         })
//         yield put({
//             type: FETCH_FIND_VAGONS_REQUEST
//         })
//
//
//     } catch (_) {
//
//     }
// }
//
export function* saga() {
    yield all([
        fetchFindVagonsSaga(),
        fetchFiltersDataSaga(),
        takeEvery(SELECT_ROW_FIND_VAGONS_REQUEST,selectRowSaga),
        // takeEvery(FETCH_FIND_ALL_VAGONS_REQUEST,fetchFindAllVagonsSaga),

    ])
}