import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { TeamContext } from '../context/TeamContext';
import Login from './Login';

const NavBar = () => {
  const {user, setUser} = useContext(UserContext);
  const {teams, setTeams} = useContext(TeamContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    fetch('/logout', {
      method: 'DELETE',
    })
    .then(res => {
      if (res.ok) {
        setUser(null);
        setTeams(null);
        alert('You have successfully logged out.')
      } else {
        alert('Oops, something went wrong.')
      }
    });
  }

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/');
  }

  if(user) {
    return (
      <div className='navbar'>
        <Link to='/'>Home</Link>
        <Link to='/teams'>Teams</Link>
        <Link to='/players/page/1'>Players</Link>
        <Link to='/nhlteams'>NHL Teams</Link>
        <button onClick={handleLogoutClick}>Logout</button>
      </div>
    )
  } else {
    return (
      <div className='navbar'>
        <Login /> <br />
        <Link to='/players/page/1'>Players</Link>
        <Link to='/nhlteams'>NHL Teams</Link>
      </div>
    )
  }
}

export default NavBar