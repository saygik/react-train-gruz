import React, {Component} from 'react'
import {connect} from "react-redux"
import ReportTemplate from '../reporttemplate/ReportTemplate'
import {fetchAll, moduleName, rusName } from '../../ducks/spravka1'
import BigLoader from "../bigloader"
import Sprav1Table from "./Sprav1Table"


class MainComponent extends Component {
    componentDidMount() {
        this.props.fetchAll()
        // this.timer = setInterval(() => this.props.fetchAll(), 10000);
    }
    componentWillUnmount() {
        // this.timer = null;
    }

    render() {
        const { firstLoad, infoMsg, loading} = this.props
        const sprav1Table= !firstLoad ? <Sprav1Table/> : null;

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

}), {fetchAll})(MainComponent)