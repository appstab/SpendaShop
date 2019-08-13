import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from './components/header';
import EditShoppingList from "./components/shopping-list"
import Home from "./components/home"
import './App.css';
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");


class App extends React.Component {

  constructor() {
    super();
    // Initialize Cloud Firestore through Firebase
    firebase.initializeApp({
      apiKey: "AIzaSyA_BM1T3NP4uJjyHUJTAppAdfpdVMVu0U4",
      authDomain: "spendashop.firebaseapp.com",
      databaseURL: "https://spendashop.firebaseio.com",
      projectId: "spendashop",
      storageBucket: "",
      messagingSenderId: "144312962160",
      appId: "1:144312962160:web:cf223c691987137b"
    });

    this.db = firebase.firestore();
  }

  // componentDidMount() {
  // }

  render() {
    return (
      <Router>
        <div className="app-wrapper">
          <Header></Header>

          <main className="content">
            <Route exact path="/" component={Home} />
            <Route path="/new" render={(props) => <EditShoppingList {...props} firestore={this.db} />} />
          </main>

          <footer className="main-footer mb-1">Made with ❤ by "The guys who Shop"</footer>
        </div>
      </Router>
    );
  }

}

export default App;
