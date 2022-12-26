import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import SignUp from './components/SignUp';
import Login from './components/Login';
import NavBar from './components/NavBar';
import { UserProvider } from './context/UserContext';

function App() {

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
