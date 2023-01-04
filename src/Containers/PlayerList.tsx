import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PlayerInterface } from '../@types/Player';
import Player from '../components/Player';
import Team from './Team';

const PlayerList = () => {

  const [players, setPlayers] = useState<PlayerInterface[]>([]);
  const { page }: any = useParams();
  const navigate = useNavigate();

  // Fetch to players#index on backend...

  useEffect(() => {
    fetch(`/players/page/${page}`)
    .then(res => res.json())
    .then(data => setPlayers(data))
    .catch(error => alert(error))
  }, [page])

  const handleNextPageClick = () => {
    navigate(`/players/page/${ parseInt(page) + 1}`)
  }

  const handlePreviousPageClick = () => {
    navigate(`/players/page/${ parseInt(page) - 1}`)
  }
  
  return (
    <>
      
      <button onClick={handlePreviousPageClick}>Previous Page</button>
      <button onClick={handleNextPageClick}>Next Page</button>
      <div>
        {players.map((player) => 
          <Player key={player.id} id={player.id} name={player.name} position={player.position} nhl_team={player.nhl_team} jersey_number={player.jersey_number} />
        )
        }
      </div>
    </>
  )
}

export default PlayerList