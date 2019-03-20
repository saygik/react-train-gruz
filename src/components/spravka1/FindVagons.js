import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import {connect} from 'react-redux'
import {moduleName, selectSprav1ExpandedCol,selectSprav1ExpandedRow} from '../../ducks/spravka1'
import LittleLoader from "../littleloader"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import  './spravka1.css'

class FindVagons extends Component {


    handleExpand(row) {
        const { expandedCol, expanded, selectSprav1ExpandedCol, selectSprav1ExpandedRow } = this.props;

        if (!expanded.includes(row.id)) {
            selectSprav1ExpandedCol(row.col);
            selectSprav1ExpandedRow([row.id]);
        } else {
            if (expandedCol===row.col) {
                selectSprav1ExpandedRow([]);
            } else {
                selectSprav1ExpandedCol(row.col);
            }

        }
    }


    render() {
        const {  loading } = this.props;

        const littleLoader= loading ? <LittleLoader/> : null;
        const columns = [
            {
                dataField: 'ID',
                text: 'id',
                hidden: true
            },
            {
                dataField: 'TIPZAP',
                text: '#',
                hidden: true
            },
            {
                dataField: 'NAME',
                text: 'Станция',
                classes: 'grid-cell-pad grid-name-col',
                headerStyle: (colum, colIndex) => {
                    return { width: '180px', textAlign: 'center' };
                }
            }, {
                dataField: 'KODS',
                text: 'КОД',
                headerAlign: 'center',
                headerClasses: 'grid-header-font',
                classes: 'grid-cell-pad grid-font',

            },
            {
                dataField: 'COL',
                text: 'ИТОГО',
                align: 'center',
                headerClasses: 'grid-end-col grid-header-font',
                classes: 'grid-cell-pad grid-end-col grid-font',


            }];

        return (
            <div >
                <div  className="bd-table" >
                    <div  className="row ">
                        <div className="lg-auto">
                            <BootstrapTable keyField='ID' data={ vagonsOnStance } columns={ columns } classes={'grid-cell-pad'}   hover condensed   />

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default connect(state=>({
    loading: state[moduleName].loading,
    firstLoad: state[moduleName].firstLoad,
    infoMsg: state[moduleName].infoMsg,
    expanded: state[moduleName].sprav1ExpandedRows,
    expandedCol: state[moduleName].sprav1ExpandedCol,
    vagonsOnStance: state[moduleName].vagons
}), { selectSprav1ExpandedCol, selectSprav1ExpandedRow})(FindVagons)

