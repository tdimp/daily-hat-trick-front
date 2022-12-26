import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import SignUp from './components/SignUp';
import Login from './components/Login';
import NavBar from './components/NavBar';
import { UserProvider } from './context/UserContext';

function App() {
  // Need state intitialzers here: CurrentUser

  // useEffect to check if user is logged in

  // Need to think of component hierarchy and state management. Redux or useContext?

  return (
    <div className="App">
      <Router>
        <UserProvider>
          <NavBar />
          <br />
          <SignUp />
        <br />
        <Login />
        </UserProvider>
        
        <h1>Daily Hat Trick</h1>
        
      </Router>
      
    </div>
  );
}

export default App;
