import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom'
import App from './components/App';
// import reportWebVitals from './reportWebVitals';
// import { Web3ReactProvider } from '@web3-react/core'
// import Web3 from 'web3'
// import createRoutes from './routes';



// function runApp() {
  ReactDOM.render(
    <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    </BrowserRouter>,
    document.getElementById('root')
  );
