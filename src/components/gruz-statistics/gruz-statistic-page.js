import React, {Component} from 'react'
import {connect} from "react-redux"
import {Container, Row} from 'react-bootstrap'
import {  push } from 'react-router-redux'
import GruzStatisticCard from './gruz-statistic-card'

class GruzStatisticPage extends Component {
    render() {
        return (
                <Container>
                    <Row className='justify-content-left pt-3'>
                        {this.props.data.map((prop)=> <GruzStatisticCard key={prop.id}
                                                                         url={prop.url}
                                                                         name={prop.name}
                                                                         caption={prop.caption}
                                                                         value={prop.value}
                                                                         push={this.props.push }   />)
                        }
                    </Row>
                </Container>
        )
    }
}

export default connect(null, {push})(GruzStatisticPage)
