import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import {connect} from 'react-redux'
import {moduleName, findVagonInHistory, vagonRecordsSelector, findCriteriaSelectorUI} from '../../ducks/findvagonhistory'
import LittleLoader from "../littleloader"
import VagonHistoryHeader from "../headers/VagonHistoryHeader"
import FindVagonHistoryTable from './FindVagonHistoryTable'
import {Row, Col} from 'react-bootstrap';

class FindVagonHistory extends Component {

    // componentDidUpdate(prevProps) {
    //     if (this.props.findCriteria !== prevProps.findCriteria) {
    //         console.log('-componentDidUpdate-',this.props.findCriteria)
    //         this.props.findVagonsByCriteria(this.props.findCriteria)
    //     }
    // }
    componentDidMount() {

        console.log('-componentDidMount-',this.props.vagon)
        this.props.findVagonInHistory(this.props.vagon)

    }
    // componentWillUnmount() {
    //     this.props.findVagonsByCriteria(null)
    // }

    render() {
        const {  loading ,vagonRecords, criteria} = this.props;

        const littleLoader= loading ? <LittleLoader/> : null;

        console.log('-vagonHistory-',vagonRecords)
        return (
               <Row  className="p-1 m-1 gruz-bg-4">
                   <Col>
                    <Row >
                        <Col className="text-right">
                            <button type="button" className="close" aria-label="Close" onClick={this.handleCloseFindVagons}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <VagonHistoryHeader criteria={criteria} />
                            <FindVagonHistoryTable historyRecords={vagonRecords} />
                        </Col>
                    </Row>
                   </Col>
               </Row>
        );
    }
    handleCloseFindVagons=()=>{

        this.props.closeExpanded()
    }
}


export default connect(state=>({
    criteria: findCriteriaSelectorUI(state),
    vagonRecords: vagonRecordsSelector(state),
    loading: state[moduleName].loading,
}), {findVagonInHistory,  })(FindVagonHistory)

