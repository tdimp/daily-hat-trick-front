import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PlayerInterface } from '../@types/PlayerInterface';
import { UserContext } from '../context/UserContext';

const PlayerList = () => {

  const [players, setPlayers] = useState([]);

  const { page }: any = useParams();
  const pageNumber: number = parseInt(page);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const tableRows = ['Name', 'G', 'A', 'PIM', 'PPP', 'W', 'GAA', 'SV%', 'SO', 'TOI'];

  useEffect(() => {
    fetch(`/players/page/${page}`)
    .then(res => {
      if (res.ok) {
        res.json()
        .then(data => {
          setPlayers(data);
        })
      } else {
        alert('Oops, something went wrong.');
        navigate('/');
      }
    });
  }, [page])

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
    <div className='table'>
      {renderPageButtons()}
      <table>
        <thead>
          <tr>
            {tableRows.map((row) => <th key={row}>{row}</th>)}
          </tr>
        </thead>
        <tbody>
          {players.map((player: PlayerInterface) => (
            <>
            <tr key={player.id}>
              <td>{`${player.full_name}, ${player.position}`}</td>
              { player.position !== 'G' ? 
                <>
                  <td>{player.skater_stats[0]?.goals}</td>
                  <td>{player.skater_stats[0]?.assists}</td>
                  <td>{player.skater_stats[0]?.pim}</td>
                  <td>{player.skater_stats[0]?.power_play_points}</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>{player.skater_stats[0]?.time_on_ice_per_game}</td>
                </> 
                : 
                <>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>{player.goalie_stats[0]?.wins}</td>
                  <td>{player.goalie_stats[0]?.goals_against_average}</td>
                  <td>{player.goalie_stats[0]?.save_percentage}</td>
                  <td>{player.goalie_stats[0]?.shutouts}</td>
                  <td>{player.goalie_stats[0]?.time_on_ice}</td>
                </>
                }
                { user ? <td><button value={player.id}>Add</button></td> : null }
            </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PlayerList