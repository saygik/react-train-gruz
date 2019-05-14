import React, {Component} from 'react'
import {Row, Col} from 'react-bootstrap'

class ErrorIndicator extends Component {
    render() {
        return (
            <div>
                <Row className={'mr-0'}>
                    <Col  >
                       Ошибка!!!
                    </Col>
                </Row>

            </div>
        )
    }
}


export default ErrorIndicator
