import React, { useState, useEffect } from 'react';
import { Container, Card, CardBody, CardTitle, Row, Col, Input, InputGroup, InputGroupText, InputGroupAddon, Label } from 'reactstrap';
import TestPlot from './TestPlot';
import './Map.css';
import './Main.css';
import './Fonts.css';
import './Common.css';

function Map() {

    //States.
    const [data, setData] = useState({
      datasets: [
          {
              label: 'Sample dataset',
              fillColor: 'rgba(220,220,220,0.2)',
              strokeColor: 'rgba(220,220,220,1)',
              pointColor: 'rgba(220,220,220,1)',
              pointStrokeColor: '#fff',
              pointHighlightFill: '#fff',
              pointHighlightStroke: 'rgba(220,220,220,1)',
              data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
          }
      ]}
    )
    const [txtFilter, setTxtFilter] = useState("");
    const [ageLow, setAgeLow] = useState(true);
    const [ageHigh, setAgeHigh] = useState(true);
    const [sexMale, setSexMale] = useState(true);
    const [sexFemale, setSexFemale] = useState(true);

    //Toggle Functions.
    let toggleSearch = () =>  { setTxtFilter(document.getElementById("filter-search").value) };
    let toggleAgeLow = () => { setAgeLow(!ageLow) };
    let toggleAgeHigh = () => { setAgeHigh(!ageHigh) };
    let toggleSexMale = () => { setSexMale(!sexMale) };
    let toggleSexFemale = () => { setSexFemale(!sexFemale) };

    //Effect Hook for filter changes.
    useEffect(() => {
        console.log("18-24 (" + ageLow + ")");
        console.log("25-29 (" + ageHigh + ")");
        console.log("Male (" + sexMale + ")");
        console.log("Female (" + sexFemale + ")");
    }, [ageLow, ageHigh, sexMale, sexFemale]);

    //Effect Hook for search changes.
    useEffect(() => {
        console.log("Search change (" + txtFilter + ")");
    }, [txtFilter]);

    return (
        <Container style={{margin:"0", minWidth: '100%', height: '100%'}}>
            <Row style={{height: '100%'}}>
                <Col style={{paddingLeft: "15px", paddingRight: "8px", height: '100%'}} xs="8" md="8" lg="8">
                    <Card className="card-map">
                      <InputGroup>
                        <Input type="text" name="filter-search" id="filter-search" placeholder="Search..." onChange={toggleSearch}/>
                        <InputGroupAddon addonType="append">
                          <InputGroupText>Search</InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>

                      <div style={{display: 'flex', flexDirection: 'row'}}>
                      <Col>
                        <span className="filter-checkbox-header">Age:</span>
                        <span className="filter-checkbox">
                          <Label check><Input type="checkbox" onChange={toggleAgeLow}/>{' '}18-24</Label>
                          <Label check className="filter-checkbox"><Input type="checkbox" onChange={toggleAgeHigh}/>{' '}25-29</Label>
                        </span>
                      </Col>
                      <Col>
                        <span className="filter-checkbox-header">Sex:</span>
                        <span className="filter-checkbox">
                          <Label check className="filter-checkbox"><Input type="checkbox" onChange={toggleSexMale}/>{' '}Male</Label>
                          <Label check className="filter-checkbox"><Input type="checkbox" onChange={toggleSexFemale}/>{' '}Female</Label>
                        </span>
                      </Col>
                      </div>

                      <CardTitle>Map Section</CardTitle>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi sit amet mauris commodo quis imperdiet. Nisi lacus sed viverra tellus. Tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum. Magna eget est lorem ipsum dolor sit amet consectetur adipiscing. Suspendisse potenti nullam ac tortor vitae purus faucibus. Purus non enim praesent elementum facilisis leo vel. At quis risus sed vulputate odio ut. Nunc mi ipsum faucibus vitae. Interdum posuere lorem ipsum dolor sit amet consectetur. Ultrices tincidunt arcu non sodales neque sodales. Quis ipsum suspendisse ultrices gravida dictum fusce. Risus nec feugiat in fermentum. Dolor purus non enim praesent elementum facilisis leo vel fringilla.

                      Quis eleifend quam adipiscing vitae proin sagittis. Suscipit adipiscing bibendum est ultricies integer. Adipiscing bibendum est ultricies integer quis auctor elit sed. Sit amet purus gravida quis blandit turpis cursus in. Et leo duis ut diam quam nulla porttitor. Consectetur libero id faucibus nisl tincidunt eget. Tincidunt augue interdum velit euismod in pellentesque massa. Aenean euismod elementum nisi quis eleifend quam adipiscing vitae. Nunc faucibus a pellentesque sit amet porttitor eget dolor. Non nisi est sit amet facilisis magna. Id faucibus nisl tincidunt eget nullam non nisi est sit. Vitae proin sagittis nisl rhoncus. Non arcu risus quis varius quam quisque id. Vel pretium lectus quam id leo in vitae turpis massa. Accumsan in nisl nisi scelerisque. Vivamus at augue eget arcu dictum varius. Malesuada proin libero nunc consequat. Volutpat lacus laoreet non curabitur gravida arcu ac tortor.

                      Donec adipiscing tristique risus nec feugiat in. Sit amet dictum sit amet justo donec enim. Laoreet sit amet cursus sit amet dictum. Euismod quis viverra nibh cras pulvinar. Adipiscing enim eu turpis egestas pretium aenean pharetra magna ac. Faucibus scelerisque eleifend donec pretium vulputate sapien. Eget arcu dictum varius duis at consectetur lorem donec. Adipiscing bibendum est ultricies integer quis auctor elit sed. Odio facilisis mauris sit amet massa vitae tortor condimentum lacinia. Donec ac odio tempor orci dapibus ultrices in.
                    </Card>
                </Col>
                <Col style={{paddingLeft: "8px", paddingRight: "15px", height: '100%'}} xs="4" md="4" lg="4">
                    <Card className="card-info">
                      <CardBody>
                        <CardTitle>Info Section</CardTitle>
                        <TestPlot data={data}/>
                      </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Map;
