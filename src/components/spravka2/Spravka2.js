import React, {Component} from 'react'
import {connect} from "react-redux"
import PageTemplate from '../reporttemplate/PageTemplate'
import {fetchAll, moduleName, rusName } from '../../ducks/spravka2'
import Sprav2Table from "./Sprav2Table"


class Spravka2 extends Component {
    componentDidMount() {
        this.props.fetchAll()
        // this.timer = setInterval(() => this.props.fetchAll(), 10000);
    }
    componentWillUnmount() {
        // this.timer = null;
    }

    render() {
        const { firstLoad, infoMsg, loading} = this.props
        const moduleBody= !firstLoad ? <Sprav2Table/> : null;
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

}), {fetchAll})(Spravka2)