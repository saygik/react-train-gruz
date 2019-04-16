import React, {Component} from 'react'
import BootstrapTable from 'react-bootstrap-table-next'

class FindVagonHistoryTable extends Component {
    render() {
        const {historyRecords, columns}=this.props
        return (
            <div>
                <BootstrapTable keyField='Id' data={ historyRecords } classes={'gruz-bg-1 mt-1'} columns={ columns }   condensed  />
            </div>
        )
    }
}

export default FindVagonHistoryTable
