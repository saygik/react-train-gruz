import React, { Component } from 'react';
import {connect} from 'react-redux'
import {moduleName, findVagonsByCriteria, selectVagon, closeFindVagonsHistory ,filtredNumeredVagonsSelector, findCriteriaSelectorUI, sumVesFindVagonsSelector, filtredStationPOSelector, selectedVagonSelector} from '../../ducks/findvagons'
import StantionsHeader from "../headers/StantionsHeader"
import FindVagonsTable from './FindVagonsTable'
import parse from 'html-react-parser'
import {Row, Col} from 'react-bootstrap'
import SpravkaHeader from '../headers/SpravkaHeader'
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
        const {  vagonsOnStance, criteria, sumVes, stanPOName, selectVagon, selectedVagon,closeFindVagonsHistory } = this.props;


        return (
                <Row  className="p-1 m-1 gruz-bg-4">
                    <Col>
                        <SpravkaHeader loading={this.props.loading}  closeExpanded={this.props.closeExpanded} />
                        <Row className='pt-1'>
                            <Col  className='p-0'>
                                <StantionsHeader stanName={criteria.stanName} onStation={criteria.onStation+criteria.onNod} stanPOName={stanPOName} tipVagons={criteria.tipName} numVagons={vagonsOnStance.length} />
                                {parse(sumVes===0 ? `Суммарный вес не определен` : `Суммарный вес: <span class="badge badge-pill badge-success">${sumVes}</span> т.`)}
                                <FindVagonsTable vagonsOnStance={vagonsOnStance} selectVagon={selectVagon} selectedVagon={selectedVagon} closeFindVagonsHistory={closeFindVagonsHistory} columns={columns} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
        );
    }

}


export default connect(state=>({
    criteria: findCriteriaSelectorUI(state),
    sumVes:sumVesFindVagonsSelector(state),
    stanPOName: filtredStationPOSelector(state),
    selectedVagon: selectedVagonSelector(state),
    loading: state[moduleName].loading,
    vagonsOnStance: filtredNumeredVagonsSelector(state),
}), {findVagonsByCriteria, selectVagon, closeFindVagonsHistory })(FindVagons)

