import React, {Component} from 'react'
import {Row, Col, Badge} from 'react-bootstrap'

class Sprav1TableLegend extends Component {
    render() {
        return (
            <div>
                <Row className={'mr-0'}>
                    <Col  className='text-right pr-2 font-italic '  >
                        <Badge className={'m-1 p-2 gruz-bg-1 font-weight-normal'}>на станциях</Badge>
                        <Badge className={'m-1 p-2 gruz-bg-6 font-weight-normal'}>на ближнем подходе</Badge>
                        <Badge className={'m-1 p-2 gruz-bg-7 font-weight-normal'}>на дальнем подходе</Badge>
                    </Col>
                </Row>

            </div>
        )
    }
}


export default Sprav1TableLegend
