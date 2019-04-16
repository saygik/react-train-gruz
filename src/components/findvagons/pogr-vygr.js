import React, { Component } from 'react';
import {connect} from 'react-redux'
import {moduleName, findVagonsByCriteria, selectVagon, closeFindVagonsHistory ,filtredNumeredVagonsSelector, findCriteriaSelectorUI, selectedVagonSelector} from '../../ducks/pogrvygr'
import FindVagonsTable from './find-vagons-table'
import {Row, Col} from 'react-bootstrap'
import SpravkaHeader from '../headers/spravka-header'
import PogrVygrHeader from '../headers/pogr-vygr-header'
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
        const {  vagonsOnStance, criteria, selectVagon, selectedVagon,closeFindVagonsHistory } = this.props;


        return (
            <Row  className="p-1 m-1 gruz-bg-4">
                <Col>
                    <SpravkaHeader loading={this.props.loading}  closeExpanded={this.props.closeExpanded} />
                    <Row className='pt-1'>
                        <Col  className='p-0'>
                            <PogrVygrHeader caption={criteria.caption} />
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
    selectedVagon: selectedVagonSelector(state),
    loading: state[moduleName].loading,
    vagonsOnStance: filtredNumeredVagonsSelector(state),
}), {findVagonsByCriteria, selectVagon, closeFindVagonsHistory })(FindVagons)

