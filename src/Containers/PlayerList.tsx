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

  const tableColumns = ['Name', 'G', 'A', 'PIM', 'PPP', 'W', 'GAA', 'SV%', 'SO', 'TOI'];

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
            {tableColumns.map((column) => <th key={column}>{column}</th>)}
          </tr>
        </thead>
        <tbody>
          {players.map((player: PlayerInterface) => (
            <>
            <tr key={player.id} onClick={() => navigate(`/players/${player.id}`)}>
              <td>{`${player.full_name}, ${player.position}`}</td>
              { player.position !== 'G' ? 
                <>
                  <td>{player.skater_stat?.goals}</td>
                  <td>{player.skater_stat?.assists}</td>
                  <td>{player.skater_stat?.pim}</td>
                  <td>{player.skater_stat?.power_play_points}</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>{player.skater_stat?.time_on_ice_per_game}</td>
                </> 
                : 
                <>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>{player.goalie_stat?.wins}</td>
                  <td>{player.goalie_stat?.goals_against_average}</td>
                  <td>{player.goalie_stat?.save_percentage}</td>
                  <td>{player.goalie_stat?.shutouts}</td>
                  <td>{player.goalie_stat?.time_on_ice}</td>
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