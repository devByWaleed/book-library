// Importing Modules & Component
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './output.css';
import App from './App';

// Creating The Route
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering The Route
root.render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
);