import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Card } from 'react-bootstrap'
import GruzOneStatistic from './gruz-one-statistic'

const GruzStatisticCard = ({ name, caption, value, url }) => (
    <Col sm={12} md={6} lg={4} className='justify-content-center'>
        <div style={{ width: '18rem', margin: 'auto' }}>
            <Link to={url} className="d-block text-reset text-decoration-none">
                <Card className="text-center shadow m-2 gruz-button">
                    <Card.Header>{name}</Card.Header>
                    <Card.Body>
                        <Card.Title><GruzOneStatistic value={value} /></Card.Title>
                        <Card.Text>
                            <small className="text-muted">{caption}</small>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Link>
        </div>
    </Col>
)
export default GruzStatisticCard
