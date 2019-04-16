import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import FindVagons from '../findvagons'
import Sprav1TableLegend from './sprav1-table-legend'


class Sprav1Table extends Component {

    render() {
        const { stances, selectCell, selectedStationAndTip,closeExpanded,columns} = this.props
        const tableColumns = columns.map((elem)=> {
            const el = elem
            el.events= {
                onClick: (e, column, columnIndex, row) => {selectCell({id: row.ID, stan: row.KODS, col: column.dataField , cell: row[column.dataField], name: row.NAME})},
            }
            return el
        })
        const rowStyle2 = (row) =>  (row.KODS === 's001' || row.KODS === 's002') ? {backgroundColor: '#dce6b0'} : {}
        const expandRow = {
            renderer: () => <FindVagons findCriteria={ selectedStationAndTip} closeExpanded={closeExpanded}/>,
            onlyOneExpanding: true,
            expandByColumnOnly: true,
            expanded: selectedStationAndTip=== null ? [] : [selectedStationAndTip.id]
        }
        return (
            <div className={'pt-2'}>
                <Sprav1TableLegend />
                <div className={'pt-2'}>
                    <BootstrapTable keyField='ID'
                                data={ stances }
                                columns={ tableColumns }
                                classes={'table-responsive-xl text-nowrap'}
                                condensed
                                expandRow={ expandRow }
                                rowStyle={ rowStyle2 } />
                    </div>
            </div>
        );
    }
}


export default Sprav1Table

