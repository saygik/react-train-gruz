import React, {Component} from 'react'
import {connect} from "react-redux"
import {moduleName, rusName, numPodhodsSelector,  stantionsOptionsSelector, stantionsPodhodFiltredSelector, actions, selectedVagonSelector} from "../../../ducks/vagonpodhod"
import VagonPodhodUI from './vagon-podhod-ui'
import tablesColumns from '../../../services/tablesColumns'

const columns =tablesColumns(moduleName)

class VagonPodhod extends Component {
    componentDidMount() {
        this.props.fetchStantions()
    }
    render() {
        return (
            <div>
                 <VagonPodhodUI {...this.props} columns={columns} firstLoad={false} caption={rusName} />
            </div>
        )
    }}

export default connect(state=>({
    loading: state[moduleName].loading,
    infoMsg: state[moduleName].infoMsg,
    selectedPodhod: state[moduleName].selectedPodhod,
    numPodhods: numPodhodsSelector(state),
    stantionsOptions: stantionsOptionsSelector(state),
    selectedStantion: state[moduleName].selectedStantion,
    stantionsPodhod: stantionsPodhodFiltredSelector(state),
    selectedVagon: selectedVagonSelector(state),
}), actions)(VagonPodhod)

