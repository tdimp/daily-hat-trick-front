import React, { useState, useEffect } from 'react';
import { TeamInterface } from '../@types/TeamInterface';
import NhlTeamCard from './NhlTeamCard';

const Home = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch('https://statsapi.web.nhl.com/api/v1/schedule')
    .then(res => res.json())
    .then(data => setGames(data.dates[0].games))
  }, [])

  

  return (
    <div className='container'>
      {games.map((game: any) => {
        const awayTeam = game.teams.away.team
        const homeTeam = game.teams.home.team

        return (
          <div key={game.id}>
            <NhlTeamCard key={awayTeam.name} team={awayTeam} />            
            <h1>@</h1>
            <NhlTeamCard key={homeTeam.name} team={homeTeam} />
          </div>
        )
      })}
    </div>
  )
}

export default Home