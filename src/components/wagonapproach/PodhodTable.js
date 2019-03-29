import React, {Component} from 'react'
import {connect} from "react-redux"
import { stantionsPodhodFiltredSelector} from "../../ducks/wagonapproach"
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import './wagonapproach.css'

class PodhodTable extends Component {
    render() {
        const {stantionsPodhod}= this.props
        // console.log('-stantionsPodhod-',stantionsPodhod)
       const columns = [
            {
                dataField: 'Idd',
                text: '#',
                headerAlign: 'center',
                headerClasses: ' table-podhod-header-font  table-podhod-header-sm',
                classes: 'table-podhod-cell-font-sm table-podhod-cell',
            },
            {
                dataField: 'Kodv',
                text: 'вагон',
                headerAlign: 'center',
                headerClasses: ' table-podhod-header-font  table-podhod-header-sm',
                classes: 'table-podhod-cell-font-sm table-podhod-cell',
            },
            {
                dataField: 'Ind',
                text: 'инд',
                headerAlign: 'center',
                headerClasses: ' table-podhod-header-font  table-podhod-header-sm2',
                classes: 'table-podhod-cell-font-sm table-podhod-cell',
            },
            {
                dataField: 'Oper',
                text: 'опер',
                headerAlign: 'center',
                headerClasses: ' table-podhod-header-font  table-podhod-header-sm',
                classes: 'table-podhod-cell-font-sm table-podhod-cell',
            },
            {
                dataField: 'Datelast',
                text: 'дата',
                headerAlign: 'center',
                headerClasses: ' table-podhod-header-font  table-podhod-header-sm2',
                classes: 'table-podhod-cell-font-sm table-podhod-cell',
            },
            {
                dataField: 'Namekods',
                text: 'стан по',
                headerAlign: 'center',
                headerClasses: ' table-podhod-header-font  table-podhod-header-md',
                classes: 'table-podhod-cell-font-sm table-podhod-cell',
            },
            {
                dataField: 'Ves',
                text: 'вес',
                headerAlign: 'center',
                headerClasses: ' table-podhod-header-font  table-podhod-header-sm',
                classes: 'table-podhod-cell-font-sm table-podhod-cell',
            },
            {
                dataField: 'Nameklient',
                text: 'клиент',
                headerAlign: 'center',
                headerClasses: ' table-podhod-header-font  table-podhod-header-lg',
                classes: 'table-podhod-cell-font-sm table-podhod-cell-left',
            },
            {
                dataField: 'Namegruz',
                text: 'Груз',
                headerAlign: 'center',
                headerClasses: ' table-podhod-header-font  table-podhod-header-lg',
                classes: 'table-podhod-cell-font-sm table-podhod-cell-left',
            },
            ];
        const table=
            (stantionsPodhod.length>0) ? <BootstrapTable keyField='Id' data={ stantionsPodhod } columns={ columns }  condensed /> : null

        return (
            <div>
                {table}
            </div>
        )
    }
}

export default connect(state=>({
    stantionsPodhod: stantionsPodhodFiltredSelector(state),
}), {})(PodhodTable)

