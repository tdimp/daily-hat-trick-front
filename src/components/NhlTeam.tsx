import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { NhlTeamInterface } from '../@types/NhlTeamInterface';
import { PlayerInterface } from '../@types/PlayerInterface';
import PlayerCard from './PlayerCard';

const NhlTeam = () => {

  const { id } = useParams();

  const [team, setTeam] = useState<NhlTeamInterface | null>({} as NhlTeamInterface);

  useEffect(() => {
    fetch(`/nhl_teams/${id}`)
    .then((res) => {
      if (res.ok) {
        res.json()
        .then(data => setTeam(data));
      } else {
        console.log(res.statusText);
      }
    });
  }, []);


  const players = team?.players ? team.players : null;

  return (
    <div>
      <h1>{team?.name}</h1>
      <ul>
        {players?.map(player => <PlayerCard key={player.id} player={player}/>)}
      </ul>
    </div>
  )
}

export default NhlTeam