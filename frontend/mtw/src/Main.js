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
      <header className="Main-header">
        <img src={logo} className="Main-logo" alt="logo" />
        {componentDidMount()}
        <p>
          Edit <code>src/Main.js</code> and save to reload.
        </p>
        <a
          className="Main-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Main;
