import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import SignUp from './SignUp';
import ErrorPage from './ErrorPage';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasAccount, setHasAccount] = useState(true);
  const [errors, setErrors] = useState('');

  const {user, setUser} = useContext(UserContext);

  const handleHasAccountClick = () => {
    setHasAccount(!hasAccount);
  }

  const handleUserLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    let user = {
      email: email,
      password: password
    };    
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    if (response.ok) {
      setUser(data);
    } else {
      setErrors(data.error.login)
    }
    setEmail("");
    setPassword("");
  }

  if (errors) {
    return <ErrorPage message={errors} />
  }

  if(!user && hasAccount) {
    return (
      <div>
        <form onSubmit={handleUserLogin}>
          <label>Email*</label>
          <input type="text" required={true} value={email} onChange={(e) => setEmail(e.target.value)} />
          <label>Password*</label>
          <input type="password" required={true} value={password} onChange={(e) => setPassword(e.target.value)} />
          <input type="submit" value="Login!" />
        </form>
        <>Don't have an account?</>
        <button onClick={handleHasAccountClick}>Sign Up</button>
      </div>
    )
  } else if(!user && !hasAccount) {
    return <SignUp />
  } else {
    return null;
  }
}

export default Login