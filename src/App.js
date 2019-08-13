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

    this.state = {
      user: null
    }

    this.provider = new firebase.auth.GoogleAuthProvider();

    // this.login = this.login.bind(this);
  }

  componentDidMount() {

  }

  login = () => {
    firebase.auth().signInWithPopup(this.provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // var token = result.credential.accessToken;
      // The signed-in user info.
      if (!result.user) { return; }

      var user = {
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL
      }

      this.setState({ user });
      // ...
    }).catch(function (error) {
      // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // // The email of the user's account used.
      // var email = error.email;
      // // The firebase.auth.AuthCredential type that was used.
      // var credential = error.credential;
      // ...
      console.log(error);
    });
  }

  logout = () => {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      this.setState({
        user: null
      })

    }).catch(function (error) {
      // An error happened.
    });
  }


  render() {
    return (
      <Router>
        <div className="app-wrapper">
          <Header login={this.login} logout={this.logout} user={this.state.user}></Header>

          <main className="content">
            <Route exact path="/" render={(props) => <Home user={this.user}></Home>} />
            <Route path="/new" render={(props) => <EditShoppingList {...props} firestore={this.db} />} />
          </main>

          <footer className="main-footer mb-1">Made with ❤ by "The guys who Shop"</footer>
        </div>
      </Router>
    );
  }

}

export default App;
