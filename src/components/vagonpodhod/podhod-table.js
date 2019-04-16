import React, {Component} from 'react'
import {Row, Col} from 'react-bootstrap'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import FindVagonsHistory from '../findvagonhistory'

class PodhodTable extends Component {
    render() {
        const {stantionsPodhod, columns, selectVagon,selectedVagon, closeExpanded}= this.props
        const expandRow = {
            renderer: () => (
                <div className={'p-0 m-0'}>
                    <FindVagonsHistory vagon={selectedVagon} closeExpanded={closeExpanded}/>
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
        }
        const table=
            (stantionsPodhod.length>0)
                ?  <BootstrapTable keyField='Id'
                                data={ stantionsPodhod }
                                classes={'table-responsive-xl text-nowrap'}
                                columns={ columns }
                                condensed e
                                expandRow={ expandRow }
                                rowEvents={ rowEvents } />
                : null
        return (
            <Row className="justify-content-md-center m-0" >
                <Col >
                    {table}
                </Col>
            </Row>

        )
    }
}

export default PodhodTable

