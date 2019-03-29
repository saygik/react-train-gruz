import React, {Component} from 'react'
import {connect} from "react-redux"
import {moduleName, rusName, fetchStantions} from "../../ducks/wagonapproach"
import WagonApproach from './WagonApproach'
import ReportTemplate from '../reporttemplate'
import BigLoader from "../bigloader"

class MainComponent extends Component {
    componentDidMount() {
        this.props.fetchStantions()
        // this.timer = setInterval(() => this.props.fetchAll(), 10000);
    }
    render() {
        const { firstLoad, infoMsg, loading} = this.props
        const sprav1Table= !firstLoad ? <WagonApproach/> : null;

        return (
            <div >
                {
                    firstLoad
                        ? <BigLoader/>
                        : <ReportTemplate textHeader={rusName} infoMsg={infoMsg} loading={loading} >
                            {sprav1Table}
                        </ReportTemplate>
                }
            </div>
        );
    }
}

export default connect(state=>({
    loading: state[moduleName].loading,
    firstLoad: state[moduleName].firstLoad,
    infoMsg: state[moduleName].infoMsg,

}), {fetchStantions})(MainComponent)