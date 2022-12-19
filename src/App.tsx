import React, { useState, useEffect } from 'react';
import './App.css';
import SignUp from './components/SignUp';
import Login from './components/Login';

function App() {
  // Need state intitialzers here: CurrentUser

  // useEffect to check if user is logged in

  // Need to think of component hierarchy and state management. Redux or useContext?

  return (
    <div className="App">
      <h1>Hello</h1>
      <SignUp />
      <br />
      <Login />
    </div>
  );
}

export default App;
