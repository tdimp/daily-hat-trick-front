import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import TeamList from './containers/TeamList';
import PlayerList from './containers/PlayerList';
import Player from './components/Player';
import Team from './containers/Team';
import { UserProvider } from './context/UserContext';
import { TeamsProvider } from './context/TeamContext';
import NhlTeamList from './containers/NhlTeamList';
import NhlTeam from './containers/NhlTeam';
import Home from './components/Home';

const App = () => {

  // Need to think of component hierarchy and state management. Redux or useContext?

  return (
    <div className='App'>
      <Router>
        <UserProvider>
        <TeamsProvider>
          <NavBar />
          <Routes>
            <Route path='/' element ={<Home />} />
            <Route path='/teams' element={<TeamList />} />
            <Route path='/teams/:id' element={<Team />} />
            <Route path='/players/page/:page' element={<PlayerList />} />
            <Route path='/players/:id' element={<Player />} />
            <Route path='/nhlteams' element={<NhlTeamList />} />
            <Route path='/nhlteams/:id' element={<NhlTeam />} />
          </Routes>
        </TeamsProvider>
        </UserProvider>
      </Router>
      
    </div>
  );
}

export default App;
