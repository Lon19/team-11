import React from 'react';
import { Row, Col, Container } from 'reactstrap';
import './Footer.css';
import './Common.css';

function Footer() {
    return (
        <div>
        <div className="footer">
        <Container className="footer-main">
          <Row>
            <Col md="6">
              <h5>Movement To Work</h5>
              <p>Movement to Work supports employers to provide work placements that combine employability skills training with on-the-job experience.</p>
            </Col>
            <Col md="6">
              <h5>Team 11 Members</h5>
              <ul>
                <li>Joesph Bond</li>
                <li>Jay Carder</li>
                <li>Kyle Gough</li>
                <li>Will Osborne</li>
                <li>Ioannis Patas</li>
                <li>Scott Pickering</li>
              </ul>
            </Col>
          </Row>
        </Container>
        </div>
        <div className="footer-copyright">
        <Container className="footer-copyright">
          &copy; 2019 Copyright <span className="footer-teamname">Team 11</span>
        </Container>
        </div>
        </div>
    );
}

export default Footer;
