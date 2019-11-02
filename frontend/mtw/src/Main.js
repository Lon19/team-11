import React, { useState } from 'react';
import MtwNav from './MtwNav.js';
import Map from './Map';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Collapse, InputGroup, InputGroupText, InputGroupAddon } from 'reactstrap';
import './Main.css';

function Main() {
  const [filter, setFilter] = useState(false);
  const toggleFilter = () => setFilter(!filter);

  return (
    <div className="App">
      <div className="Main">
        <MtwNav />
          <div className="Main-Content">
            <Map />
          </div>
        </div>
    </div>
  );
}

export default Main;
