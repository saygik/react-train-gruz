import React, {Component} from 'react'
import BootstrapTable from 'react-bootstrap-table-next'

class FindVagonHistoryTable extends Component {
    render() {
        const {historyRecords}=this.props
        const columns = [
            {
                dataField: 'Id',
                text: '#',
            },
            {
                dataField: 'Namekodsfrom',
                text: 'откуда',
            },
            {
                dataField: 'Namekods',
                text: 'откуда',
            },
            {
                dataField: 'Ind',
                text: 'индекс',
            },
            {
                dataField: 'Oper',
                text: 'операция',
            },
            {
                dataField: 'Namekodslast',
                text: 'станция',
            },
            {
                dataField: 'Datelast',
                text: 'дата',
            },
            {
                dataField: 'Timelast',
                text: 'время',
            },
            {
                dataField: 'Kodgruz',
                text: 'Груз',
            }];
        const recolumns=columns.map((elem)=>{
            const el=elem
                  el.classes= 'gruz-font-70'
                  el.headerClasses= 'gruz-bg-header-two gruz-font-90 gruz-font-normal'
                  el.headerAlign= 'center'
            return el
        })
        return (
            <div>
                <BootstrapTable keyField='Id' data={ historyRecords } classes={'gruz-bg-1'} columns={ recolumns }   condensed  />
            </div>
        )
    }
}

export default FindVagonHistoryTable
