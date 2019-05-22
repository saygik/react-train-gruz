import {all, take, call, put, select,takeEvery} from 'redux-saga/effects'
import {appName} from '../config'
import {List,  Record} from 'immutable'
import { createSelector } from 'reselect'
import {
    fetchFindVagonsAll,
    fetchGruzStantions,
    fetchGruzClients,
    fetchGruzGruz,
    fetchGruzAllClients,
    fetchUserByIP,
    updateClient,
    fetchGruzClientsForEdit
} from '../services/api'


/************************************************************************
 * Constants
 * */
export const moduleName = 'findvagonsall'
export const rusName = 'Поиск вагонов'
const prefix = `${appName}/${moduleName}`



export const FETCH_ALL_CLIENTS_REQUEST = `${prefix}/FETCH_ALL_CLIENTS_REQUEST`
export const FETCH_ALL_CLIENTS_SUCCESS = `${prefix}/FETCH_ALL_CLIENTS_SUCCESS`
export const FETCH_ALL_CLIENTS_ERROR = `${prefix}/FETCH_ALL_CLIENTS_ERROR`
export const FETCH_FIND_VAGONS_REQUEST = `${prefix}/FETCH_FIND_VAGONS_REQUEST`
export const FETCH_FIND_VAGONS_SUCCESS = `${prefix}/FETCH_FIND_VAGONS_SUCCESS`
export const FETCH_FIND_VAGONS_ERROR = `${prefix}/FETCH_FIND_VAGONS_ERROR`
export const EMPTY_FIND_VAGONS = `${prefix}/EMPTY_FIND_VAGONS`
//export const CRITERIA_CHANGE_FIND_VAGONS = `${prefix}/CRITERIA_CHANGE_FIND_VAGONS`
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
export const CLEAR_VAGON_FILTER = `${prefix}/CLEAR_VAGON_FILTER`
export const SELECT_CLIENT_KOD = `${prefix}/SELECT_CLIENT_KOD`
export const CHANGE_USER_ACCESS = `${prefix}/CHANGE_USER_ACCESS`
export const CLIENT_UPDATE_REQUEST = `${prefix}/CLIENT_UPDATE_REQUEST`
export const CLIENT_UPDATE_SUCCESS = `${prefix}/CLIENT_UPDATE_SUCCESS`
export const CLIENT_UPDATE_ERROR = `${prefix}/CLIENT_UPDATE_ERROR`
export const SHOW_CLIENT_EDIT_FORM = `${prefix}/SHOW_CLIENT_EDIT_FORM`


/*************************************************************************
 * Reducer
 * findCriteria {
 *               stan: ''
 *               tip: 0
 *               onStation: 1
 *               onNod: 1
 *              }
 * */
export const VagonsFilterRecord = Record({
    selectedPodhod:1,
    selectedStantionToValues:  null,
    selectedClientValues:  null,
    selectedGruzValues:  null,
    selectedVagonKod:  '',
    selectedTipVagons:0,
    selectedClientKod:  '',
})

export const ReducerRecord = Record({
    vagons: [],
    loading: false,
    firstLoad: true,
    allowEdit: false,
    showEditClientForm: false,
    infoMsg: '',
    autoUpdateTime:0,
    selectedVagon: null,
    selectedStantionTo: new List([]),
    selectedClient: new List([]),
    selectedGruz: new List([]),
    vagonsFilter: new VagonsFilterRecord({}),
    findCriteria: null
})



export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action

    switch (type) {
        case SHOW_CLIENT_EDIT_FORM:
            return state
                .set('showEditClientForm', payload)
        case CLIENT_UPDATE_ERROR:
            return state
                .set('infoMsg', payload.msg)
        case CLIENT_UPDATE_SUCCESS:
            const index = state.get('selectedClient').findIndex(item => item.value === payload.data.kods)
            return state
                .setIn(['selectedClient',index,'label'],payload.data.name)
                .setIn(['selectedClient',index,'adress'],payload.data.adress)
                .set('infoMsg', payload.msg)
        case CLEAR_VAGON_FILTER:
            return state
                .set('vagonsFilter', new VagonsFilterRecord({}))
                .set('selectedVagon', null)
                .set('vagons', [])
                .set('infoMsg', "Данные отсутствуют.")
        case CHANGE_USER_ACCESS:
            return state
                .set('allowEdit', payload)
        case FIRST_LOAD_CHANGE:
            return state
                .set('firstLoad', payload)
        case SELECT_PODHOD:
            return state
                .setIn(['vagonsFilter','selectedPodhod'], payload)
        case SELECT_VAGON_KOD:
            return state
                .setIn(['vagonsFilter','selectedVagonKod'], payload)
        case SELECT_CLIENT_KOD:
            return state
                .setIn(['vagonsFilter','selectedClientKod'], payload)
        case SELECT_TIP_VAGONS:
            return state
                .setIn(['vagonsFilter','selectedTipVagons'], payload)
        case SELECT_STANTION_TO:
            return state
                .set('selectedStantionTo', List(payload))
        case SELECT_STANTION_TO_VALUES:
            return state
                .setIn(['vagonsFilter','selectedStantionToValues'], payload)
        case SELECT_CLIENT_VALUES:
            return state
                .setIn(['vagonsFilter','selectedClientValues'], payload)
        case SELECT_GRUZ_VALUES:
            return state
                .setIn(['vagonsFilter','selectedGruzValues'], payload)
        case FETCH_ALL_CLIENTS_SUCCESS:
            return state
                .set('selectedClient', List(payload.data))
                .set('infoMsg', payload.msg)
        case FETCH_ALL_CLIENTS_ERROR:
            return state
                .set('infoMsg', payload.msg)
                .set('selectedClient', new List([]))
        case SELECT_CLIENT:
            return state
                .set('selectedClient', List(payload))
        case SELECT_GRUZ:
            return state
                .set('selectedGruz', List(payload))
        case SELECT_ROW_FIND_VAGONS_SUCCESS:
            return state
                .set('selectedVagon', payload.vagon)
        case DESELECT_ROW_FIND_VAGONS:
            return state
                .set('selectedVagon', null)
        // case CRITERIA_CHANGE_FIND_VAGONS:
        //     return state
        //         .set('findCriteria', payload.criteria)
        case FETCH_FIND_VAGONS_REQUEST:
            return state
                .set('loading', true)
                .set('infoMsg', "Обновление данных...")
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
export const allowEditSelector = createSelector(stateSelector, state=> state.allowEdit)
export const showEditClientFormSelector = createSelector(stateSelector, state=> state.showEditClientForm)


export const selectedTipVagonsSelector = createSelector(stateSelector, state=> state.getIn(['vagonsFilter','selectedTipVagons']))
export const selectedPodhodSelector = createSelector(stateSelector, state=> state.getIn(['vagonsFilter','selectedPodhod']))
export const selectedVagonKodSelector = createSelector(stateSelector, state=> state.getIn(['vagonsFilter','selectedVagonKod']))
export const selectedClientKodSelector = createSelector(stateSelector, state=> state.getIn(['vagonsFilter','selectedClientKod']))
export const selectedGruzValuesSelector= createSelector(stateSelector, state=> state.getIn(['vagonsFilter','selectedGruzValues']))
export const selectedClientValuesSelector= createSelector(stateSelector, state=> state.getIn(['vagonsFilter','selectedClientValues']))
export const selectedStantionToValuesSelector= createSelector(stateSelector, state=> state.getIn(['vagonsFilter','selectedStantionToValues']))

export const selectedStantionToSelector= createSelector(stateSelector, state=> state.selectedStantionTo.valueSeq().toArray())
export const selectedClientSelector= createSelector(stateSelector, state=> state.selectedClient.valueSeq().toArray())
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

export const selectedFiltredClientsSelector= createSelector(selectedClientSelector,selectedClientKodSelector, (clients, findString)=> {
    if (findString.length<3) return  []
  const findStringtoUpperCase=findString.toUpperCase()
 return   clients.filter(elem => elem.value.includes(findString) || elem.label.includes(findString) || elem.label.includes(findStringtoUpperCase))
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
    fetchAllClients: () => ({type: FETCH_ALL_CLIENTS_REQUEST}),
    selectStantionTo: (payload) => ({type: SELECT_STANTION_TO_VALUES, payload: payload}),
    selectTipVagons: (payload) => ({type: SELECT_TIP_VAGONS, payload: payload}),
    selectPodhod: (payload) => ({type: SELECT_PODHOD, payload: payload}),
    selectClient: (payload) => ({type: SELECT_CLIENT_VALUES, payload: payload}),
    selectGruz: (payload) => ({type: SELECT_GRUZ_VALUES, payload: payload}),
    selectVagonKod: (payload) => ({type: SELECT_VAGON_KOD, payload: payload.target.value}),
    findVagons: () => ({type: FETCH_FIND_VAGONS_REQUEST}),
    clearVagonsFilter: () => ({type: CLEAR_VAGON_FILTER}),
    selectClientKod: (payload) => ({type: SELECT_CLIENT_KOD, payload: payload.target.value}),
    clientUpdate: (payload) => ({type: CLIENT_UPDATE_REQUEST, payload: payload}),
    showClientEditForm: (payload) => ({type: SHOW_CLIENT_EDIT_FORM, payload: payload}),


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
                payload: res.data.map(elem=> ({ value: elem.kodclient, label: `${elem.kodclient} ${elem.nameclient}` }))
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

export const fetchAllClientsSaga = function * () {
    while (true) {
        yield take(FETCH_ALL_CLIENTS_REQUEST)
        yield put({
            type: FIRST_LOAD_CHANGE, payload: true
        })
        yield put({
            type: CHANGE_USER_ACCESS, payload: false
        })
        let isAdmin=false
        let res = yield call(fetchUserByIP)
        if (res.fetchOK) {
            if (res.data.Admin && res.data.Admin==='true') {
                isAdmin=true
                yield put({
                    type: CHANGE_USER_ACCESS, payload: true
                })
            }
        }

        // isAdmin=true
        // yield put({
        //     type: CHANGE_USER_ACCESS, payload: true
        // })




        res = yield call(isAdmin ? fetchGruzClientsForEdit : fetchGruzAllClients)
        if (res.fetchOK) {
            yield put({
                type: FETCH_ALL_CLIENTS_SUCCESS,
                payload: {data: res.data.map(elem=> ({ value: elem.kodclient, label: elem.nameclient, adress: elem.adrclient })), msg: res.msg}

            })
            yield put({
                type: FIRST_LOAD_CHANGE, payload: false
            })

        }else {
            yield put({
                type: FIRST_LOAD_CHANGE, payload: false
            })
            yield put({
                type: FETCH_ALL_CLIENTS_ERROR,
                payload: {msg: res.msg }
            })
        }

    }
}
export const clientUpdateSaga =function * (action) {
    try {
        const kods=action.payload.kods===action.payload.name ? '' : '1348'
        const updatedClient={kodclient: action.payload.kods, nameclient: action.payload.name.replace(/"/g, "'"), adrclient: action.payload.adress.replace(/"/g, "'"), kods: kods}
        if (action.payload.kods) {
            const res = yield call(updateClient,updatedClient)
            if (res.fetchOK) {
                yield put({
                    type: CLIENT_UPDATE_SUCCESS, payload: {data: {kods: action.payload.kods,
                                                                  name: action.payload.name.replace(/"/g, "'"),
                                                                  adress: action.payload.adress.replace(/"/g, "'")},
                                                           msg: res.msg}
                })
                yield put({
                    type: SHOW_CLIENT_EDIT_FORM, payload: false
                })
            } else {
                yield put({
                    type: CLIENT_UPDATE_ERROR, payload: {msg: res.msg}
                })

            }

        }


    } catch (_) {

    }
}

export function* saga() {
    yield all([
        fetchFindVagonsSaga(),
        fetchFiltersDataSaga(),
        fetchAllClientsSaga(),
        takeEvery(CLIENT_UPDATE_REQUEST,clientUpdateSaga),
        takeEvery(SELECT_ROW_FIND_VAGONS_REQUEST,selectRowSaga),

        // takeEvery(FETCH_FIND_ALL_VAGONS_REQUEST,fetchFindAllVagonsSaga),

    ])
}

