import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import SignUp from './components/SignUp';
import Login from './components/Login';
import NavBar from './components/NavBar';

function App() {
  // Need state intitialzers here: CurrentUser

  // useEffect to check if user is logged in

  // Need to think of component hierarchy and state management. Redux or useContext?

  return (
    <div className="App">
      <Router>
        <NavBar />
        <h1>Hello</h1>
        <SignUp />
        <br />
        <Login />
      </Router>
      
    </div>
  );
}

export default App;
