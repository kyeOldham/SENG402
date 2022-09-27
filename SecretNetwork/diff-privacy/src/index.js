import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./App.scss";

import {
  gripApp,
  getKeplrAccountProvider
} from '@stakeordie/griptape.js';

// const config = {
//   restUrl: 'https://api.pulsar.griptapejs.com',
//   defaultFees: {
//     upload: 500000,
//     init: 100000,
//     exec: 200000,
//     send: 100000
//   }
// };

const el = document.getElementById("root");


// function runApp() {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    el
  );
