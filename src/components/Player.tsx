import React from 'react';
import { PlayerInterface } from '../@types/Player';
import { stat } from 'fs';
import { SkaterStatsInterface } from '../@types/Stats';



const Player = ({ full_name, nhl_team, jersey_number, position, skater_stats, goalie_stats }: PlayerInterface) => {
  

  // Fetch to players#show? Or pass players via props...
  return (
    <div>
      <h2>{full_name}, {nhl_team.name}, {position}</h2>
    </div>
  )
}

export default Player