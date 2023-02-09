import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { TeamContext } from '../context/TeamContext';
import Login from './Login';
import ErrorPage from './ErrorPage';

const NavBar = () => {
  const {user, setUser} = useContext(UserContext);
  const {setTeams} = useContext(TeamContext);

  const [errors, setErrors] = useState('');

  const navigate = useNavigate();

  const handleLogout = () => {
    fetch('/logout', {
      method: 'DELETE',
    })
    .then(res => {
      if (res.ok) {
        setUser(null);
        setTeams(null);
      } else {
        setErrors(res.statusText);
      }
    });
  }

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/');
  }

  if (errors) {
    return <ErrorPage message={errors} />
  }

  if(user) {
    return (
      <div className='navbar'>
        <h1 className='header-text'>Daily Hat Trick</h1>
        <Link to='/'>Home</Link>
        <Link to='/teams'>Teams</Link>
        <Link to='/players/page/1'>Players</Link>
        <Link to='/nhlteams'>NHL Teams</Link>
        <button className='button-red' onClick={handleLogoutClick}>Logout</button>
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