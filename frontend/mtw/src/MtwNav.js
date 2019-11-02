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
            <img src={"MTW_LOGO.png"} style={{height: '32px'}} alt="Movement To Work Logo" />
            <Nav className="ml-auto" navbar></Nav>
            <div>
              <Button className='btn-help' style={{backgroundColor: '#710045'}} onClick={toggleHelp}>{buttonLabel}</Button>
              <Modal isOpen={modal} toggle={toggleHelp} className={className}>
                <ModalHeader toggle={toggleHelp}>Helpful Information</ModalHeader>
                <ModalBody>
                  <h5>Movement To Work</h5>
                  <p><small>Team 11 - Kyle Gough, Jay Carder, Joseph Bond, Scott Pickering, Ioannis Pata, Will Osborne</small></p>
                  <p>Movement to Work inspires young people to change their lives through positive encounters with work. Our member employers are in a unique position to bring about powerful and lasting change that can unlock the potential of young people.
                  </p>
                  <a href="https://www.movementtowork.com/">https://www.movementtowork.com/</a>
                </ModalBody>
              </Modal>
            </div>
        </Navbar>
    );
  }

  export default MtwNav;
