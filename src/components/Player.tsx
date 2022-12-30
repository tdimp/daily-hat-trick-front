import React from 'react';
import { PlayerInterface } from '../@types/Player';



const Player = ({ name, nhl_team, jersey_number, position }: PlayerInterface) => {

  // Fetch to players#show? Or pass players via props...
  return (
    <div>
      <h2>{name}, {nhl_team.name}</h2>
      <h3>Position: {position}</h3>
      <h3>#{jersey_number}</h3>
      <h3>{}</h3>
    </div>
  )
}

export default Player