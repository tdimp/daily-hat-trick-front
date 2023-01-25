import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PlayerInterface } from '../@types/PlayerInterface';
import { UserContext } from '../context/UserContext';
import { TeamContext } from '../context/TeamContext';

const PlayerList = () => {

  const [players, setPlayers] = useState([]);
  const [query, setQuery] = useState("");
  const [showPageButtons, setShowPageButtons] = useState(true);

  const { page }: any = useParams();
  const pageNumber: number = parseInt(page);
  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  const { teams } = useContext(TeamContext);

  const tableColumns = ['Name', 'G', 'A', 'PPP', 'PIM', 'Hits', 'W', 'GAA', 'SV%', 'SO', 'TOI'];

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
  }, [page, query])

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

  const handleSearchChange = (e: React.FormEvent) => {
    const target = e.target as HTMLFormElement;
    setQuery(target.value);
    query ? setShowPageButtons(false) : setShowPageButtons(true);
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPageButtons(false);
    if (query) {
      fetch(`/players/search/${query}`)
      .then(res => {
        if (res.ok) {
          res.json()
          .then(data => setPlayers(data))
        } else {
          alert(res.statusText);
        }
      });
    }
  }
  
  return (
    <div className='table'>
      {showPageButtons ? renderPageButtons() : ''}
      <form onSubmit={handleSearchSubmit}>
        <label>Search</label>
        <input type="text" value={query} onChange={handleSearchChange}></input>
        <input type="submit" value="Submit" />
      </form>
      <table>
        <thead>
          <tr>
            {tableColumns.map((column) => <th key={column}>{column}</th>)}
          </tr>
        </thead>
        <tbody>
          {players.map((player: PlayerInterface) => (
            <tr key={player.id}>
              <td onClick={() => navigate(`/players/${player.id}`)}>{`${player.full_name}, ${player.position}`}</td>
              { player.position !== 'G' ? 
                <>
                  <td>{player.skater_stat?.goals}</td>
                  <td>{player.skater_stat?.assists}</td>
                  <td>{player.skater_stat?.power_play_points}</td>
                  <td>{player.skater_stat?.pim}</td>
                  <td>{player.skater_stat?.hits}</td>
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
                  <td>-</td>
                  <td>{player.goalie_stat?.wins}</td>
                  <td>{player.goalie_stat?.goals_against_average}</td>
                  <td>{player.goalie_stat?.save_percentage}</td>
                  <td>{player.goalie_stat?.shutouts}</td>
                  <td>{player.goalie_stat?.time_on_ice}</td>
                </>
                }
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PlayerList