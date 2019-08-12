import React from 'react';
import Header from './components/header';
import './App.css';

function App() {
  return (

    <div className="app-wrapper">
      <Header></Header>

      <main className="content">
        <button>New List</button>
      </main>

      <footer className="main-footer mb-1">Made with ❤ by "The guys who Shop"</footer>
    </div>
  );
}

export default App;
