import React from 'react'
import SpravkaUi from "../containers/spravka-ui"
import {connect} from "react-redux"
import {moduleName, rusName, selectedStationAndTipSelector, dataSelector, actions} from "../../ducks/spravka31"
import SpravTable from "./sprav31-table"
import tablesColumns from '../../services/tablesColumns'

const columns =tablesColumns(moduleName)

const Spravka = (props) => <SpravkaUi {...props} caption={rusName} columns={columns} SpravkaTable={SpravTable}/>

export default connect(state=>({
    loading: state[moduleName].loading,
    firstLoad: state[moduleName].firstLoad,
    infoMsg: state[moduleName].infoMsg,
    autoUpdateTime: state[moduleName].autoUpdateTime,
    selectedStationAndTip: selectedStationAndTipSelector(state),
    stances: dataSelector(state)
}), actions)(Spravka)
