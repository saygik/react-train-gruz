import React from 'react'
import { Container, Row } from 'react-bootstrap'
import GruzStatisticCard from './gruz-statistic-card'

const GruzStatisticPage = ({ data }) => (
    <Container>
        <Row className='justify-content-left pt-3'>
            {data.map((prop) => <GruzStatisticCard key={prop.id}
                url={prop.url}
                name={prop.name}
                caption={prop.caption}
                value={prop.value} />)
            }
        </Row>
    </Container>
)
export default GruzStatisticPage
