import React, {Component} from 'react'
import {connect} from "react-redux"
import {closeFindVagons,
        fetchAll,
        moduleName,
        rusName,
        selectedStationAndTipSelector,
        selectSprav1Cell } from '../../ducks/spravka1'
import Sprav1Table from "./Sprav1Table"
import PageHeader from '../headers/PageHeader'
import {Row, Col} from 'react-bootstrap'
import BigLoader from "../bigloader"

class Spravka1 extends Component {
    componentDidMount() {
        this.props.fetchAll()
        // this.timer = setInterval(() => this.props.fetchAll(), 10000);
    }
    componentWillUnmount() {
        // this.timer = null;
    }

    render() {
        const { firstLoad, infoMsg, loading, stances, selectedStationAndTip, closeFindVagons, selectSprav1Cell} = this.props
        const moduleBody =  firstLoad ? <BigLoader/>  :
            <Row  className='m-1'>
                <Col>
                    <PageHeader loading={loading} infoMsg={infoMsg} caption={rusName}/>
                    <Row className='pt-1'>
                        <Col  className='p-0'>
                            {!firstLoad ? <Sprav1Table selectSprav1Cell={selectSprav1Cell} closeFindVagons={closeFindVagons} selectedStationAndTip={selectedStationAndTip} stances={stances}/> : null}
                        </Col>
                    </Row>
                </Col>
            </Row>

        return (
            <div>
            { moduleBody }
            </div>
        )
    }
}

export default connect(state=>({
    loading: state[moduleName].loading,
    firstLoad: state[moduleName].firstLoad,
    infoMsg: state[moduleName].infoMsg,
    selectedStationAndTip: selectedStationAndTipSelector(state),
    stances: state[moduleName].entities

}), {fetchAll, selectSprav1Cell, closeFindVagons})(Spravka1)
