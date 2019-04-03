import React, { Component } from 'react';
import {Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux'
import BootstrapTable from 'react-bootstrap-table-next';
import {moduleName} from '../../ducks/spravka31'
import parse from 'html-react-parser'
import  './spravka31.css'

class Sprav31Table extends Component {

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
                text: 'СТАНЦИЯ' ,
                classes: 'sprav31-grid-cell-pad sprav31-grid-name-col sprav31-grid-end-group1',
                headerClasses: 'sprav31-grid-header-font sprav31-grid-begin',
                headerStyle: (colum, colIndex) => {
                    return { width: '160px', textAlign: 'center' };
                }
            }, {
                dataField: 'KODS',
                text: 'КОД',
                headerAlign: 'center',
                headerClasses: 'sprav31-grid-header-font sprav31-grid-begin',
                headerStyle: (colum, colIndex) => {
                    return { width: '50px', textAlign: 'center' };
                },
                classes: 'sprav31-grid-cell-pad grid-font sprav31-grid-end-group1',

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

        function countFormatter(cell, row) {
            if (cell===0) {
                return (
                    ''
                );
            }
            return (<div style={{ cursor: "pointer"}}>{ cell }</div>);
        }
        function stancFormatter(column) {
            return (
                <span className="verticalText">
                    { column.text }
                </span>
            );
        }
        function simplyColumn(name, text) {
            const headerCaption=`<span class="verticalText">${text}</span>`
            // console.log('---',parse(headerCaption))
            return ({
                dataField: name,
                text: text,
                headerAlign: 'center',
                align: 'center',
                formatter: countFormatter,
                headerFormatter: stancFormatter,
                headerClasses:'sprav31-grid-header-font verticalTextMS ' + 'sprav31-grid-end-group1',
                classes: (cell, row, rowIndex, colIndex) => {
                    if (cell  === 0) return '';
                    return 'sprav31-grid-cell ';
                },

            });
        }
        return (
            <Row className="p-0 sprav31-header d-inline no-gutters">
                <Col >
                    <div>
                        <Row>
                            <Col >
                                <BootstrapTable keyField='ID' data={ stances } columns={ columns } classes={'sprav1-grid-cell-pad'}   condensed  rowStyle={ rowStyle2 } />
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
}), { })(Sprav31Table)

