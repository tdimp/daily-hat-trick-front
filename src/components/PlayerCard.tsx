import React from 'react'
import { PlayerPropsInterface } from '../@types/PropsInterface'

const PlayerCard = ({player}: PlayerPropsInterface) => {

  if (player.position !== 'G' && player.skater_stat) {
    return (
      <div className='skater-card'>
        <h4><span>{player.full_name}, #{player.jersey_number}, {player.position}</span></h4>
        <h4><span>G: {player.skater_stat?.goals}, A: {player.skater_stat?.assists} ...</span></h4>
      </div>
    )
  } else if (player.position === 'G' && player.goalie_stat) {
    return (
      <div className='goalie-card'>
        <h4><span>{player.full_name}, #{player.jersey_number}, {player.position}</span></h4>
        <h4><span>W: {player.goalie_stat?.wins} SV%: {player.goalie_stat?.save_percentage}, GAA: {player.goalie_stat?.goals_against_average}</span></h4>
      </div>
    )
  } else {
    return (
      <div className='no-stats'>
        <h4><span>{player.full_name}, #{player.jersey_number}, {player.position}</span></h4>
        <h4>Player does not have any stats for this season.</h4>
      </div>
    )
  }
}

export default PlayerCard