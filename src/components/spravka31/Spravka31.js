import React, {Component} from 'react'
import {connect} from "react-redux"
// import PageTemplate from '../reporttemplate/PageTemplate'
import {closeFindVagons, fetchAll, moduleName, rusName, selectedStationAndTipSelector, spravkaCellSelect} from '../../ducks/spravka31'
import Sprav31Table from "./Sprav31Table"
import PageHeader from '../headers/PageHeader'
import BigLoader from "../bigloader"
import {Row, Col} from 'react-bootstrap'
import tablesColumns from '../../services/tablesColumns'

const columns =tablesColumns(moduleName)


class Spravka31 extends Component {
    componentDidMount() {
       this.props.fetchAll()
        // this.timer = setInterval(() => this.props.fetchAll(), 10000);
    }
    componentWillUnmount() {
        // this.timer = null;
    }

    render() {
        const { firstLoad, infoMsg, loading,  stances, selectedStationAndTip, spravkaCellSelect, spravSelectedCell, closeFindVagons} = this.props
        return (
            <div>
                {firstLoad ? <BigLoader/>  :
                    <Row  className='m-1'>
                        <Col>
                            <PageHeader loading={loading} infoMsg={infoMsg} caption={rusName}/>
                            <Row >
                                <Col className={'p-0'}>
                                    {!firstLoad ?
                                        <Sprav31Table spravkaCellSelect={spravkaCellSelect}
                                                     closeFindVagons={closeFindVagons}
                                                      spravSelectedCell={spravSelectedCell}
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
    spravSelectedCell: state[moduleName].spravSelectedCell,
    stances: state[moduleName].entities,
    selectedStationAndTip: selectedStationAndTipSelector(state)

}), {fetchAll, spravkaCellSelect, closeFindVagons})(Spravka31)