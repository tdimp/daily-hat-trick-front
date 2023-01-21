import React, { useState, useEffect, useContext, MouseEvent } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { PlayerInterface } from '../@types/PlayerInterface';
import { TeamContext } from '../context/TeamContext';
import EditTeamForm from '../components/EditTeamForm';
import { TeamInterface } from '../@types/TeamInterface';


const Team = () => {
  const { teams } = useContext(TeamContext);
  const { id } = useParams();

  const [team, setTeam] = useState<TeamInterface>({} as TeamInterface);
  const [players, setPlayers] = useState<PlayerInterface[]>([]);

  const navigate = useNavigate();

  const tableColumns = ['Name', 'G', 'A', 'PIM', 'PPP', 'W', 'GAA', 'SV%', 'SO', 'TOI'];
  
  // Fetch to teams#show on backend...
  useEffect(() => {
    fetch(`/teams/${id}`)
      .then(res => {
       if (res.ok) {
        res.json()
        .then(data => {
          setTeam(data);
          setPlayers(data.players);
        })
       } else {
        alert("Oops, something went wrong.")
        navigate('/')
       }
      })
  }, [team]);

  console.log(team)

  const handleDeleteTeam = () => {
    fetch(`/teams/${id}`, {
      method: 'DELETE'
    });
    alert('Team deleted')
    navigate('/teams')
  }

  const handleUpdate = (newTeam: TeamInterface) => {
    setTeam(newTeam);
  }
  
  const handleDrop = async (e: MouseEvent<HTMLButtonElement>) => {
    const droppedId = parseInt(e.currentTarget.value);
    const filteredPlayers = players.filter((player: PlayerInterface) => player.id !== droppedId)
    
    const response = await fetch(`/teams/${id}/drop_player`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({droppedId})
    });

    const data = await response.json();
    if (response.ok) {
      alert(`Player dropped!`);
      setPlayers(filteredPlayers);
    } else {
      alert(data.error);
    } 
  }

  if (!players.length) {
    return (
      <div>
        <h1>{team?.name}</h1>
        <button onClick={handleDeleteTeam}>Delete Team</button>
        <h1>Add Players</h1>
        <Link to='/players/page/1'>View Players</Link>
      </div>
    )
  }

  return (
    <div className='table'>
      <div>
        <h1>{team?.name}</h1>
        
        {team ? <EditTeamForm team={team} handleUpdate={handleUpdate}></EditTeamForm> : <></>}

        <button>Edit Team Name</button>
        <button onClick={handleDeleteTeam}>Delete Team</button>
      </div>
      
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
                  <td>{player.skater_stat.goals}</td>
                  <td>{player.skater_stat.assists}</td>
                  <td>{player.skater_stat.pim}</td>
                  <td>{player.skater_stat.power_play_points}</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>{player.skater_stat.time_on_ice_per_game}</td>
                </> 
                : 
                <>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>{player.goalie_stat.wins}</td>
                  <td>{player.goalie_stat.goals_against_average}</td>
                  <td>{player.goalie_stat.save_percentage}</td>
                  <td>{player.goalie_stat.shutouts}</td>
                  <td>{player.goalie_stat.time_on_ice}</td>
                </>
                }
              <td><button value={player.id} onClick={handleDrop}>Drop</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


export default Team