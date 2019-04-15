import React, {Component} from 'react'
import {connect} from "react-redux"
import {fetchAll, moduleName, rusName , closeFindVagons, selectedStationAndTipSelector, selectSprav1Cell} from '../../ducks/spravka2'
import PageHeader from '../headers/PageHeader'
import BigLoader from "../bigloader"
import Sprav2Table from "./Sprav2Table"
import {Row, Col} from 'react-bootstrap'
import tablesColumns from '../../services/tablesColumns'

const columns =tablesColumns(moduleName)

class Spravka2 extends Component {
    componentDidMount() {
        this.props.fetchAll()
        // this.timer = setInterval(() => this.props.fetchAll(), 10000);
    }
    componentWillUnmount() {
        // this.timer = null;
    }

    render() {
        const { firstLoad, infoMsg, loading, stances, selectedStationAndTip, closeFindVagons, selectSprav1Cell} = this.props
        return (
            <div>
                {firstLoad ? <BigLoader/>  :
                    <Row  className='m-1'>
                        <Col>
                            <PageHeader loading={loading} infoMsg={infoMsg} caption={rusName}/>
                            <Row >
                                <Col className={'p-0'}>
                                    {!firstLoad ?
                                        <Sprav2Table selectSprav1Cell={selectSprav1Cell}
                                                     closeFindVagons={closeFindVagons}
                                                     selectedStationAndTip={selectedStationAndTip}
                                                     stances={stances}
                                                     columns={columns}/>
                                        : null
                                    }
                                </Col>
                            </Row>
                        </Col>
                    </Row>}
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

}), {fetchAll, selectSprav1Cell, closeFindVagons})(Spravka2)