import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { NhlTeamInterface } from '../@types/NhlTeamInterface';
import ErrorPage from '../components/ErrorPage';

const NhlTeamList = () => {

  const [teams, setTeams] = useState<NhlTeamInterface[] | null>([] as NhlTeamInterface[]);
  const [errors, setErrors] = useState('');

  useEffect(() => {
    fetch('/nhl_teams')
    .then((res) => {
      if (res.ok) {
        res.json()
        .then(data => setTeams(data));
      } else {
        setErrors(res.statusText);
      }
  });
}, []);

if (errors) {
  return <ErrorPage message={errors} />
}

  return (
    <div>
      <ol>
        {teams?.map((team) => <Link key={team.name} to={`/nhlteams/${team.id}`}>{team.name}</Link>)}
      </ol>
    </div>
  )
}

export default NhlTeamList