import './App.css';
​
//Components & Pages to IMPORT
import React, {useEffect, useState} from "react";
import {Route,BrowserRouter as Router, Redirect} from 'react-router-dom'
import Header from "./components/Header";
import Login from "./pages/Login/index.js";
import Logout from "./pages/Logout/index.js";
import Signup from "./pages/Signup/index.js";
import UserProfile from "./pages/UserProfile/index.js";
import * as firebase from "firebase/app";
import "firebase/auth";
​
var firebaseConfig = {
    apiKey: "AIzaSyDpxI0Gc4OHyfVY8H0B7k-TM-Yq_fABR50",
    authDomain: "exercisefive-3a5f0.firebaseapp.com",
    databaseURL: "https://exercisefive-3a5f0.firebaseio.com",
    projectId: "exercisefive-3a5f0",
    storageBucket: "exercisefive-3a5f0.appspot.com",
    messagingSenderId: "67350645548",
    appId: "1:67350645548:web:048891f31436fc3f97fa89",
    measurementId: "G-L3WLJYZD7H"
  };
​
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
​
useEffect(() => {
  //initiallize firebase
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }
  //Set auth to be persistent in SESSION
  // You can also set this as a cookie but we will use
  // it in session storage
  firebase
  .auth()
  .setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .catch(function(error) {
    console.log('error', error);
  });
}, [firebaseConfig])
​
useEffect(() => {
  firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
      setLoggedIn(true);
      setUser(user);
    }else{
      setLoggedIn(false);
      setUser({});
    }
  });
​
}, [])
​
function signupFunction(e){
  e.preventDefault();
  //let email = 'bab619@nyu.edu'
  //let password = 'Dreamsmadereal1997!'
​
  let email = e.currentTarget.createEmail.value
  let password = e.currentTarget.createPassword.value;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email,password)
    .then(function(response){
      setLoggedIn(true);
    })
    .catch(function(error) {
      console.log(error);
    });
}
​
function loginFunction(e){
  e.preventDefault();
​
  let email= e.currentTarget.loginEmail.value;
  let password = e.currentTarget.loginPassword.value;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function(response) {
      setLoggedIn(true);
    })
    .catch(function(error) {
      console.log('error', error);
    });
}
​
function logoutFunction(){
  firebase.auth().signOut().then(function() {
    setLoggedIn(false);
  }).catch(function(error) {
    console.log('error',error);
  });
}
​
​
  return (
    <div className="App">
    <Header loggedIn={loggedIn} logoutFunction={logoutFunction}/>
      <Router>
​
        <Route exact path="/">
          { loggedIn ? <UserProfile user={user}/> : <Redirect to="login" />}
        </Route>
​
        <Route exact path="/login">
         { loggedIn ? <Redirect to="/"/> : <Login loginFunction={loginFunction} />}
        </Route>
​
        <Route exact path="/sign-up">
           { loggedIn ? <Redirect to="/"/> : <Signup signupFunction={signupFunction} />}
        </Route>
​
      </Router>
    </div>
  );
}

export default App;
