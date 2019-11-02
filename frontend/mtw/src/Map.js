import React from 'react';
import { Container, Card, CardTitle, Row, Col } from 'reactstrap';
import './Map.css';

function Map() {
    return (
        <Container style={{margin:"0", minWidth: '100%', height: '100%'}}>
            <Row style={{height: '100%'}}>
                <Col style={{paddingLeft: "15px", paddingRight: "8px", height: '100%'}} xs="8" md="8" lg="8">
                    <Card className="Mapboi">
                        <CardTitle>This map gon be lit y'all</CardTitle>
                    </Card>
                </Col>
                <Col style={{paddingLeft: "8px", paddingRight: "15px", height: '100%'}} xs="4" md="4" lg="4">
                    <Card className="Otherboi">
                        <CardTitle>This map gon be lit y'all</CardTitle>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Map;