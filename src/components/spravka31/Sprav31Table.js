import React, { Component } from 'react';
import {Row, Col, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {connect} from 'react-redux'
import BootstrapTable from 'react-bootstrap-table-next';
import {moduleName, spravkaCellSelect, selectedStationAndTipSelector, closeFindVagons} from '../../ducks/spravka31'
import FindVagons from '../findvagons'
import  './spravka31.css'

class Sprav31Table extends Component {

    render() {
        const { stances, spravkaCellSelect, spravSelectedCell, selectedStationAndTip, closeFindVagons} = this.props;

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
                text: 'СТАНЦИЯ' ,
                classes: 'sprav31-grid-cell-pad sprav31-grid-name-col ',
                style: () => {
                    return { width: '160px', textAlign: 'center' };
                },
                headerClasses: 'sprav31-grid-header-font sprav31-grid-begin',
                headerStyle: () => {
                    return { width: '160px', textAlign: 'center' };
                }
            }, {
                dataField: 'KODS',
                text: 'КОД',
                headerAlign: 'center',
                headerClasses: 'sprav31-grid-header-font sprav31-grid-begin',
                style: () => {
                    return { width: '50px', textAlign: 'center' };
                },
                headerStyle: () => {
                    return { width: '50px', textAlign: 'center' };
                },
                classes: 'sprav31-grid-cell-pad grid-font ',

            },
            simplyColumn('S1387','СТОЛБЦЫ'),
            simplyColumn('S1386','ГОРОДЕЯ'),
            simplyColumn('S1391','ТИМКОВИЧИ'),
            simplyColumn('S1390','КЛЕЦК'),
            simplyColumn('S1389','БАРАНОВ-ПОЛЕССКИЕ'),
            simplyColumn('S1385','БАРАНОВИЧИ'),
            simplyColumn('S1399','ЛЯХОВИЧИ'),
            simplyColumn('S1398','РЕЙТАНОВ'),
            simplyColumn('S1396','ГАНЦЕВИЧИ'),
            simplyColumn('S1395','ЛЮЩА'),
            simplyColumn('S1393','ВИДИБОР'),
            simplyColumn('S1392','ГОРЫНЬ'),
            simplyColumn('S1394','ЛУНИНЕЦ'),
            simplyColumn('S1520','СИТНИЦА'),
            simplyColumn('S1521','МИКАШЕВИЧИ'),
            simplyColumn('S1369','ОЗЕРНИЦА'),
            simplyColumn('S1371','ПОЛОНКА'),
            simplyColumn('S1370','СЛОНИМ'),
            simplyColumn('S1368','ЗЕЛЬВА'),
            simplyColumn('S1367','ВОЛКОВЫСК ЦЕНТ.'),
            simplyColumn('S1362','БЕРЕСТОВИЦА'),
            simplyColumn('S1356','СВИСЛОЧЬ'),
            simplyColumn('S1373','РОСЬ'),
            simplyColumn('S1372','МОСТЫ'),
            simplyColumn('S1354','СКИДЕЛЬ'),
            simplyColumn('S1345','ГРИЦЕВЕЦ'),
            simplyColumn('S1353','АУЛЬС'),
            simplyColumn('S1352','ГРОДНО'),
            simplyColumn('S1347','ЛОСОСНО'),
            simplyColumn('S1351','БРУЗГИ'),
            simplyColumn('S1375','СКРИБОВЦЫ'),
            simplyColumn('S1374','РОЖАНКА'),
            simplyColumn('S1380','ГУТНО'),
            simplyColumn('S1623','ГАВЬЯ'),
            simplyColumn('S1624','ЮРАТИШКИ'),
            simplyColumn('S1377','ГУДЫ'),
            simplyColumn('S1378','БАСТУНЫ'),
            simplyColumn('S1376','ЛИДА'),
            simplyColumn('S1382','НОВОЕЛЬНЯ'),
            simplyColumn('S1384','МОРДИЧИ'),
            simplyColumn('S1348','КУЗНИЦА'),
            simplyColumn('S1357','СЕМЯНУВКА(1520)'),
            simplyColumn('S1358','СЕМЯНУВКА(1435)'),
            simplyColumn('S1363','ПЕРЕГРУЗКА'),
            ];
        const rowStyle2 = (row, rowIndex) => {
            const style = {};
            if (row.KODS === 's001' || row.KODS === 's002' || row.KODS === 's000') {
                style.backgroundColor = '#dce6b0';
                style.fontSize = '0.9rem';
            } else
            {
                style.fontSize = '0.9rem';
            }

            return style;
        };

        function countFormatter(cell, row, rowIndex, formatExtraData) {
            if (cell===0) {
                return (
                    ''
                );
            }
            return (
                <OverlayTrigger
                    key={`tooltip-${row.ID}-${formatExtraData.column}`}
                    placement={'top'}
                    overlay={
                        <Tooltip id={`tooltip-${row.ID}-${formatExtraData.column}` } className={'tooltip-top'}>
                            На станции <strong>{formatExtraData.stancName}</strong> до станции <strong>{row.NAME}</strong>
                        </Tooltip>
                    }
                >
                    <div style={{ cursor: "pointer"}}>{ cell }</div>
                </OverlayTrigger>

        );
        }
        function stancFormatter(column) {
            return (
                <span className="verticalText">
                    { column.text }
                </span>
            );
        }
        function simplyColumn(name, text) {
            // const headerCaption=`<span class="verticalText">${text}</span>`
            // console.log('---',parse(headerCaption))
            return ({
                dataField: name,
                text: text,
                headerAlign: 'center',
                align: 'center',
                formatter: countFormatter,
                formatExtraData: {column: name, stancName:text},
                headerFormatter: stancFormatter,
                headerClasses:'sprav31-grid-header-font sprav31-grid-end-group1',
                classes: (cell) => {
                    if (cell  === 0) return '';
                    return 'sprav31-grid-cell ';
                },
                events: {
                    onClick: (e, column, columnIndex, row) => {
                        spravkaCellSelect({id: row.ID, stan: row.KODS, col: column.dataField , cell: row[column.dataField], name: row.NAME});

                    },
                }
            });
        }

        const expandRow = {
            renderer: row => (
                <FindVagons findCriteria={ selectedStationAndTip} closeExpanded={closeFindVagons}/>
            ),
            onlyOneExpanding: true,
            expandByColumnOnly: true,
            expanded: spravSelectedCell=== null ? [] : [spravSelectedCell.id]
        };
        return (
            <Row className="p-0 sprav31-header d-inline">
                <Col >
                        <Row>
                            <Col >
                                <BootstrapTable id={'mapping_table'} keyField='ID' data={ stances } columns={ columns } classes={'sprav1-grid-cell-pad'}  striped condensed  rowStyle={ rowStyle2 }  expandRow={ expandRow } />
                            </Col>
                        </Row>
                </Col>
            </Row>
        );
    }
}


export default connect(state=>({
    spravSelectedCell: state[moduleName].spravSelectedCell,
    stances: state[moduleName].entities,
    selectedStationAndTip: selectedStationAndTipSelector(state)
}), {spravkaCellSelect, closeFindVagons })(Sprav31Table)

