import React from 'react';
import { Container, Row } from 'react-bootstrap';

import GruzStatisticCard from './gruz-statistic-card';

const GruzStatisticPage = ({ data = [] }) => (
    <Container>
        <Row className="g-3 pt-3">
            {data.map((item) => (
                <GruzStatisticCard key={item.id} {...item} />
            ))}
        </Row>
    </Container>
);

export default GruzStatisticPage;