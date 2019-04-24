import React, {Component} from 'react'
import {connect} from "react-redux"
import GruzOneStatistic from './gruz-one-statistic'
import {Container, Row, Col} from 'react-bootstrap'
import {  push } from 'react-router-redux'


class GruzStatisticPage extends Component {
    render() {
        return (
            <div>
                <Container>
                    <Row className="justify-content-md-center pt-4">
                        <Col md="auto">
                            <table className="table  table-responsive-xl overflow-hidden" style={{width: '22rem' }}>
                                <tbody>
                                {this.props.data.map((prop)=>
                                        <tr key={prop.id} onClick={() => this.props.push(prop.url)} className={'gruz-button'}>
                                            <td className='"align-middle clip pl-0 pr-0'><span style={{fontSize: '1rem', color: 'grey' }}>{prop.name}</span></td>
                                            <td className='p-1 clip text-right'><GruzOneStatistic value={prop.value} /></td>
                                        </tr>

                                    )}
                                </tbody>
                            </table>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}



export default connect(null, {push})(GruzStatisticPage)
