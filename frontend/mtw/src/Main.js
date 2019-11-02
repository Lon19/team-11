import MtwNav from './MtwNav.js';
import Map from './Map';
import React, { useState } from 'react';
import logo from './logo.svg';
import './Main.css';
import axios from 'axios'

const API_URL = 'http://localhost:5000/hello'

export function fetch() {
  return axios.get(`${API_URL}`)
}

function Main() {

  const [msg, setMsg] = useState("hello");

  const componentDidMount = () => {
    axios.get(API_URL)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }


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
