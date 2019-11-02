import React from 'react';
import MtwNav from './MtwNav.js';
import Map from './Map';
import Footer from './Footer';
import './Main.css';
import './Fonts.css';
import './Common.css';

function Main() {

  return (
    <div className="App">
      <div className="Main">
        <MtwNav />
          <div className="Main-Content">
            <Map />
          </div>
      </div>
      <Footer />
    </div>
  );
}

export default Main;
