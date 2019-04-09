import React, {Component} from 'react'
import {Row, Col, Badge} from 'react-bootstrap';

class VagonHistoryHeader extends Component {
    render() {
        const {criteria}= this.props
        return (
            <div>
                <Row className="p-0">
                    <Col >
                        <Row>
                            <Col >
                                <span className={'gruz-font-90'} >Вагон:</span> <Badge variant="success">{criteria.Kodv}</Badge>
                            </Col>
                        </Row>
                        <Row>
                            <Col >
                                <span className={'gruz-font-90'} >Грузополучатель: {criteria.Nameklient}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col >
                                <span className={'gruz-font-90'} >Груз: {criteria.Namegruz}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col >
                                <span className={'gruz-font-90'}  >Вес: {criteria.Ves}</span>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default VagonHistoryHeader
