import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { TeamInterface } from '../@types/TeamInterface';
import { Navigate } from 'react-router-dom';

// Needs User from UserContext for user-team association

interface Props {
  handleCreate: (arg: TeamInterface) => void | undefined;
}

const NewTeamForm = ({ handleCreate}: Props) => {
  const userContext = useContext(UserContext);
  const [teamName, setTeamName] = useState('');

  const navigate = useNavigate();

  // POST to teams#create
  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const teamData = {
      name: teamName,
      user_id: userContext.user?.userId,
    }

    const response = await fetch('/teams', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(teamData),
    });

    const data = await response.json();
    if (response.ok) {
      handleCreate(data);
      alert('Team created!');
      //navigate('/teams');
    } else {
      console.log(data);
      alert(data.error);
    }
    setTeamName('');
  }

  if(!userContext.user) {
    return <h3 className='need-auth'>You must be logged in to view this page.</h3>
  }

  return (
    <div>
      <form onSubmit = {onSubmit}>
        <label>Create New Team<br />
          <input type='text' required={true} value={teamName} onChange={(e) => setTeamName(e.target.value)} />
        </label>
        <input type='submit' value='Create Team' />
      </form>
    </div>
  )
}

export default NewTeamForm