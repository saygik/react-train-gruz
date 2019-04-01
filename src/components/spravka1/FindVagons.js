import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import {connect} from 'react-redux'
import {moduleName, selectedStationAndTipSelector, sumVesFindVagonsSelector,closeFindVagons} from '../../ducks/spravka1'
import LittleLoader from "../littleloader"
import StantionsHeader from "../headers/StantionsHeader"


import parse from 'html-react-parser'
import  './spravka1.css'

class FindVagons extends Component {




    render() {
        const {  loading , vagonsOnStance, selectedStation, sumVes, closeFindVagons} = this.props;

        const littleLoader= loading ? <LittleLoader/> : null;

        const columns = [
            {
                dataField: 'Id',
                text: '#',
                headerAlign: 'center',
                headerClasses: ' grid-find-vagon-header-font  grid-find-vagon-header-sm',
                classes: 'grid-find-vagon-cell-font-sm grid-find-vagon-cell',
            },
            {
                dataField: 'Kodv',
                text: 'вагон',
                headerAlign: 'center',
                headerClasses: ' grid-find-vagon-header-font  grid-find-vagon-header-sm2',
                classes: 'grid-find-vagon-cell-font-sm grid-find-vagon-cell',
            },
            {
                dataField: 'Ind',
                text: 'инд',
                headerAlign: 'center',
                headerClasses: ' grid-find-vagon-header-font  grid-find-vagon-header-md',
                classes: 'grid-find-vagon-cell-font-sm grid-find-vagon-cell',
            },
            {
                dataField: 'Nameoper',
                text: 'опер',
                headerAlign: 'center',
                headerClasses: ' grid-find-vagon-header-font  grid-find-vagon-header-sm',
                classes: 'grid-find-vagon-cell-font-sm grid-find-vagon-cell',
            },
            {
                dataField: 'Datelast',
                text: 'дата',
                headerAlign: 'center',
                headerClasses: 'grid-find-vagon-header-font  grid-find-vagon-header-sm2',
                classes: 'grid-find-vagon-cell-font-sm grid-find-vagon-cell',
            },
            {
                dataField: 'Timelast',
                text: 'время',
                headerAlign: 'center',
                headerClasses: 'grid-find-vagon-header-font  grid-find-vagon-header-sm2',
                classes: 'grid-find-vagon-cell-font-sm grid-find-vagon-cell',
            },
            {
                dataField: 'Namekodslast',
                text: 'стан по',
                headerAlign: 'center',
                classes: 'grid-find-vagon-cell-font-sm grid-find-vagon-cell',
                headerClasses: 'grid-find-vagon-header-font grid-find-vagon-header-md'
            },
            {
                dataField: 'Nameklient',
                text: 'клиент',
                headerAlign: 'center',
                classes: 'grid-find-vagon-cell-font-sm grid-find-vagon-cell-left',
                headerClasses: 'grid-find-vagon-header-font grid-find-vagon-header-lg'
            },
            {
                dataField: 'Ves',
                text: 'вес',
                headerAlign: 'center',
                classes: 'grid-find-vagon-cell-font-sm grid-find-vagon-cell',
                headerClasses: 'grid-find-vagon-header-font grid-find-vagon-header-sm'
            },
            {
                dataField: 'Namegruz',
                text: 'Груз',
                headerAlign: 'center',
                classes: 'grid-find-vagon-cell-font-sm grid-find-vagon-cell-left',
                headerClasses: 'grid-find-vagon-header-font grid-find-vagon-header-lg'

            }];

        return (
                <div className="find-vagon-container" >
                    <div  className="row " >
                        <div className="col text-right">
                            <button type="button" className="close" aria-label="Close" onClick={closeFindVagons}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>

                    <div  className="row find-vagon-header" >
                        <div className="col-11 text-left">
                            <StantionsHeader stanName={selectedStation.stanName} onStation={selectedStation.onStation+selectedStation.onNod} tipVagons={selectedStation.tipName} numVagons={vagonsOnStance.length} />
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
                        <div className="lg-auto">
                            <BootstrapTable keyField='Id' data={ vagonsOnStance } columns={ columns } classes={'grid-find-vagon'}   hover condensed   />

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default connect(state=>({
    selectedStation:selectedStationAndTipSelector(state),
    sumVes:sumVesFindVagonsSelector(state),
    loading: state[moduleName].loadingVagons,
    sprav1SelectedCell: state[moduleName].sprav1SelectedCell,
    vagonsOnStance: state[moduleName].vagons
}), {closeFindVagons })(FindVagons)

