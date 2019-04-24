import {all, put, select,takeEvery} from 'redux-saga/effects'
import {appName} from '../config'
import {Record} from 'immutable'
import {createSelector} from "reselect/lib/index"



/************************************************************************
 * Constants
 * */
export const moduleName = 'global'
export const rusName = 'Global'
const prefix = `${appName}/${moduleName}`


export const SET_SCROLL_POS_REQUEST = `${prefix}/SET_SCROLL_POS_REQUEST`
export const SET_SCROLL_POS = `${prefix}/SET_SCROLL_POS`
export const SET_NAVBAR_VISIBILITY = `${prefix}/SET_NAVBAR_VISIBILITY`


/*************************************************************************
 * Reducer
 * */
export const ReducerRecord = Record({
    showNavbar: true,
    scrollPos: 0
})

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action

    switch (type) {
        case SET_SCROLL_POS:
            return state
                .set('scrollPos', payload)
        case SET_NAVBAR_VISIBILITY:
            return state
                .set('showNavbar', payload)
        default:
            return state
    }
}

/*********************************************************************
 * Selectors
 * */
const stateSelector = state => state[moduleName]
const ScrollPosSelector = createSelector(stateSelector, state=> state.scrollPos)
export const showNavbarSelector = createSelector(stateSelector, state=> state.showNavbar)

/**********************************************************************
 * Action Creators
 * */
export const setScrollPos = (payload) => ({type: SET_SCROLL_POS_REQUEST, payload: payload})
/***********************************************************************
 * Sagas
 * */
export const setScrollPosSaga = function * (action) {
    try {
        const newScrollPos=action.payload
        const scrollPos = yield select(ScrollPosSelector)
        yield put({ type: SET_NAVBAR_VISIBILITY, payload: newScrollPos > scrollPos})
        yield put({ type: SET_SCROLL_POS, payload: newScrollPos})
    } catch (_) {

    }
}
export function* saga() {
    yield all([
        takeEvery(SET_SCROLL_POS_REQUEST,setScrollPosSaga)
    ])
}
