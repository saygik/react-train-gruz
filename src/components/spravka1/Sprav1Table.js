import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import {connect} from 'react-redux'
import {moduleName, selectSprav1Cell} from '../../ducks/spravka1'
import LittleLoader from "../littleloader"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import FindVagons from './FindVagons'
import  './spravka1.css'

class Sprav1Table extends Component {

    render() {
        const {  stances, infoMsg, loading, selectSprav1Cell, sprav1SelectedCell} = this.props;

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
            simplyColumn('COLS','ВСЕГО','grid-end-group1',true),
            simplyColumn('COLS1','КЛ','grid-end-group1',false),
            simplyColumn('COLS2','ПЛ','grid-end-group1',false),
            simplyColumn('COLS3','ПВ','grid-end-group1',false),
            simplyColumn('COLS4','ЦС','grid-end-group1',false),
            simplyColumn('COLS5','РЕФ','grid-end-group1',false),
            simplyColumn('COLS6','ПР','grid-end-group1',false),
            simplyColumn('COLP','ВСЕГО','grid-end-group2',true),
            simplyColumn('COLP1','КЛ','grid-end-group2',false),
            simplyColumn('COLP2','ПЛ','grid-end-group2',false),
            simplyColumn('COLP3','ПВ','grid-end-group2',false),
            simplyColumn('COLP4','ЦС','grid-end-group2',false),
            simplyColumn('COLP5','РЕФ','grid-end-group2',false),
            simplyColumn('COLP6','ПР','grid-end-group2',false),
            simplyColumn('COLD','ВСЕГО','grid-end-group3',true),
            simplyColumn('COLD1','КЛ','grid-end-group3',false),
            simplyColumn('COLD2','ПЛ','grid-end-group3',false),
            simplyColumn('COLD3','ПВ','grid-end-group3',false),
            simplyColumn('COLD4','ЦС','grid-end-group3',false),
            simplyColumn('COLD5','РЕФ','grid-end-group3',false),
            simplyColumn('COLD6','ПР','grid-end-group3',false),
            {
                dataField: 'COL',
                text: 'ИТОГО',
                align: 'center',
                headerClasses: 'grid-end-col grid-header-font',
                classes: 'grid-cell-pad grid-end-col grid-font',


            }];
        const expandRow = {
            renderer: row => (
                    <FindVagons/>
            ),
            onlyOneExpanding: true,
            expandByColumnOnly: true,
            expanded: sprav1SelectedCell=== null ? [] : [sprav1SelectedCell.id]
        };
        function countFormatter(cell, row) {
            if (cell===0) {
                return (
                    ''
                );
            }
            return (<div style={{ cursor: "pointer"}}>{ cell }</div>);
        }
        function simplyColumn(name, text, headerClass, isGroupSum) {
            return ({
                dataField: name,
                text: text,
                headerAlign: 'center',
                align: 'center',
                formatter: countFormatter,
                headerClasses:'grid-header-font ' + headerClass,
                classes: (cell, row, rowIndex, colIndex) => {
                    if (cell  === 0) return isGroupSum ? headerClass : 'grid-empty-col grid-cell-pad';
                    return 'grid-cell grid-font ' +( isGroupSum ? headerClass : '');
                },
                events: {
                    onClick: (e, column, columnIndex, row, rowIndex) => {
                        selectSprav1Cell({id: row.ID, stan: row.KODS, col: column.dataField , cell: row[column.dataField], name: row.NAME});


                    },
                }

            });
        }
        return (
            <div >
                <div  className="bd-table" >
                    <div  className="row">
                        <div className="col col-md-11 text-right">
                            <p>{infoMsg}</p>
                        </div>
                        <div className="col col-md-1 ">
                            {littleLoader}
                        </div>
                    </div>
                    <div  className="row ">
                        <div className="col-md-3">
                        </div>
                        <div className="col-md-3 grid-top-header">
                            на станциях назначения
                        </div>
                        <div className="col-md-3 grid-top-header">
                            на подходах к станции
                        </div>
                        <div className="col-md-3 grid-top-header">
                            на дальнем подходе
                        </div>
                    </div>

                    <div  className="row ">
                        <div className="lg-auto">
                            <BootstrapTable keyField='ID' data={ stances } columns={ columns } classes={'grid-cell-pad'}   condensed expandRow={ expandRow }  />

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
    sprav1SelectedCell: state[moduleName].sprav1SelectedCell,
    stances: state[moduleName].entities
}), { selectSprav1Cell})(Sprav1Table)

