import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Login from './Login';
import ErrorPage from './ErrorPage';

const SignUp = () => {

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const [errors, setErrors] = useState('');

  const {user, setUser} = useContext(UserContext);

  const navigate = useNavigate();

  interface User { // TypeScript interface defining the data types of users
    email: string;
    username: string;
    password: string;
  }

  const handleHasAccountClick = () => {
    setHasAccount(!hasAccount);
  }

  const handleUserSignUp = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    let user: User = {
      email: email,
      username: username,
      password: password
    }

    const response = await fetch('/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    if (response.ok) {
      setUser(data);
    } else {
      setErrors(response.statusText);
    }
    setEmail("");
    setUsername("");
    setPassword("");
    navigate('/')
  }

  if (errors) {
    return <ErrorPage message={errors} />
  }

  if(!user && !hasAccount) {
    return (
      <div className='signup'>
        <form onSubmit={handleUserSignUp}>
          <label>Email*</label>
            <input type="text" required={true} value={email} onChange={(e) => setEmail(e.target.value)} /><br />
          <label>Username*</label>
            <input type="text" required={true} value={username} onChange={(e) => setUsername(e.target.value)} /><br />
          <label>Password*</label>
            <input type="password" required={true} value={password} onChange={(e) => setPassword(e.target.value)} />
          <input type="submit" value="Sign up!" />
        </form>
        <>Already have an account?</>
        <button onClick={handleHasAccountClick}>Log In</button>
      </div>
    )
  } else if(!user && hasAccount) {
    return <Login />
  } else {
    return null;
  }
}

export default SignUp