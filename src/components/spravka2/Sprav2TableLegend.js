import React, {Component} from 'react'
import {Row, Col, Badge} from 'react-bootstrap'

class Sprav2TableLegend extends Component {
    render() {
        return (
            <div>
                <Row className={'mr-0'}>
                    <Col  className='text-right pr-2 font-italic '  >
                        <Badge className={'m-1 p-2 gruz-bg-1 font-weight-normal'}>погружено вагонов</Badge>
                        <Badge className={'m-1 p-2 gruz-bg-6 font-weight-normal'}>выгружено вагонов</Badge>
                        <Badge className={'m-1 p-2 gruz-bg-7 font-weight-normal'}>поступило на отделение</Badge>
                    </Col>
                </Row>

            </div>
        )
    }
}


export default Sprav2TableLegend
