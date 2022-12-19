import React, { useState } from 'react'

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      alert("Logged in!")
    } else {
      alert(data.error.login)
    }
    setEmail("");
    setPassword("");
  }

  return (
    <div>
      <form onSubmit={handleUserLogin}>
        <label>Email*</label>
        <input type="text" required={true} value={email} onChange={(e) => setEmail(e.target.value)} /><br />
        <label>Password*</label>
        <input type="text" required={true} value={password} onChange={(e) => setPassword(e.target.value)} /><br />
        <input type="submit" value="Login!" />
      </form>
    </div>
  )
}

export default Login