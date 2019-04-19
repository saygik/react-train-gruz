import React, {Component} from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import FindVagonsHistory from '../findvagonhistory'

class FindPoezdVagonsTable extends Component {
    render() {
        const {data, columns,selectedRow, selectRow, closeExpanded}=this.props
        const expandRow = {
            renderer: () => (
                <div className={'p-0 m-0'}>
                    <FindVagonsHistory vagon={selectedRow} closeExpanded={closeExpanded}/>
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
            <div >
                <BootstrapTable keyField='Id' data={ data } classes={'gruz-bg-1 mt-1'} columns={ columns }  condensed expandRow={ expandRow } rowEvents={ rowEvents }  />
            </div>
        )
    }
}

export default FindPoezdVagonsTable
