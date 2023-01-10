import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PlayerInterface } from '../@types/Player';
import Player from '../components/Player';
import Team from './Team';

const PlayerList = () => {

  const [players, setPlayers] = useState<PlayerInterface[]>([]);
  const { page }: any = useParams();
  const navigate = useNavigate();
  const pageNumber: number = parseInt(page);

  // Fetch to players#index on backend...

  useEffect(() => {
    fetch(`/players/page/${page}`)
    .then(res => res.json())
    .then(data => setPlayers(data))
    .catch(error => alert(error))
  }, [page])

  console.log(players)

  const handleNextPageClick = () => {
    navigate(`/players/page/${ pageNumber + 1}`)
  }

  const handlePreviousPageClick = () => {
    navigate(`/players/page/${ pageNumber - 1}`)
  }

  const renderPageButtons = () => {
    if (pageNumber === 1) {
      return <button onClick={handleNextPageClick}>Next Page</button>
    }
    else if (pageNumber >= 33) {
      return (
        <button onClick={handlePreviousPageClick}>Previous Page</button>
      )
    } else {
      return (
        <>
          <button onClick={handlePreviousPageClick}>Previous Page</button>
          <button onClick={handleNextPageClick}>Next Page</button>
        </>
      )
      
    }
  }
  
  return (
    <>
    {renderPageButtons()}
      <div>
        {players.map((player) => 
          <Player key={player.id} id={player.id} full_name={player.full_name} position={player.position} nhl_team={player.nhl_team} jersey_number={player.jersey_number} skater_stats={player.skater_stats} goalie_stats={player.goalie_stats} />
        )
        }
      </div>
    </>
  )
}

export default PlayerList