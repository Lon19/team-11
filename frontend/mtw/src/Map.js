import React from 'react';
import { Card, CardTitle, Row, Col } from 'reactstrap';
import './Map.css';

function Map() {
    return (
        <Row>
            <div className="MapBox">
                <Col xs='12' md='12' lg='12'>
                    <Card body>
                        <CardTitle>This map gon be lit y'all</CardTitle>
                    </Card>
                </Col>
            </div>
        </Row>
    );
}

export default Map;