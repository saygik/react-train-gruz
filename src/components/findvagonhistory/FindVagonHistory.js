import React, { Component } from 'react';
import {connect} from 'react-redux'
import {moduleName, findVagonInHistory, vagonRecordsSelector, findCriteriaSelectorUI} from '../../ducks/findvagonhistory'
import VagonHistoryHeader from "../headers/VagonHistoryHeader"
import SpravkaHeader from '../headers/SpravkaHeader'
import FindVagonHistoryTable from './FindVagonHistoryTable'
import {Row, Col} from 'react-bootstrap';
import tablesColumns from '../../services/tablesColumns'

const columns =tablesColumns(moduleName)

class FindVagonHistory extends Component {

    componentDidMount() {

        this.props.findVagonInHistory(this.props.vagon)
    }
     componentWillUnmount() {
         this.props.findVagonInHistory(null)
     }

    render() {
        const {  vagonRecords, criteria} = this.props;

        return (
               <Row  className="p-1 m-1 gruz-bg-4">
                   <Col>
                       <SpravkaHeader loading={this.props.loading}  closeExpanded={this.props.closeExpanded} />
                    <Row className='pt-1'>
                        <Col  className='p-0'>
                            <VagonHistoryHeader criteria={criteria} />
                            <FindVagonHistoryTable historyRecords={vagonRecords} columns={columns} />
                        </Col>
                    </Row>
                   </Col>
               </Row>
        );
    }
}


export default connect(state=>({
    criteria: findCriteriaSelectorUI(state),
    vagonRecords: vagonRecordsSelector(state),
    loading: state[moduleName].loading,
}), {findVagonInHistory,  })(FindVagonHistory)

