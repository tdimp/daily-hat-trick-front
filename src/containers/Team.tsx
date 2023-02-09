import React, { useState, useEffect, useContext, MouseEvent } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { PlayerInterface } from '../@types/PlayerInterface';
import { TeamContext } from '../context/TeamContext';
import EditTeamForm from '../components/EditTeamForm';
import { TeamInterface } from '../@types/TeamInterface';
import ErrorPage from '../components/ErrorPage';
import { UserContext } from '../context/UserContext';


const Team = () => {
  const { teams, setTeams } = useContext(TeamContext);
  const { user } = useContext(UserContext);
  const { id } = useParams<{id: string}>();

  const [team, setTeam] = useState<TeamInterface>({} as TeamInterface);
  const [players, setPlayers] = useState<PlayerInterface[]>([]);
  const [errors, setErrors] = useState('');
  const [showEditForm, setShowEditForm] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const navigate = useNavigate();

  const tableColumns = ['Name', 'G', 'A', 'PPP', 'PIM', 'Hits', 'W', 'GAA', 'SV%', 'SO', 'TOI'];
  
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
        setErrors(res.statusText);
       }
      })
  }, [id]);

  const handleDeleteTeam = () => {
    if (id && teams) {
      const deletedId = parseInt(id);
      const newTeams = teams.filter((t) => t.id !== deletedId);
      fetch(`/teams/${id}`, {
        method: 'DELETE'
      });
      setTeams(newTeams);
    }
    navigate('/teams')
  }

  const handleUpdate = (newTeam: TeamInterface) => {
    setTeam(newTeam);
    setShowEditForm(false);
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
      setErrors(data.error);
    } 
  }

  if (errors) {
    return <ErrorPage message={errors} />
  }

  if (user && team) {
    const activePlayers = players?.filter((player) => player.goalie_stat || player.skater_stat);
    const inactivePlayers = players?.filter((player) => !player.goalie_stat && !player.skater_stat);
    const skaters = activePlayers?.filter((player) => player.position !== 'G').sort((a) => a.position === 'D' ? 1 : 0);
    const goalies = activePlayers?.filter((player) => player.position === 'G').sort((a, b) => a.jersey_number - b.jersey_number);

  if (!players.length) {
    return (
      <div>
        <p className='notification'>This team does not have any players!</p>
        <Link to='/players/page/1'>View Players</Link>
      </div>
    )
  }
    return (
      <div className='container'>
        <div className='table-container'>
        <div className='team-header'>
          <h1>{team?.name}</h1>
          <button className='button' onClick={() => setShowEditForm(!showEditForm)}>{showEditForm ? 'Cancel' : 'Edit Team Name'}</button>          
          {team && showEditForm ? <EditTeamForm team={team} handleUpdate={handleUpdate}></EditTeamForm> : ''}

          {!confirmDelete ? <button className='delete-button' onClick={() => setConfirmDelete(true)}>Delete Team</button>
        : 
        <div className='confirm-delete'>
        <p>Are you sure?</p>
          <button className='button' onClick={() => setConfirmDelete(false)}>Cancel</button> <button className='button-red' onClick={handleDeleteTeam}>Delete</button>
        </div> }
        </div>
        
        <table className='table'>
          <thead>
            <tr>
              {tableColumns.map((column) => <th key={column}>{column}</th>)}
            </tr>
          </thead>
          <tbody>
          {skaters?.map((skater) => {
            return (
              <tr key={skater.id}>
                <td onClick={() => navigate(`/players/${skater.id}`)}>{skater.full_name}, {skater.position}, #{skater.jersey_number}</td>
                <td>{skater.skater_stat.goals}</td>
                <td>{skater.skater_stat.assists}</td>
                <td>{skater.skater_stat.power_play_points}</td>
                <td>{skater.skater_stat.pim}</td>
                <td>{skater.skater_stat.hits}</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>{skater.skater_stat.time_on_ice_per_game}</td>
                <td><button className='button-red' value={skater.id} onClick={handleDrop}>Drop</button></td>
              </tr>
            )
          })}
          <tr></tr>
          {goalies?.map((goalie) => {
          return (
            <tr key={goalie.id}>
              <td onClick={() => {navigate(`/players/${goalie.id}`)}}>{goalie.full_name}, {goalie.position}, #{goalie.jersey_number}</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>{goalie.goalie_stat.wins}</td>
              <td>{goalie.goalie_stat.goals_against_average.toFixed(2)}</td>
              <td>{goalie.goalie_stat.save_percentage.toFixed(3)}</td>
              <td>{goalie.goalie_stat.shutouts}</td>
              <td>{goalie.goalie_stat.time_on_ice}</td>
              <td><button className='button-red' value={goalie.id} onClick={handleDrop}>Drop</button></td>
            </tr>
          )
        })}
        <tr></tr>
        {inactivePlayers?.map((player) => {
          return (
            <tr key={player.id}>
              <td onClick={() => navigate(`/players/${player.id}`)}>{player.full_name}, {player.position}, #{player.jersey_number}</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td><button className='button-red' value={player.id} onClick={handleDrop}>Drop</button></td>
            </tr>
          )
        })}
          </tbody>
        </table>
      </div>
      </div>
    )
  } else {
    return <ErrorPage message={errors} />
  }
}


export default Team