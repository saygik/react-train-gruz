import React, {Component} from 'react'
import {Row, Col} from 'react-bootstrap';

class VagonHistoryHeader extends Component {
    render() {
        const {criteria}= this.props
        return (
            <div>
                <Row className="p-0">
                    <Col >
                        <Row>
                            <Col >
                                <span className="badge badge-secondary">Вагон:</span> <span className={'gruz-font-90'}>{criteria.Kodv}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col >
                                <span className="badge badge-secondary">Грузополучатель:</span> <span className={'gruz-font-80'}>{criteria.Nameklient}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col >
                                <span className="badge badge-secondary">Груз:</span> <span className={'gruz-font-90'}>{criteria.Namegruz}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col >
                                <span className="badge badge-secondary">Вес:</span> <span className={'gruz-font-90'}>{criteria.Ves}</span>
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </div>
        )
    }
}

export default VagonHistoryHeader
