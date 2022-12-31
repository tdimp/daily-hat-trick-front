import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';


const NavBar = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch('/logout', {
      method: "DELETE",
    })
    .then(res => {
      if (res.ok) {
        userContext.setUser(null);
        alert("You have successfully logged out.")
      } else {
        alert("Oops, something went wrong.")
      }
    });
  }

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/');
  }


  return (
    <div>{userContext.user ? `${userContext.user.username}` : "Please log in"}<button onClick={handleLogoutClick}>Logout</button></div>
  )
}

export default NavBar