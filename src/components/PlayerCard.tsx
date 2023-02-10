import React from 'react'
import { PlayerPropsInterface } from '../@types/PropsInterface'

const PlayerCard = ({player}: PlayerPropsInterface) => {

  if (player.position !== 'G' && player.skater_stat) {
    const simpleColumns = ['GP', 'G', 'A', 'P', 'PPP', 'SOG', 'GWG', 'SHG', 'BLK', 'HITS', '+/-', 'F/O%', 'SH%', 'TOI'];
    const perGameColumns = ['GP', 'G', 'A', 'P', 'PPP', 'SOG', 'GWG', 'SHG', 'BLK', 'HITS', 'ES TOI', 'SH TOI', 'PP TOI', 'TOI'];
    const gamesPlayed = player.skater_stat.games;

    return (
      <div className='skater-card'>
        <div className='simple-stats'>
          <table className='table'>
            <thead>
              <tr>
                {simpleColumns.map((column) => <th key={column}>{column}</th>)}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{player.skater_stat.games}</td>
                <td>{player.skater_stat.goals}</td>
                <td>{player.skater_stat.assists}</td>
                <td>{player.skater_stat.points}</td>
                <td>{player.skater_stat.power_play_points}</td>
                <td>{player.skater_stat.shots}</td>
                <td>{player.skater_stat.game_winning_goals}</td>
                <td>{player.skater_stat.short_handed_goals}</td>
                <td>{player.skater_stat.blocked}</td>
                <td>{player.skater_stat.hits}</td>
                <td>{player.skater_stat.plus_minus}</td>
                <td>{player.skater_stat.faceoff_pct}</td>
                <td>{player.skater_stat.shot_pct}</td>
                <td>{player.skater_stat.time_on_ice}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='advanced-stats'>
          <p>Per Game Stats</p>
          <table className='table'>
            <thead>
              <tr>
              {perGameColumns.map((column) => <th key={column}>{column}</th>)}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{player.skater_stat.games}</td>
                <td>{(player.skater_stat.goals / gamesPlayed).toFixed(2)}</td>
                <td>{(player.skater_stat.assists / gamesPlayed).toFixed(2)}</td>
                <td>{(player.skater_stat.points / gamesPlayed).toFixed(2)}</td>
                <td>{(player.skater_stat.power_play_points / gamesPlayed).toFixed(2)}</td>
                <td>{(player.skater_stat.shots / gamesPlayed).toFixed(2)}</td>
                <td>{(player.skater_stat.game_winning_goals / gamesPlayed).toFixed(2)}</td>
                <td>{(player.skater_stat.short_handed_goals / gamesPlayed).toFixed(2)}</td>
                <td>{(player.skater_stat.blocked / gamesPlayed).toFixed(2)}</td>
                <td>{(player.skater_stat.hits / gamesPlayed).toFixed(2)}</td>
                <td>{player.skater_stat.even_time_on_ice_per_game}</td>
                <td>{player.skater_stat.short_handed_time_on_ice_per_game}</td>
                <td>{player.skater_stat.power_play_time_on_ice_per_game}</td>
                <td>{player.skater_stat.time_on_ice_per_game}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  } else if (player.position === 'G' && player.goalie_stat) {
    const simpleColumns = ['Starts', 'Wins', 'OT L', 'SO', 'SV%', 'GAA', 'TOI'];
    const advancedColumns = ['Games', 'Losses', 'SA', 'GA', 'Saves', 'Even SV%', 'PP SV%', 'SH SV%'];
    
    return (
      <div className='goalie-card'>
        <div>
          <table>
            <thead>
              <tr>
                {simpleColumns.map((column) => <th key={column}>{column}</th>)}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{player.goalie_stat.games_started}</td>
                <td>{player.goalie_stat.wins}</td>
                <td>{player.goalie_stat.ot}</td>
                <td>{player.goalie_stat.shutouts}</td>
                <td>{player.goalie_stat.save_percentage.toFixed(3)}</td>
                <td>{player.goalie_stat.goals_against_average.toFixed(2)}</td>
                <td>{player.goalie_stat.time_on_ice}</td>
              </tr>
            </tbody>
          </table>
          <p>Advanced Stats</p>
          <table>
            <thead>
              <tr>
                {advancedColumns.map((column) => <th key={column}>{column}</th>)}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{player.goalie_stat.games}</td>
                <td>{player.goalie_stat.losses}</td>
                <td>{player.goalie_stat.shots_against}</td>
                <td>{player.goalie_stat.goals_against}</td>
                <td>{player.goalie_stat.saves}</td>
                <td>{(player.goalie_stat.even_strength_save_percentage / 100).toFixed(3)}</td>
                <td>{(player.goalie_stat.power_play_save_percentage / 100).toFixed(3)}</td>
                <td>{(player.goalie_stat.short_handed_save_percentage / 100).toFixed(3)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  } else {
    return (
      <div className='no-stats'>
        <p>Player does not have any stats for this season.</p>
      </div>
    )
  }
}

export default PlayerCard