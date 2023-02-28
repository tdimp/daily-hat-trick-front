import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PlayerInterface } from '../@types/PlayerInterface';
import ErrorPage from '../components/ErrorPage';

const PlayerList = () => {

  const [players, setPlayers] = useState([]);
  const [query, setQuery] = useState("");
  const [errors, setErrors] = useState('');

  const { page }: any = useParams();
  const pageNumber: number = parseInt(page);
  const navigate = useNavigate();

  const tableColumns = ['Name', 'G', 'A', 'PPP', 'PIM', 'Hits', 'W', 'GAA', 'SV%', 'SO', 'TOI'];

  useEffect(() => {
    fetch(`/players/all/${page}`)
    .then(res => {
      if (res.ok) {
        res.json()
        .then(data => {
          setPlayers(data);
        })
      } else {
        setErrors(res.statusText);
      }
    });
  }, [page, query])

  const handleNextPageClick = () => {
    if (pageNumber < 33) {
      navigate(`/players/all/${ pageNumber + 1}`)
    }
  }

  const handlePreviousPageClick = () => {
    if (pageNumber > 1) {
      navigate(`/players/all/${ pageNumber - 1}`)
    }
  }

  const handleSearchChange = (e: React.FormEvent) => {
    const target = e.target as HTMLFormElement;
    setQuery(target.value);
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query) {
      fetch(`/players/search/${query}`)
      .then(res => {
        if (res.ok) {
          res.json()
          .then(data => setPlayers(data))
        } else {
          setErrors(res.statusText);
        }
      });
    }
  }

  if (errors) {
    return <ErrorPage message={errors} />
  }
  
  return (
    <div className="container">
      <div className='table-header'>
        <div>
          <button className={pageNumber > 1 ? 'btn btn-primary btn-sm' : 'btn btn-outline-secondary btn-sm'} onClick={handlePreviousPageClick}>Previous Page</button>
          <button className={pageNumber < 33 ? 'btn btn-primary btn-sm' : 'btn btn-outline-secondary btn-sm'} onClick={handleNextPageClick}>Next Page</button>
        </div>
      <form onSubmit={handleSearchSubmit}>
        <label>Search</label>
        <input type="text" value={query} onChange={handleSearchChange}></input>
        <input className='btn btn-primary btn-sm' type="submit" value="Submit" />
      </form>
      <table className='table'>
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
    </div>
  )
}

export default PlayerList