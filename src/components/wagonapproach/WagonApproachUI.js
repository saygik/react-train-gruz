import React, {Component} from 'react'
import {  Row, Col } from 'react-bootstrap'
import SelectPodhod from './SelectPodhod'
import SelectStantions from './SelectStantions'
import PodhodTable from './PodhodTable'
import PodhodTableHeader from "./PodhodTableHeader"

class WagonApproachUI extends Component {
    render() {
        return (
            <div>
                <Row className="justify-content-md-center m-0 p-2" >
                    <Col md={7}>
                        <SelectStantions/>
                    </Col>
                </Row>
                <Row className="justify-content-md-center m-0 p-2" >
                    <Col md={7}>
                        <SelectPodhod/>
                    </Col>
                </Row>

                <Row className="justify-content-md-begin m-2" >
                    <Col className='p-3'>
                        <PodhodTableHeader />
                    </Col>
                </Row>
                <Row className="justify-content-md-center m-2" >
                    <Col >
                        <PodhodTable/>
                    </Col>
                </Row>

            </div>
        )
    }
}


export default WagonApproachUI

