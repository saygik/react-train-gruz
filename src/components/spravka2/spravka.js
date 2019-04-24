import React, {Component} from 'react'
import SpravkaUi from "../containers/spravka-ui"
import {connect} from "react-redux"
import {moduleName, rusName, selectedStationAndTipSelector, actions} from "../../ducks/spravka2"
import SpravTable from "./sprav2-table"
import tablesColumns from '../../services/tablesColumns'

const columns =tablesColumns(moduleName)
class Spravka extends Component {

    render() {
        return (
            <SpravkaUi {...this.props} caption={rusName} columns={columns} SpravkaTable={SpravTable}/>
        )
    }
}
export default connect(state=>({
    loading: state[moduleName].loading,
    firstLoad: state[moduleName].firstLoad,
    infoMsg: state[moduleName].infoMsg,
    autoUpdateTime: state[moduleName].autoUpdateTime,
    selectedStationAndTip: selectedStationAndTipSelector(state),
    stances: state[moduleName].entities
}), actions)(Spravka)
