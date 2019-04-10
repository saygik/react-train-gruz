import React, {Component} from 'react'
import {  Row, Col } from 'react-bootstrap'
import SelectPodhod from './SelectPodhod'
import SelectStantions from './SelectStantions'
import PodhodTable from './PodhodTable'



class WagonApproachUI extends Component {
    render() {
        const { selectCurrentPodhod, selectedPodhod, numPodhods, columns} = this.props
        return (
            <div>
                <Row className="justify-content-md-center m-0 p-0" >
                    <Col md={7} lg={6}>
                        <SelectPodhod selectedPodhod={selectedPodhod} numPodhods={numPodhods} selectCurrentPodhod={selectCurrentPodhod}/>
                    </Col>
                </Row>
                <Row className="justify-content-md-center m-0 p-2" >
                    <Col md={7}>
                        <SelectStantions/>
                    </Col>
                </Row>

                <Row className="justify-content-md-center m-0" >
                    <Col >
                        <PodhodTable columns={columns}/>
                    </Col>
                </Row>

            </div>
        )
    }
}


export default WagonApproachUI

