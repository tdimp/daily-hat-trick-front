import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { NhlTeamInterface } from '../@types/NhlTeamInterface';

const NhlTeamList = () => {

  const [teams, setTeams] = useState<NhlTeamInterface[] | null>([] as NhlTeamInterface[]);

  useEffect(() => {
    fetch('/nhl_teams')
    .then((res) => {
      if (res.ok) {
        res.json()
        .then(data => setTeams(data));
      } else {
        console.log(res.statusText);
      }
  });
}, []);

  return (
    <div>
      <ol>
        {teams?.map((team) => <Link key={team.name} to={`/nhlteams/${team.id}`}>{team.name}</Link>)}
      </ol>
    </div>
  )
}

export default NhlTeamList