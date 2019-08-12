import React from 'react';
import Header from './components/header';
import { BrowserRouter as Router, Route } from "react-router-dom";
import EditShoppingList from "./components/shopping-list"
import Home from "./components/home"
import './App.css';
import hamburgerMenuPage from './components/hamburgerMenu';


function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Header></Header>
        <main className="content">
          <Route exact path="/" component={Home} />
          <Route path="/new" component={EditShoppingList} />
        </main>

        <footer className="main-footer mb-1">Made with ❤ by "The guys who Shop"</footer>
      </div>
    </Router>
  );
}

export default App;
