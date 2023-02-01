import React, { useState, useContext} from 'react';
import { useParams } from 'react-router-dom';
import { PopupProps } from '../@types/PropsInterface';
import { TeamContext } from '../context/TeamContext';

export const AddPlayer = ({trigger, setTrigger}: PopupProps) => {

  const { teams } = useContext(TeamContext);
  const { id } = useParams();

  const [selectValue, setSelectValue] = useState(teams && teams.length ? teams[0].id : undefined);

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const addedId = id ? parseInt(id) : null
    
    const response = await fetch(`/teams/${selectValue}/add_player`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({addedId})
    });

    const data = await response.json();
    if (response.ok) {
      alert("Player added!")
    } else {
      console.log(response)
    }
  }

  const handleSelectChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const target = e.target as HTMLButtonElement;
    setSelectValue(parseInt(target.value));
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
          <input type="submit" value="Add Player" />
        </form> : 
        <h3>You don't have any teams!</h3>
       }
        <button onClick={() => setTrigger(!trigger)}>Cancel</button>
      </div>
    </div>
  ) : <></>;

}