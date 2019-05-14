import React from 'react'
import {connect} from "react-redux"
import ClientsUI from './clients-ui'
import {
    moduleName,  actions,
    selectedClientSelector,
    selectedClientKodSelector,
    selectedFiltredClientsSelector,
} from '../../../ducks/findvagonsall'

const Clients=(props) =>  <ClientsUI {...props} caption={'Поиск клиентов'} />

export default connect(state=>({
    loading: state[moduleName].loading,
    infoMsg: state[moduleName].infoMsg,
    firstLoad: state[moduleName].firstLoad,
    selectedClients: selectedFiltredClientsSelector(state),
    selectedClientKod: selectedClientKodSelector(state),

}), actions)(Clients)