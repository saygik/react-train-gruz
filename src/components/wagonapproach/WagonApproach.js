import React, {Component} from 'react'
import {connect} from "react-redux"
import {moduleName, rusName, fetchStantions} from "../../ducks/wagonapproach"
import PageTemplate from '../reporttemplate/PageTemplate'
import WagonApproachUI from './WagonApproachUI'
import tablesColumns from '../../services/tablesColumns'

const columns =tablesColumns(moduleName)

class WagonApproach extends Component {
    componentDidMount() {
        this.props.fetchStantions()
        // this.timer = setInterval(() => this.props.fetchAll(), 10000);
    }
    render() {
        const { firstLoad, infoMsg, loading} = this.props
        const moduleBody= !firstLoad ? <WagonApproachUI columns={columns}/> : null;
        return (
            <div >
                <PageTemplate firstLoad={firstLoad} textHeader={rusName} infoMsg={infoMsg} loading={loading} moduleBody={moduleBody} />
            </div>
        );
    }
}

export default connect(state=>({
    loading: state[moduleName].loading,
    firstLoad: state[moduleName].firstLoad,
    infoMsg: state[moduleName].infoMsg,

}), {fetchStantions})(WagonApproach)
