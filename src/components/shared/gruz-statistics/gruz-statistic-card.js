import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Card } from 'react-bootstrap';

import GruzOneStatistic from './gruz-one-statistic';

const GruzStatisticCard = ({ name, caption, value, url }) => (
    <Col sm={12} md={6} lg={4} className="d-flex mb-4">
        <Link
            to={url}
            className="gruz-card-link d-block w-100 text-reset text-decoration-none"
        >
            <Card className="gruz-card h-100 text-center border-0">
                <Card.Header className="gruz-card-header">
                    <span className="gruz-card-title">{name}</span>
                </Card.Header>
                <Card.Body className="d-flex flex-column justify-content-center py-3">
                    <div className="gruz-card-value">
                        <GruzOneStatistic value={value} />
                    </div>
                    {caption && <small className="gruz-card-caption">{caption}</small>}
                </Card.Body>
                <span className="gruz-card-arrow" aria-hidden="true">→</span>
            </Card>
        </Link>
    </Col>
);

export default GruzStatisticCard;