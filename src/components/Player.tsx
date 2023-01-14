import React from 'react';
import { PlayerInterface } from '../@types/PlayerInterface';
import { stat } from 'fs';
import { SkaterStatsInterface } from '../@types/StatsInterface';
import PlayerList from '../Containers/PlayerList';



const Player = ({ full_name, nhl_team, jersey_number, position, skater_stats, goalie_stats }: PlayerInterface) => {
  console.log(goalie_stats.length ? goalie_stats : 'skater')

  return (
    <div>
      <h2>{full_name}, {nhl_team.name}, {position}</h2>
     
    </div>
  )
}

export default Player