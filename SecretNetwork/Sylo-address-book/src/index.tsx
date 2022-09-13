import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom'
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'
// import createRoutes from './routes';
import {
  gripApp,
  getKeplrAccountProvider
} from '@stakeordie/griptape.js';

const restUrl = 'https://api.pulsar.griptapejs.com';
const provider = getKeplrAccountProvider();


// function getLibrary(provider: any) {
//   return new Web3(provider)
// }

function runApp() {
  ReactDOM.render(
    <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    </BrowserRouter>,
    document.getElementById('root')
  );
}

// ReactDOM.render( 
//       <BrowserRouter>
//       <Web3ReactProvider getLibrary={getLibrary}>
//       <App />
//       </Web3ReactProvider>
//       </BrowserRouter>
//     ,
//   document.getElementById('root')
  
// );


gripApp(restUrl, provider, runApp);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
