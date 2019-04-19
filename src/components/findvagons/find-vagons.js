import React, { Component } from 'react';
import {connect} from 'react-redux'
import {moduleName, actions ,filtredNumeredVagonsSelector, findCriteriaSelectorUI, sumVesFindVagonsSelector, filtredStationPOSelector, selectedVagonSelector} from '../../ducks/findvagons'
import FindVagonsUI from './find-vagons-ui'
import tablesColumns from '../../services/tablesColumns'

const columns =tablesColumns(moduleName)

class FindVagons extends Component {

    componentDidUpdate(prevProps) {
        if (this.props.findCriteria !== prevProps.findCriteria) {
            this.props.findVagonsByCriteria(this.props.findCriteria)
        }
    }
    componentDidMount() {
        this.props.findVagonsByCriteria(this.props.findCriteria)
    }
    componentWillUnmount() {
        this.props.findVagonsByCriteria(null)
    }
    render() {
        return (
                <FindVagonsUI {...this.props} columns={columns} />
        )
    }
}

export default connect(state=>({
    criteria: findCriteriaSelectorUI(state),
    sumVes:sumVesFindVagonsSelector(state),
    stanPOName: filtredStationPOSelector(state),
    selectedVagon: selectedVagonSelector(state),
    loading: state[moduleName].loading,
    vagonsOnStance: filtredNumeredVagonsSelector(state),
}), actions)(FindVagons)

