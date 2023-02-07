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
          <h1>{player.full_name}, {player.position}, {player.nhl_team?.name}</h1>
          { user && !trigger ? <button className='button' onClick={handleTrigger}>Add Player</button> : "" }
          <AddPlayer trigger={trigger} setTrigger={setTrigger} />
        </div>
        <PlayerCard player={player} />
        {player.position !== 'G' ? 
        <p>
          Goals per game: {player.skater_stat?.goals / player.skater_stat?.games} <br />
          Assists per game: {player.skater_stat?.assists / player.skater_stat?.games} <br />
          Points per game: {player.skater_stat?.points / player.skater_stat?.games} <br />
          Shots per game: {player.skater_stat?.shots / player.skater_stat?.games} <br />
        </p>
         : 
        <p>
          Even strength save %: {player.goalie_stat?.even_strength_save_percentage / 100.0} <br />
          Power play save %: {player.goalie_stat?.power_play_save_percentage / 100.0} <br />
          Short-handed save %: {player.goalie_stat?.short_handed_save_percentage / 100.0} <br />
        </p>}
      </div>  
    )
  } else {
    return (
      <ErrorPage message={errors} />
    )
  }
}

export default Player