import React, { Component } from 'react';
import {Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux'
import BootstrapTable from 'react-bootstrap-table-next';
import {moduleName, selectSprav1Cell} from '../../ducks/spravka1'
import FindVagons from './FindVagons'

class Sprav1Table extends Component {

    render() {
        const { stances, selectSprav1Cell, sprav1SelectedCell} = this.props;


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
                text: 'СТАНЦИЯ',
                classes: 'sprav1-grid-cell-pad sprav1-grid-name-col',
                headerClasses: 'sprav1-grid-header-font sprav1-grid-begin',
                headerStyle: (colum, colIndex) => {
                    return { width: '160px', textAlign: 'center' };
                }
            }, {
                dataField: 'KODS',
                text: 'КОД',
                headerAlign: 'center',
                headerClasses: 'sprav1-grid-header-font sprav1-grid-begin',
                headerStyle: (colum, colIndex) => {
                    return { width: '50px', textAlign: 'center' };
                },
                classes: 'sprav1-grid-cell-pad grid-font',

            },
            simplyColumn('COLS','ВСЕГО','sprav1-grid-end-group1',true),
            simplyColumn('COLS1','КЛ','sprav1-grid-end-group1',false),
            simplyColumn('COLS2','ПЛ','sprav1-grid-end-group1',false),
            simplyColumn('COLS3','ПВ','sprav1-grid-end-group1',false),
            simplyColumn('COLS4','ЦС','sprav1-grid-end-group1',false),
            simplyColumn('COLS5','РЕФ','sprav1-grid-end-group1',false),
            simplyColumn('COLS6','ПР','sprav1-grid-end-group1',false),
            simplyColumn('COLP','ВСЕГО','sprav1-grid-end-group2',true),
            simplyColumn('COLP1','КЛ','sprav1-grid-end-group2',false),
            simplyColumn('COLP2','ПЛ','sprav1-grid-end-group2',false),
            simplyColumn('COLP3','ПВ','sprav1-grid-end-group2',false),
            simplyColumn('COLP4','ЦС','sprav1-grid-end-group2',false),
            simplyColumn('COLP5','РЕФ','sprav1-grid-end-group2',false),
            simplyColumn('COLP6','ПР','sprav1-grid-end-group2',false),
            simplyColumn('COLD','ВСЕГО','sprav1-grid-end-group3',true),
            simplyColumn('COLD1','КЛ','sprav1-grid-end-group3',false),
            simplyColumn('COLD2','ПЛ','sprav1-grid-end-group3',false),
            simplyColumn('COLD3','ПВ','sprav1-grid-end-group3',false),
            simplyColumn('COLD4','ЦС','sprav1-grid-end-group3',false),
            simplyColumn('COLD5','РЕФ','sprav1-grid-end-group3',false),
            simplyColumn('COLD6','ПР','sprav1-grid-end-group3',false),
            {
                dataField: 'COL',
                text: 'ИТОГО',
                align: 'center',
                headerClasses: 'sprav1-grid-end sprav1-grid-header-font',
                classes: 'p-0 sprav1-grid-end',


            }];
        const rowStyle2 = (row, rowIndex) => {
            const style = {};
            if (row.KODS === 's001' || row.KODS === 's002') {
                style.backgroundColor = '#dce6b0';
                style.fontSize = '0.9rem';
            } else
            {
                style.fontSize = '0.9rem';
            }

            return style;
        };

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
                headerClasses:'sprav1-grid-header-font ' + headerClass,
                classes: (cell, row, rowIndex, colIndex) => {
                    if (cell  === 0) return isGroupSum ? headerClass : '';
                    return 'sprav1-grid-cell ' +( isGroupSum ? headerClass : '');
                },
                events: {
                    onClick: (e, column, columnIndex, row, rowIndex) => {
                        selectSprav1Cell({id: row.ID, stan: row.KODS, col: column.dataField , cell: row[column.dataField], name: row.NAME});

                    },
                }

            });
        }
        return (
                <Row className="p-0 sprav1-header d-inline">
                    <Col >
                        <div>
                            <Row>
                                <Col md={3}>
                                </Col>
                                <Col md={3} >
                                    на станциях назначения
                                </Col>
                                <Col md={3} >
                                    на подходах к станции
                                </Col>
                                <Col md={3} >
                                    на дальнем подходе
                                </Col>
                            </Row>
                            <Row>
                                <Col >
                                    <BootstrapTable keyField='ID' data={ stances } columns={ columns } classes={'sprav1-grid-cell-pad'}   condensed expandRow={ expandRow } rowStyle={ rowStyle2 } />
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
        );
    }
}


export default connect(state=>({
    sprav1SelectedCell: state[moduleName].sprav1SelectedCell,
    stances: state[moduleName].entities
}), { selectSprav1Cell})(Sprav1Table)

