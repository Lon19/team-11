import React from 'react';
import { Container, Card, CardTitle, Row, Col, Input, InputGroup, InputGroupText, InputGroupAddon, FormGroup, Label } from 'reactstrap';
import './Map.css';

function Map() {
    return (
        <Container style={{margin:"0", minWidth: '100%', height: '100%'}}>
            <Row style={{height: '100%'}}>
                <Col style={{paddingLeft: "15px", paddingRight: "8px", height: '100%'}} xs="8" md="8" lg="8">
                    <Card className="Mapboi">
                      <InputGroup>
                        <Input type="text" name="filter-search" id="filter-search" placeholder="Search..." />
                        <InputGroupAddon addonType="append">
                          <InputGroupText>Search</InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>

                      <div style={{display: 'flex', flexDirection: 'row'}}>
                        <Col>Age:
                        <Label check>
                          <Input type="checkbox" />{' '}
                            18-24
                        </Label>
                        <Label check>
                          <Input type="checkbox" />{' '}
                            25-29
                        </Label>
                        </Col>
                        <Col>Sex:
                          <Label check>
                            <Input type="checkbox" />{' '}
                              Male
                          </Label>
                          <Label check>
                            <Input type="checkbox" />{' '}
                              Female
                          </Label>
                        </Col>
                      </div>

                      <CardTitle>Map Section</CardTitle>
                    </Card>
                </Col>
                <Col style={{paddingLeft: "8px", paddingRight: "15px", height: '100%'}} xs="4" md="4" lg="4">
                    <Card className="Otherboi">
                        <CardTitle>Info Section</CardTitle>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Map;
