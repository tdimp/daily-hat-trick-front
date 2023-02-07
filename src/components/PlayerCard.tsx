import React from 'react'
import { PlayerPropsInterface } from '../@types/PropsInterface'

const PlayerCard = ({player}: PlayerPropsInterface) => {

  if (player.position !== 'G' && player.skater_stat) {
    return (
      <div className='skater-card'>
        <p><span>{player.full_name}, #{player.jersey_number}, {player.position}</span></p>
        <p><span>G: {player.skater_stat?.goals}, A: {player.skater_stat?.assists} ...</span></p>
      </div>
    )
  } else if (player.position === 'G' && player.goalie_stat) {
    return (
      <div className='goalie-card'>
        <p><span>{player.full_name}, #{player.jersey_number}, {player.position}</span></p>
        <p><span>W: {player.goalie_stat?.wins} SV%: {player.goalie_stat?.save_percentage}, GAA: {player.goalie_stat?.goals_against_average}</span></p>
      </div>
    )
  } else {
    return (
      <div className='no-stats'>
        <p><span>{player.full_name}, #{player.jersey_number}, {player.position}</span></p>
        <p>Player does not have any stats for this season.</p>
      </div>
    )
  }
}

export default PlayerCard