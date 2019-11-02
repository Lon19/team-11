import React, { useState, useEffect } from 'react';
import { Container, Card, CardBody, CardTitle, Row, Col, Input, InputGroup, InputGroupText, InputGroupAddon, Label } from 'reactstrap';
import TestPlot from './TestPlot';
import './Map.css';
import './Main.css';
import './Fonts.css';
import './Common.css';
import D3Map from './D3-map';
import axios from 'axios';

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
    const [cardTitle, setCardTitle] = useState("Info");

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

        if (!ageLow && !ageHigh) {
            alert("Must select at least one age range.");
        }
        if (!sexMale && !sexFemale) {
            alert("Must select at least one gender.");
        }
    }, [ageLow, ageHigh, sexMale, sexFemale]);

    //Effect Hook for search changes.
    useEffect(() => {
        console.log("Search change (" + txtFilter + ")");
    }, [txtFilter]);

    const updateData = (name, token) => {
      axios.get("http://localhost:5000/get-old-ward?code="+token)
      .then(newtok => {
        let newToken = newtok.data.res;
        axios.get("http://localhost:5000/ward-hist?ward="+newToken)
        .then(newtokdata => {
          let jsondata = newtokdata.data
          setData({
            datasets: [
                {
                    label: name,
                    fillColor: 'rgba(220,220,220,0.2)',
                    strokeColor: 'rgba(220,220,220,1)',
                    pointColor: 'rgba(220,220,220,1)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(220,220,220,1)',
                    data: jsondata[newToken],
                }
            ]}
          )
        });
      });
    }


    return (
        <Container>
            <Row>
                <Col style={{paddingLeft: "15px", paddingRight: "8px"}} xs="8" md="8" lg="8">
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
                          <Label check><Input type="checkbox" onChange={toggleAgeLow} defaultChecked={true}/>{' '}18-24</Label>
                          <Label check className="filter-checkbox"><Input type="checkbox" onChange={toggleAgeHigh} defaultChecked={true}/>{' '}25-29</Label>
                        </span>
                      </Col>
                      <Col>
                        <span className="filter-checkbox-header">Sex:</span>
                        <span className="filter-checkbox">
                          <Label check className="filter-checkbox"><Input type="checkbox" onChange={toggleSexMale} defaultChecked={true}/>{' '}Male</Label>
                          <Label check className="filter-checkbox"><Input type="checkbox" onChange={toggleSexFemale} defaultChecked={true}/>{' '}Female</Label>
                        </span>
                      </Col>
                      </div>

                      <CardBody>
                        <D3Map onWardClick={(info) => {
                          
                          console.log(info.ward.properties.wd18cd);
                          console.log(info.total);
                          console.log(info);
                          
                          setCardTitle(info.ward.properties.wd18nm);
                          updateData(info.ward.properties.wd18nm, info.ward.properties.wd18cd);
                        }}/>
                      </CardBody>
                    </Card>
                </Col>
                <Col style={{paddingLeft: "8px", paddingRight: "15px"}} xs="4" md="4" lg="4">
                    <Card className="card-info">
                      <CardBody>
                        <CardTitle>{cardTitle}</CardTitle>
                        <TestPlot data={data}/>
                      </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Map;
