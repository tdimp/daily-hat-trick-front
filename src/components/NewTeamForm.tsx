import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { TeamInterface } from '../@types/TeamInterface';
import ErrorPage from './ErrorPage';

// Needs User from UserContext for user-team association

interface Props {
  handleCreate: (arg: TeamInterface) => void | undefined;
}

const NewTeamForm = ({ handleCreate}: Props) => {
  const { user } = useContext(UserContext);
  const [teamName, setTeamName] = useState('');
  const [errors, setErrors] = useState('');

  // POST to teams#create
  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const teamData = {
      name: teamName,
      user_id: user?.userId,
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
    } else {
      setErrors(data.error);
    }
    setTeamName('');
  }

  if (!user) {
    return <h3 className='need-auth'>You must be logged in to view this page.</h3>
  }

  if (errors) {
    return <ErrorPage message={errors} />
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>Create New Team<br />
          <input type='text' required={true} value={teamName} onChange={(e) => setTeamName(e.target.value)} />
        </label>
        <input className='button' type='submit' value='Create Team' />
      </form>
    </div>
  )
}

export default NewTeamForm