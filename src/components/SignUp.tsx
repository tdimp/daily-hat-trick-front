import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //const navigate = useNavigate();

  interface User { // TypeScript interface defining the data types of users
    email: string;
    username: string;
    password: string;
  }

  // Need a reroute to '/' upon successful creation and log in of new user

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
      // TODO: Update Redux store with created user data
      alert(`User ${user.username} created!`)
    } else {
      alert("Oops, something went wrong.")
    }
    setEmail("");
    setUsername("");
    setPassword("");
    //navigate('/')
  }


  return ( // Controlled sign up form goes here
           // Fields: Email address, Username, Password, Password Confirmation
    <div>
      <form onSubmit={handleUserSignUp}>
        <label>Email*</label>
          <input type="text" required={true} value={email} onChange={(e) => setEmail(e.target.value)} /><br />
        <label>Username*</label>
          <input type="text" required={true} value={username} onChange={(e) => setUsername(e.target.value)} /><br />
        <label>Password*</label>
          <input type="password" required={true} value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="submit" value="Sign up!" />
      </form>
    </div>
  )
}

export default SignUp