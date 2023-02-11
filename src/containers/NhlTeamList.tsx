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

teams?.sort((a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
})

if (errors) {
  return <ErrorPage message={errors} />
}

  return (
    <div className='container'>
      <div className='row'>
        {teams?.map((team) => {
          return (
            <div className='col' key={team.id}>
              <NhlTeamCard key={team.id} team={team} />
            </div>
          )
          })}
      </div>
    </div>
  )
}

export default NhlTeamList