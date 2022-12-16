import React, { useState, useEffect } from 'react';
import './App.css';
import SignUp from './components/SignUp';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/hello")
      .then((r) => r.json())
      .then((data) => setCount(data.count));
  }, []);

  return (
    <div className="App">
      <h1>Page Count: {count}</h1>
      <SignUp />
    </div>
  );
}

export default App;
