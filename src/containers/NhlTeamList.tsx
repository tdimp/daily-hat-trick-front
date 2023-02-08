import React, { useState, useEffect } from 'react'
import { NhlTeamInterface } from '../@types/NhlTeamInterface';
import ErrorPage from '../components/ErrorPage';
import NhlTeamCard from '../components/NhlTeamCard';

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
        {teams?.map((team) => <NhlTeamCard key={team.id} team={team} />)}
      </ol>
    </div>
  )
}

export default NhlTeamList