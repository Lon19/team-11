import React, { useState } from 'react';
import { Navbar, NavbarBrand, Nav, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import './MtwNav.css';

function MtwNav() {
    const [modal, setModal] = useState(false);
    const toggleHelp = () => setModal(!modal);
    const className = "help-modal";
    const buttonLabel = "Help";

    return (
        <Navbar style={{backgroundColor: 'white', borderBottom: '1px solid #dfdfdf'}} light expand="md">
            <NavbarBrand style={{color: '#7b7b7b'}} href="/">MTW Map</NavbarBrand>
            <Nav className="ml-auto" navbar></Nav>
            <div>
              <Button color="danger" onClick={toggleHelp}>{buttonLabel}</Button>
              <Modal isOpen={modal} toggle={toggleHelp} className={className}>
                <ModalHeader toggle={toggleHelp}>Helpful Information</ModalHeader>
                <ModalBody>
                  <h5>Movement To Work</h5>
                  <p><small>Team 11 - Kyle Gough, Jay Carder, Joseph Bond, Scott Pickering, Ioannis Pata, Will Osborne</small></p>
                  <p>Lorem Ipsum etc etc etc.</p>
                </ModalBody>
              </Modal>
            </div>
        </Navbar>
    );
  }

  export default MtwNav;
