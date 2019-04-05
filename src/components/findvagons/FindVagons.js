import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import {connect} from 'react-redux'
import {moduleName, findVagonsByCriteria, selectVagon, closeFindVagonsHistory ,filtredNumeredVagonsSelector, findCriteriaSelectorUI, sumVesFindVagonsSelector, filtredStationPOSelector, selectedVagonSelector} from '../../ducks/findvagons'
import LittleLoader from "../littleloader"
import StantionsHeader from "../headers/StantionsHeader"
import FindVagonsHistory from '../findvagonhistory'

import parse from 'html-react-parser'
import  './findvagons.css'
import {Row, Col} from 'react-bootstrap'

class FindVagons extends Component {

    componentDidUpdate(prevProps) {
        if (this.props.findCriteria !== prevProps.findCriteria) {
            console.log('-componentDidUpdate-',this.props.findCriteria)
            this.props.findVagonsByCriteria(this.props.findCriteria)
        }
    }
    componentDidMount() {

        console.log('-componentDidMount-',this.props.findCriteria)
        this.props.findVagonsByCriteria(this.props.findCriteria)
        // this.timer = setInterval(() => this.props.fetchAll(), 10000);
    }
    componentWillUnmount() {
        this.props.findVagonsByCriteria(null)
    }

    render() {
        const {  loading , vagonsOnStance, criteria, sumVes, stanPOName, selectVagon, selectedVagon, closeFindVagonsHistory} = this.props;

        const littleLoader= loading ? <LittleLoader/> : null;

        const columns = [
            {
                dataField: 'Idd',
                text: '#',
                headerAlign: 'center',
                headerClasses: ' grid-find-vagon-header-font  grid-find-vagon-header-sm gruz-bg-header-two',
                classes: 'grid-find-vagon-cell-font-sm grid-find-vagon-cell',
            },
            {
                dataField: 'Kodv',
                text: 'вагон',
                headerAlign: 'center',
                headerClasses: ' grid-find-vagon-header-font  grid-find-vagon-header-sm2 gruz-bg-header-two',
                classes: 'grid-find-vagon-cell-font-sm grid-find-vagon-cell',
            },
            {
                dataField: 'Nametip',
                text: 'тип',
                headerAlign: 'center',
                headerClasses: ' grid-find-vagon-header-font  grid-find-vagon-header-sm gruz-bg-header-two',
                classes: 'grid-find-vagon-cell-font-sm grid-find-vagon-cell',
            },
            {
                dataField: 'Ind',
                text: 'инд',
                headerAlign: 'center',
                headerClasses: ' grid-find-vagon-header-font  grid-find-vagon-header-md gruz-bg-header-two',
                classes: 'grid-find-vagon-cell-font-sm grid-find-vagon-cell',
            },
            {
                dataField: 'Nameoper',
                text: 'опер',
                headerAlign: 'center',
                headerClasses: ' grid-find-vagon-header-font  grid-find-vagon-header-sm gruz-bg-header-two',
                classes: 'grid-find-vagon-cell-font-sm grid-find-vagon-cell',
            },
            {
                dataField: 'Datelast',
                text: 'дата',
                headerAlign: 'center',
                headerClasses: 'grid-find-vagon-header-font  grid-find-vagon-header-sm2 gruz-bg-header-two',
                classes: 'grid-find-vagon-cell-font-sm grid-find-vagon-cell',
            },
            {
                dataField: 'Timelast',
                text: 'время',
                headerAlign: 'center',
                headerClasses: 'grid-find-vagon-header-font  grid-find-vagon-header-sm2 gruz-bg-header-two',
                classes: 'grid-find-vagon-cell-font-sm grid-find-vagon-cell',
            },
            {
                dataField: 'Namekodslast',
                text: 'стан по',
                headerAlign: 'center',
                classes: 'grid-find-vagon-cell-font-sm grid-find-vagon-cell',
                headerClasses: 'grid-find-vagon-header-font grid-find-vagon-header-md gruz-bg-header-two'
            },
            {
                dataField: 'Nameklient',
                text: 'клиент',
                headerAlign: 'center',
                classes: 'grid-find-vagon-cell-font-sm grid-find-vagon-cell-left',
                headerClasses: 'grid-find-vagon-header-font grid-find-vagon-header-lg gruz-bg-header-two'
            },
            {
                dataField: 'Ves',
                text: 'вес',
                headerAlign: 'center',
                classes: 'grid-find-vagon-cell-font-sm grid-find-vagon-cell',
                headerClasses: 'grid-find-vagon-header-font grid-find-vagon-header-sm gruz-bg-header-two'
            },
            {
                dataField: 'Namegruz',
                text: 'Груз',
                headerAlign: 'center',
                classes: 'grid-find-vagon-cell-font-sm grid-find-vagon-cell-left',
                headerClasses: 'grid-find-vagon-header-font grid-find-vagon-header-lg gruz-bg-header-two'

            }];
        const expandRow = {
            renderer: row => (
                <FindVagonsHistory vagon={selectedVagon} closeExpanded={closeFindVagonsHistory}/>
            ),
            onlyOneExpanding: true,
            expandByColumnOnly: true,
             expanded: selectedVagon=== null ? [] : [selectedVagon.id]
        };
        const rowEvents = {
            onClick: (e, row, rowIndex) => {
                console.log(`clicked on row with index: ${rowIndex}`);
                selectVagon({id: row.Id});

            }
        };
        return (
            <div className="find-vagon-container" >

                <div  className="row " >
                    <div className="col text-right">
                        <button type="button" className="close" aria-label="Close" onClick={this.handleCloseFindVagons}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div  className="row find-vagon-header" >
                    <div className="col-11 text-left">

                        <StantionsHeader stanName={criteria.stanName} onStation={criteria.onStation+criteria.onNod} stanPOName={stanPOName} tipVagons={criteria.tipName} numVagons={vagonsOnStance.length} />
                    </div>
                    <div className="col-1 ">
                        {littleLoader}
                    </div>
                </div>

                <div  className="row " >
                    <div className="col col-md-12 text-left">
                        {parse(sumVes===0 ? `Суммарный вес не определен` : `Суммарный вес: <span class="badge badge-pill badge-success">${sumVes}</span> т.`)}
                    </div>
                </div>
                <div  className="bd-table">
                    <div  className="row ">
                        <div >
                            <BootstrapTable keyField='Id' data={ vagonsOnStance } columns={ columns } classes={'gruz-bg-1'}    condensed expandRow={ expandRow } rowEvents={ rowEvents } />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    handleCloseFindVagons=()=>{

        this.props.closeExpanded()
    }
}


export default connect(state=>({
    criteria: findCriteriaSelectorUI(state),
    sumVes:sumVesFindVagonsSelector(state),
    stanPOName: filtredStationPOSelector(state),
    selectedVagon: selectedVagonSelector(state),
    loading: state[moduleName].loading,
    // spravSelectedCell: state[moduleName].spravSelectedCell,
//    vagonsOnStance: state[moduleName].vagons,
    vagonsOnStance: filtredNumeredVagonsSelector(state),
}), {findVagonsByCriteria, selectVagon, closeFindVagonsHistory })(FindVagons)

