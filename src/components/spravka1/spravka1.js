import React, { Component } from 'react';
import {connect} from 'react-redux'
import {moduleName,fetchAll} from '../../ducks/spravka1'
import BigLoader from "../bigloader"
import Sprav1Table from "./Sprav1Table"

class Spravka1 extends Component {
    componentDidMount() {
      this.props.fetchAll()
//        this.timer = setInterval(() => this.props.fetchAll(), 10000);
    }
    componentWillUnmount() {
//        this.timer = null;
    }
    render() {
        const {firstLoad} = this.props;
        const bigLoader= firstLoad ? <BigLoader/> : null;
        const sprav1Table= !firstLoad ? <Sprav1Table/> : null;

        return (
            <div >
                {bigLoader}
                {sprav1Table}
            </div>
        );
    }
}

export default connect(state=>({
    firstLoad: state[moduleName].firstLoad,
}), {fetchAll})(Spravka1)
