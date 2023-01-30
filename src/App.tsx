import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import TeamList from './Containers/TeamList';
import PlayerList from './Containers/PlayerList';
import Player from './components/Player';
import Team from './Containers/Team';
import { UserProvider } from './context/UserContext';
import { TeamsProvider } from './context/TeamContext';
import NhlTeamList from './Containers/NhlTeamList';

const App = () => {

  // Need to think of component hierarchy and state management. Redux or useContext?

  return (
    <div className='App'>
      <h1>Daily Hat Trick</h1>
      <Router>
        <UserProvider>
        <TeamsProvider>
          <NavBar /> <br />
          <Routes>
            <Route path='/teams' element={<TeamList />} />
            <Route path='/teams/:id' element={<Team />} />
            <Route path='/players/page/:page' element={<PlayerList />} />
            <Route path='/players/:id' element={<Player />} />
            <Route path='/nhlteams' element={<NhlTeamList />} />
          </Routes>
        </TeamsProvider>
        </UserProvider>
      </Router>
      
    </div>
  );
}

export default App;
