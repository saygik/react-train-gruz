import React, { Component } from 'react';
import {connect} from 'react-redux'
import {moduleName, findVagonInHistory, vagonRecordsSelector, findVagonCaptionSelector} from '../../ducks/findvagonhistory'
import {SpravkaHeader, SpravkaHeaderCaption} from '../headers'

import FindVagonHistoryTable from './find-vagon-history-table'
import {Row, Col} from 'react-bootstrap'
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
        const {  vagonRecords,  caption} = this.props;

        return (
               <Row  className="p-1 m-1 gruz-bg-4">
                   <Col>
                       <SpravkaHeader loading={this.props.loading}  closeExpanded={this.props.closeExpanded} />
                    <Row className='pt-1'>
                        <Col  className='p-0'>
                            <SpravkaHeaderCaption caption={caption}/>
                            <FindVagonHistoryTable historyRecords={vagonRecords} columns={columns} />
                        </Col>
                    </Row>
                   </Col>
               </Row>
        );
    }
}


export default connect(state=>({
    vagonRecords: vagonRecordsSelector(state),
    caption: findVagonCaptionSelector(state),
    loading: state[moduleName].loading,
}), {findVagonInHistory,  })(FindVagonHistory)

