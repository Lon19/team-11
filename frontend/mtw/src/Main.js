import React from 'react';
import MtwNav from './MtwNav.js';
import Map from './Map';
import './Main.css';
import {Button, Modal, ModalReader, ModalBody, ModalFooter} from 'reactstrap'
function Main() {
  return (
    <div className="Main">
      <MtwNav />
        <div className="Main-Content">
          <Map />
        </div>
    </div>
  );
}

export default Main;
