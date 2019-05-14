import React, { Component } from 'react';
import {Row, Col} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import {FindVagons} from '../findvagons/index'

class Sprav31Table extends Component {

    render() {
        const { stances, selectCell, selectedStationAndTip,closeExpanded,columns} = this.props

        const tableColumns = columns.map((elem)=> {
            const el = elem
            el.events= {
                onClick: (e, column, columnIndex, row) => {selectCell({id: row.ID, stan: row.KODS, col: column.dataField , cell: row[column.dataField], name: row.NAME})},
            }
            return el
        })
        const rowStyle2 = (row) =>  (row.KODS === 's001' || row.KODS === 's002' || row.KODS === 's000') ? {backgroundColor: '#dce6b0'} : {}
        const expandRow = {
            renderer: () => <FindVagons findCriteria={ selectedStationAndTip} closeExpanded={closeExpanded}/>,
            onlyOneExpanding: true,
            expandByColumnOnly: true,
            expanded: selectedStationAndTip=== null ? [] : [selectedStationAndTip.id]

        };
        return (
            <Row className="p-0 sprav31-header d-inline">
                 <Col >
                      <BootstrapTable id={'mapping_table'}
                                                keyField='ID'
                                                data={ stances }
                                                columns={ tableColumns }
                                                classes={'table-responsive-lg text-nowrap'}
                                                striped
                                                condensed
                                                rowStyle={ rowStyle2 }
                                                expandRow={ expandRow } />
                </Col>
            </Row>
        );
    }
}

export default Sprav31Table

