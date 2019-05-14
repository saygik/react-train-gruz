import React from 'react'
import NaturkiUi from "./naturki-ui"
import {connect} from "react-redux"
import {moduleName, rusName, selectors, actions} from "../../../ducks/naturki"

import tablesColumns from '../../../services/tablesColumns'

const columns =tablesColumns(moduleName)


const Naturki = (props) => <NaturkiUi {...props} caption={rusName} columns={columns}/>

export default connect(state=>({
    loading: state[moduleName].loading,
    infoMsg: state[moduleName].infoMsg,
    firstLoad: state[moduleName].firstLoad,
    data: selectors.filtredNumeredEntitiesSelector(state),
    bAllNaturki: selectors.bAllNaturkiSelector(state),
    bNod: selectors.bNodSelector(state),
    autoUpdateTime: selectors.autoUpdateTimeSelector(state),
    optionsStantionFrom: selectors.selectedStantionFromSelector(state),
    optionsStantionTo: selectors.selectedStantionToSelector(state),
    selectedStantionFromValue: selectors.selectedStantionFromValueSelector(state),
    selectedStantionToValue: selectors.selectedStantionToValueSelector(state),
    selectedRow: selectors.selectedRowSelector(state),
}), actions)(Naturki)

