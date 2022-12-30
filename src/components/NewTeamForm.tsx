import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { TeamInterface } from '../@types/Team';

// Needs User from UserContext for user-team association

const NewTeamForm = () => {
  const userContext = useContext(UserContext);
  const [teamName, setTeamName] = useState("");
  
  // POST to teams#create
  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const teamData = {
      name: teamName,
      user_id: userContext.user?.userId,
    }

    const response = await fetch("/teams", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(teamData),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Team created!")
      console.log(data);
    } else {
      console.log(data);
      alert(data.error);
    }
    setTeamName('');
  }

  return (
    <div>
      <form onSubmit = {onSubmit}>
        <label>Team Name <br />
          <input type="text" required={true} value={teamName} onChange={(e) => setTeamName(e.target.value)} />
        </label>
        <input type="submit" value="Create Team" />
      </form>
    </div>
  )
}

export default NewTeamForm