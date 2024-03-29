import React, { useState, useContext, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { TeamContext } from '../context/TeamContext';
import ErrorPage from './ErrorPage';

interface PopupProps {
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>
}

export const AddPlayer = ({trigger, setTrigger}: PopupProps) => {

  const { teams } = useContext(TeamContext);
  const { id } = useParams();

  const [selectValue, setSelectValue] = useState(0);
  const [errors, setErrors] = useState('');

  useEffect(() => {
    if (teams) {
      setSelectValue(teams[0].id);
    }
  }, [teams])

  async function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    const addedId = id ? parseInt(id) : null;

    const response = await fetch(`/teams/${selectValue}/add_player`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ addedId })
    });

    await response.json();
    if (response.ok) {
      setErrors(`Player added!`);
      setTimeout(() => setErrors(''), 2000);
    } else {
      setErrors(response.statusText);
    }
  }

  const handleSelectChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const target = e.target as HTMLButtonElement;
    setSelectValue(parseInt(target.value));
  }

  if (errors) {
    return <ErrorPage message={errors} />
  }

  return trigger ? (
    <div>
      <div> 
        { teams?.length ? 
        <form onSubmit={onSubmit}>
          <label>Select Team</label>
          <select value={selectValue} onChange={handleSelectChange}>
            {teams?.map((team) => (
              <option key={team.id} value={team.id}>{team.name}</option>
            ))}
          </select>
          <input className='btn btn-primary btn-sm' type="submit" value="Add Player" />
        </form> : 
        <h3>You don't have any teams!</h3>
       }
        <button className='btn btn-primary btn-sm' onClick={() => setTrigger(!trigger)}>Cancel</button>
      </div>
    </div>
  ) : <></>;

}