import React, {Component} from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import {FindPoezdVagons} from '../findpoezd'

class NaturkiTable extends Component {
    render() {
        const {data, columns, selectedRow, selectRow, closeExpanded}= this.props
        const expandRow = {
            renderer: () => (
                <div className={'p-0 m-0 gruz-bg-4'}>
                    <FindPoezdVagons criteria={selectedRow} closeExpanded={closeExpanded} />
                </div>
            ),
            onlyOneExpanding: true,
            expandByColumnOnly: true,
            expanded: selectedRow=== null ? [] : [selectedRow.id]
        };
        const rowEvents = {
            onClick: (e, row ) => {
                selectRow({id: row.Id});

            }
        }
        return (
            <div>
                <BootstrapTable keyField='Id'
                                data={ data }
                                classes={'table-responsive-xl text-nowrap'}
                                columns={ columns }
                                condensed
                                expandRow={ expandRow }
                                rowEvents={ rowEvents }
                />
            </div>
        )
    }
}


export default NaturkiTable
