import React from 'react';
import ReactDOM from 'react-dom/client';  // Import from 'react-dom/client'
import './index.css';
import App from './App';// src/index.js
import 'bootstrap/dist/css/bootstrap.min.css';


// Create a root element and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
