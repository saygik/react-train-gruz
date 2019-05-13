import React from 'react'
import FindVagonsAllUi from "./find-vagons-all-ui"
import {connect} from "react-redux"
import {moduleName, rusName, actions,
    filtredNumeredVagonsSelector,
    selectedVagonSelector,
    selectedVagonKodSelector,
    selectedGruzValuesSelector,
    selectedGruzSelector,
    selectedTipVagonsSelector,
    selectedPodhodSelector,
    autoUpdateTimeSelector,
    selectedStantionToSelector,
    selectedClientSelector,
    selectedClientValuesSelector,
    selectedStantionToValuesSelector} from '../../ducks/findvagonsall'

import tablesColumns from '../../services/tablesColumns'


const columns =tablesColumns(moduleName)


const FindVagonsAll = (props) => <FindVagonsAllUi {...props} caption={rusName} columns={columns}/>

export default connect(state=>({
    loading: state[moduleName].loading,
    infoMsg: state[moduleName].infoMsg,
    firstLoad: state[moduleName].firstLoad,
    data: filtredNumeredVagonsSelector(state),
    autoUpdateTime: autoUpdateTimeSelector(state),
    selectedVagon: selectedVagonSelector(state),
    selectedStantionTo: selectedStantionToSelector(state),
    selectedStantionToValues: selectedStantionToValuesSelector(state),
    selectedClient: selectedClientSelector(state),
    selectedPodhod: selectedPodhodSelector(state),
    selectedClientValues: selectedClientValuesSelector(state),
    selectedGruzValues: selectedGruzValuesSelector(state),
    selectedGruz: selectedGruzSelector(state),
    selectedTipVagons: selectedTipVagonsSelector(state),
    selectedVagonKod: selectedVagonKodSelector(state),

}), actions)(FindVagonsAll)

