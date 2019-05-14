import React from 'react'
import {connect} from "react-redux"
import {Container, Row} from 'react-bootstrap'
import {  push } from 'react-router-redux'
import GruzStatisticCard from './gruz-statistic-card'

const GruzStatisticPage =(props)=> (
       <Container>
            <Row className='justify-content-left pt-3'>
                {props.data.map((prop) => <GruzStatisticCard key={prop.id}
                                                     url={prop.url}
                                                     name={prop.name}
                                                     caption={prop.caption}
                                                     value={prop.value}
                                                     push={props.push}/>)
                }
                </Row>
        </Container>
)
export default connect(null, {push})(GruzStatisticPage)
