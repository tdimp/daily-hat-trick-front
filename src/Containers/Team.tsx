import React, { useState, useEffect, MouseEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PlayerInterface } from '../@types/PlayerInterface';


const Team = () => {

  const [team, setTeam] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const tableRows = ['Name', 'G', 'A', 'PIM', 'PPP', 'W', 'GAA', 'SV%', 'SO', 'TOI'];

  // Fetch to teams#show on backend...
  useEffect(() => {
    fetch(`/teams/${id}`)
      .then(res => {
       if (res.ok) {
        res.json()
        .then(data => setTeam(data))
       } else {
        alert("Oops, something went wrong.")
        navigate('/')
       }
      })
  }, []);
  
  const handleDrop = async (e: MouseEvent<HTMLButtonElement>) => {
    const droppedId = parseInt(e.currentTarget.value);
    const filteredTeam = team.filter((player: PlayerInterface) => player.id !== droppedId)
    
    const response = await fetch(`/teams/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({droppedId})
    });

    const data = await response.json();
    if (response.ok) {
      alert(`Player dropped!`);
      setTeam(filteredTeam);
    } else {
      alert(data.error);
    } 
  }

  return (
    <div className='table'>
      <table>
        <thead>
          <tr>
            {tableRows.map((row) => <th key={row}>{row}</th>)}
          </tr>
        </thead>
        <tbody>
          {team.map((player: PlayerInterface) => (
            <tr key={player.id}>
              <td>{`${player.full_name}, ${player.position}`}</td>
              { player.position !== 'G' ? 
                <>
                  <td>{player.skater_stats[0].goals}</td>
                  <td>{player.skater_stats[0].assists}</td>
                  <td>{player.skater_stats[0].pim}</td>
                  <td>{player.skater_stats[0].power_play_points}</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>{player.skater_stats[0].time_on_ice_per_game}</td>
                </> 
                : 
                <>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>{player.goalie_stats[0].wins}</td>
                  <td>{player.goalie_stats[0].goals_against_average}</td>
                  <td>{player.goalie_stats[0].save_percentage}</td>
                  <td>{player.goalie_stats[0].shutouts}</td>
                  <td>{player.goalie_stats[0].time_on_ice}</td>
                </>
                }
              <td><button value={player.id} onClick={handleDrop}>Drop</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  /*
  return (
    <div>
      {team?.map((player: PlayerInterface) => {
        return (
          <Player key={player.id} id={player.id} full_name={player.full_name} position={player.position} jersey_number={player.jersey_number} nhl_team={player.nhl_team} skater_stats={player.skater_stats} goalie_stats={player.goalie_stats} />
        )
      })} 
    </div>
  )*/
}


export default Team