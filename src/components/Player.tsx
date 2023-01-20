import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { PlayerInterface } from '../@types/PlayerInterface';
import { UserContext } from '../context/UserContext';
import { TeamContext } from '../context/TeamContext';


const Player = () => {

  const [player, setPlayer] = useState<PlayerInterface>({} as PlayerInterface);

  const { id } = useParams();

  useEffect(() => {
    fetch(`/players/${id}`)
    .then((res) => {
      if (res.ok) {
        res.json()
        .then(data => setPlayer(data))
      } else {
        console.log(res)
      }
    })
  }, [id]);

  console.log(player)

  return (
    <div>
      <h1>{player.full_name}, {player.position}, {player.nhl_team?.name}</h1>
      {player.position !== 'G' ? 
      <h2>
      Goals per game: {player.skater_stat?.goals / player.skater_stat?.games} <br />
      Assists per game: {player.skater_stat?.assists / player.skater_stat?.games} <br />
      Points per game: {player.skater_stat?.points / player.skater_stat?.games} <br />
      Shots per game: {player.skater_stat?.shots / player.skater_stat?.games} <br />

      </h2>
       : <h2>
          Even strength save %: {player.goalie_stat?.even_strength_save_percentage} <br />
          Power play save %: {player.goalie_stat?.power_play_save_percentage} <br />
          Short-handed save %: {player.goalie_stat?.short_handed_save_percentage} <br />
        </h2>}
      
    </div>  
  )
}

export default Player