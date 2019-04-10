import React, {Component} from 'react'
import {connect} from "react-redux"
import {moduleName, rusName, fetchStantions, numPodhodsSelector, selectCurrentPodhod} from "../../ducks/wagonapproach"
import WagonApproachUI from './WagonApproachUI'
import tablesColumns from '../../services/tablesColumns'
import BigLoader from "../bigloader"
import PageHeader from '../headers/PageHeader'
import {Row, Col} from 'react-bootstrap'

const columns =tablesColumns(moduleName)

class WagonApproach extends Component {
    componentDidMount() {
        this.props.fetchStantions()
        // this.timer = setInterval(() => this.props.fetchAll(), 10000);
    }
    render() {
        const { firstLoad, infoMsg, loading, selectCurrentPodhod, selectedPodhod, numPodhods} = this.props
        const moduleBody =  firstLoad ? <BigLoader/>  :
            <div>
                <Row  className='m-0'>
                    <Col>
                        <PageHeader loading={loading} infoMsg={infoMsg} caption={rusName} />
                        <Row className='pt-1'>
                            <Col  className='p-0'>
                                {!firstLoad ? <WagonApproachUI columns={columns} selectCurrentPodhod={selectCurrentPodhod} selectedPodhod={selectedPodhod} numPodhods={numPodhods}/> : null}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
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
    selectedPodhod: state[moduleName].selectedPodhod,
    numPodhods: numPodhodsSelector(state),
}), {fetchStantions, selectCurrentPodhod})(WagonApproach)


