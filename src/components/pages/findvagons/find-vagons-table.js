import React, {Component} from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import FindVagonsHistory from '../findvagonhistory/index'

class FindVagonsTable extends Component {
    render() {
        const { data, selectVagon, selectedVagon, closeFindVagonsHistory, columns} = this.props;
        const expandRow = {
            renderer: row => (
                <div className={'p-0 m-0'}>
                <FindVagonsHistory vagon={selectedVagon} closeExpanded={closeFindVagonsHistory}/>
                </div>
            ),
            onlyOneExpanding: true,
            expandByColumnOnly: true,
            expanded: selectedVagon=== null ? [] : [selectedVagon.id]
        };
        const rowEvents = {
            onClick: (e, row ) => {
                selectVagon({id: row.Id});

            }
        };

        return (
            <div style={{display:data.length>0 ? '': 'none' }}>
                <BootstrapTable keyField='Id' data={ data } columns={ columns }  classes={'table-responsive-xl text-nowrap gruz-bg-1 mt-1'}  condensed expandRow={ expandRow } rowEvents={ rowEvents } />
            </div>
        )
    }
}

export default FindVagonsTable
