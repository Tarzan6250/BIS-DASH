import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter here
import './index.css';
import App from './App';

// Create the root of the app with the new React 18 API
const root = ReactDOM.createRoot(document.getElementById('root')); 

root.render(
  <BrowserRouter> {/* Only one Router here in index.js */}
    <App />
  </BrowserRouter>
);
