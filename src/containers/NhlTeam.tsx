import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NhlTeamInterface } from '../@types/NhlTeamInterface';
import ErrorPage from '../components/ErrorPage';

const NhlTeam = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [team, setTeam] = useState<NhlTeamInterface | null>({} as NhlTeamInterface);
  const [errors, setErrors] = useState('');

  const tableColumns = ['Name', 'G', 'A', 'PPP', 'PIM', 'Hits', 'W', 'GAA', 'SV%', 'SO', 'TOI'];

  useEffect(() => {
    fetch(`/nhl_teams/${id}`)
    .then((res) => {
      if (res.ok) {
        res.json()
        .then(data => setTeam(data));
      } else {
        setErrors(res.statusText);
      }
    });
  }, [id]);

  

  const players = team?.players ? team.players : null;
  const activePlayers = players?.filter((player) => player.goalie_stat || player.skater_stat);
  const inactivePlayers = players?.filter((player) => !player.goalie_stat && !player.skater_stat);
  const skaters = activePlayers?.filter((player) => player.position !== 'G').sort((a, b) => a.jersey_number - b.jersey_number);
  const goalies = activePlayers?.filter((player) => player.position === 'G').sort((a, b) => a.jersey_number - b.jersey_number);

  if (errors) {
    return <ErrorPage message={errors} />
  }

  return (
    <div className='table-container'>
      <h1>{team?.name}</h1>
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
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  )
}

export default NhlTeam