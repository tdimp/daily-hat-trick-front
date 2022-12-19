import React, { useState } from 'react'

const SignUp = () => {

  // Initialize state for our controlled sign up form here
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  

  // Need handler function that sends POST request to backend, creating the user in the database
  // users#create controller action should also log the user in upon successful creation -> set new user.id in session
  // Need a reroute to '/' upon successful creation and log in of new user

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    let user = {
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
      // Update state with created user data
      alert(`User ${user.username} created!`)
    } else {
      alert("Oops, something went wrong.")
    }
    setEmail("");
    setUsername("");
    setPassword("");
  }


  return ( // Controlled sign up form goes here
           // Fields: Email address, Username, Password, Password Confirmation
    <div>
      <form onSubmit={onSubmit}>
        <label>Email*</label>
          <input type="text" required={true} value={email} onChange={(e) => setEmail(e.target.value)} /><br />
        <label>Username*</label>
          <input type="text" required={true} value={username} onChange={(e) => setUsername(e.target.value)} /><br />
        <label>Password*</label>
          <input type="text" required={true} value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="submit" value="Sign up!" />
      </form>
    </div>
  )
}

export default SignUp