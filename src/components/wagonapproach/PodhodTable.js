import React, {Component} from 'react'
import {connect} from "react-redux"
import { stantionsPodhodFiltredSelector} from "../../ducks/wagonapproach"
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import './wagonapproach.css'

class PodhodTable extends Component {
    render() {
        const {stantionsPodhod, columns}= this.props
        // console.log('-stantionsPodhod-',stantionsPodhod)
        const table=
            (stantionsPodhod.length>0) ? <BootstrapTable keyField='Id' data={ stantionsPodhod } classes={'table-responsive-md '} columns={ columns }  condensed /> : null

        return (
            <div >
                {table}
            </div>
        )
    }
}

export default connect(state=>({
    stantionsPodhod: stantionsPodhodFiltredSelector(state),
}), {})(PodhodTable)

