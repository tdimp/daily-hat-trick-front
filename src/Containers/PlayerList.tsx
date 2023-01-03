import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PlayerInterface } from '../@types/Player';
import Player from '../components/Player';
import Team from './Team';

const PlayerList = () => {

  const [players, setPlayers] = useState<PlayerInterface[]>([]);
  const { page } = useParams();
  // Fetch to players#index on backend...

  useEffect(() => {
    fetch(`/players/page/${page}`)
    .then(res => res.json())
    .then(data => setPlayers(data))
    .catch(error => alert(error))
  }, [])

  console.log(players)
  
  return (
    <div>
      {players.map((player) => 
          <Player key={player.id} id={player.id} name={player.name} position={player.position} nhl_team={player.nhl_team} jersey_number={player.jersey_number} />
        )
      }
      
    </div>
  )
}

export default PlayerList