import React from 'react'
import AsusUI from "./asus-ui"
import {connect} from "react-redux"
import {moduleName, rusName, selectors, actions} from "../../../ducks/asus"


const Asus = (props) => <AsusUI {...props} caption={rusName}/>

export default connect(state=>({
    loading: state[moduleName].loading,
    infoMsg: state[moduleName].infoMsg,
    firstLoad: state[moduleName].firstLoad,
    parks: selectors.parksSelector(state)
}), actions)(Asus)

