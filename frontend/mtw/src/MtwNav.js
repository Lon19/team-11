import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav} from 'reactstrap';
import './MtwNav.css';

function MtwNav() {
    return (
        <Navbar style={{backgroundColor: 'white', borderBottom: '1px solid #dfdfdf'}} light expand="md">
            <NavbarBrand style={{color: '#7b7b7b'}} href="/">MTW Map</NavbarBrand>
            <Nav className="ml-auto" navbar></Nav>
        </Navbar>
    );
  }
  
  export default MtwNav;
  