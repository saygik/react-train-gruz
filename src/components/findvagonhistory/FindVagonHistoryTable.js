import React, {Component} from 'react'
import BootstrapTable from 'react-bootstrap-table-next'

class FindVagonHistoryTable extends Component {
    render() {
        const {historyRecords}=this.props
        const columns = [
            {
                dataField: 'Id',
                text: '#',
                headerAlign: 'center',
                classes: 'gruz-font-70',
                headerClasses: 'gruz-bg-header-two gruz-font-90 gruz-font-normal'
            },
            {
                dataField: 'Namekodsfrom',
                text: 'откуда',
                headerAlign: 'center',
                classes: 'gruz-font-70',
                headerClasses: 'gruz-bg-header-two gruz-font-90 gruz-font-normal'
            },
            {
                dataField: 'Namekods',
                text: 'откуда',
                headerAlign: 'center',
                classes: 'gruz-font-70',
                headerClasses: 'gruz-bg-header-two gruz-font-90 gruz-font-normal'
            },
            {
                dataField: 'Kodgruz',
                text: 'Груз',
                headerAlign: 'center',
                classes: 'gruz-font-70',
                headerClasses: 'gruz-bg-header-two gruz-font-90 gruz-font-normal'

            }];
        return (
            <div>
                <BootstrapTable keyField='Id' data={ historyRecords } classes={'gruz-bg-1'} columns={ columns }   condensed  />
            </div>
        )
    }
}

export default FindVagonHistoryTable
