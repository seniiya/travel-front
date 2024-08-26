
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx';
// import './reset.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Router> */}
    {/* Router 가 App.jsx 와 중복으로 오류가 뜨길래 지워줬음 */}
      <App />
    {/* </Router> */}
  </React.StrictMode>,
);