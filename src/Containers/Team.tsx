import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Player from '../components/Player';
import { PlayerInterface } from '../@types/Player';
import { SkaterStatsInterface, GoalieStatsInterface } from '../@types/Stats';



const Team = () => {

  const [team, setTeam] = useState([]);
  const { id } = useParams();

  const tableRows = ['', 'Name', 'G', 'A', 'PIM', 'PPP', 'W', 'GAA', 'SV%', 'SO', 'TOI'];

  // Fetch to teams#show on backend...
  useEffect(() => {
    fetch(`/teams/${id}`)
      .then(res => res.json())
      .then(data => setTeam(data))
      .catch(error => alert(error))
  }, []);

  
  
  const handleDrop = (e: React.SyntheticEvent) => {
    console.log(e.target)
    //let filteredTeam = team.filter((player: PlayerInterface) => player.id !== button.value)

    //fetch(`teams/${id}`, {
    //  method: 'PATCH',
    //  headers: {
    //    'Content-Type': 'application/json',
    //  },
    //  body: JSON.stringify(filteredTeam)
    //}) 
    //.then((res) => res.json())
    //.then(data => alert(data))//https://blog.logrocket.com/creating-react-sortable-table/#creating-the-table-markup-in-react
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
              <td><button onClick={handleDrop}>Drop</button></td>
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
            </tr>
          ))}
        </tbody>
        <tbody>

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