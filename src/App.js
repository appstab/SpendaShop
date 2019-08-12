import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to SpendaShop.
        </p>
        <a
          className="App-link"
          href="https://googgle.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn About us
        </a>
      </header>
    </div>
  );
}

export default App;
