import React, { useEffect, useState, useContext} from 'react';
import { useParams } from 'react-router-dom';
import { PlayerInterface } from '../@types/PlayerInterface';
import { UserContext } from '../context/UserContext';
import {AddPlayer} from './AddPlayer';
import ErrorPage from './ErrorPage';
import PlayerCard from './PlayerCard';


const Player = () => {

  const { user } = useContext(UserContext);

  const [player, setPlayer] = useState<PlayerInterface>({} as PlayerInterface);
  const [trigger, setTrigger] = useState(false);
  const [errors, setErrors] = useState('');

  const { id } = useParams();

  useEffect(() => {
    fetch(`/players/${id}`)
    .then((res) => {
      if (res.ok) {
        res.json()
        .then(data => setPlayer(data))
      } else {
        setErrors(res.statusText)
      }
    })
  }, [id]);

  const handleTrigger = () => {
    setTrigger(!trigger);
  }

  if (!errors && player) {
    return (
      <div>
        <div>
          <h1>{player.full_name}, {player.position}, {player.nhl_team?.name} #{player.jersey_number}</h1>
          { user && !trigger ? <button className='btn btn-primary btn-sm' onClick={handleTrigger}>Add Player</button> : "" }
          <AddPlayer trigger={trigger} setTrigger={setTrigger} />
        </div>
        <PlayerCard player={player} />
      </div>  
    )
  } else {
    return (
      <ErrorPage message={errors} />
    )
  }
}

export default Player