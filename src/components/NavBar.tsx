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

  if (user) {
    return (
      <div className='navbar-expand{-sm|-md|-lg|-xl}'>
        <div className='navbar'>
          <h1 className='header-text'>Daily Hat Trick</h1>
          <nav>
            <Link to='/'>Home</Link>
          </nav>
          <nav>
            <Link to='/teams'>Teams</Link>
          </nav>
          <nav>
            <Link to='/players/all/1'>Players</Link>
          </nav>
          <nav>
            <Link to='/nhlteams'>NHL Teams</Link>
          </nav>
          <nav>
            <button className='btn btn-primary btn-sm' onClick={handleLogoutClick}>Logout</button>
          </nav>
        </div>
      </div>
    )
  } else {
    return (
      <div className='navbar-expand{-sm|-md|-lg|-xl}'>
        <div className='navbar'>
        <h1 className='header-text'>Daily Hat Trick</h1>
        <nav>
          <Link to='/'>Home</Link>
        </nav>
        <nav>
          <Link to='/players/all/1'>Players</Link>
        </nav>
        <nav>
          <Link to='/nhlteams'>NHL Teams</Link>
        </nav>
        <nav>
          <Login />
        </nav>
      </div>
      </div>
    )
  }
}

export default NavBar