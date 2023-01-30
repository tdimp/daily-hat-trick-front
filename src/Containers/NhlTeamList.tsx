import React, { useState, useEffect } from 'react'
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
        {teams?.map((team) => <li>{team.name}</li>)}
      </ol>
    </div>
  )
}

export default NhlTeamList