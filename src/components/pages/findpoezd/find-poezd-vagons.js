import React, {Component} from 'react'
import {connect} from "react-redux"
import {moduleName, findPoezdCaptionSelector, actions, entitiesSelector, selectedRowSelector } from "../../../ducks/findpoezdvagons"
import FindPoezdVagonsUI from './find-poezd-vagons-ui'
import tablesColumns from '../../../services/tablesColumns'

const columns =tablesColumns(moduleName)

class FindPoezdVagons extends Component {

    componentDidMount() {
        this.props.findData(this.props.criteria)
    }
    componentWillUnmount() {
        this.props.findData(null)
    }
    render() {
        return (
            <div>
                <FindPoezdVagonsUI {...this.props} columns={columns}  />
            </div>
        )
    }
}

export default connect(state=>({
    caption: findPoezdCaptionSelector(state),
    data: entitiesSelector(state),
    loading: state[moduleName].loading,
    selectedRow: selectedRowSelector(state),
}), actions)(FindPoezdVagons)

