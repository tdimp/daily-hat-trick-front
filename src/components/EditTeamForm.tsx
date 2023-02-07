import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { TeamInterface } from '../@types/TeamInterface';
import ErrorPage from './ErrorPage';

interface Props {
  team: TeamInterface;
  handleUpdate: (arg: TeamInterface) => void | undefined;
}

const EditTeamForm = ({team, handleUpdate}: Props) => {

  const { user } = useContext(UserContext);

  const [teamName, setTeamName] = useState('');
  const [errors, setErrors] = useState('');

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newTeamName = teamName;

    const response = await fetch(`/teams/${team.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...team, name: newTeamName}),
    });

    const data = await response.json();
    if (response.ok) {
      handleUpdate(data);
      setTeamName('');
    } else {
      setErrors(data.error)
    }
  }

  if(!user) {
    return <h3 className='need-auth'>You must be logged in to view this page.</h3>
  }

  if(errors) {
    return <ErrorPage message={errors} />
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>Enter New Team Name<br />
          <input type='text' required={true} value={teamName} onChange={(e) => setTeamName(e.target.value)} />
        </label>
        <input type='submit' value='Update Team' />
      </form>
    </div>
  )
}

export default EditTeamForm