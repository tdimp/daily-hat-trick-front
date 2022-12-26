import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';


const NavBar = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    userContext.setUser(null);
    navigate('/');
  }


  return (
    <div>{userContext.user ? `${userContext.user.username}` : "Please log in"}<button onClick={handleLogout}>Logout</button></div>
  )
}

export default NavBar