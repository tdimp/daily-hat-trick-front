import React, { useState, useEffect } from 'react';
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
      <h1>Today's Games</h1>
      
      {games.map((game: any) => {
        const awayTeam = game.teams.away.team
        const homeTeam = game.teams.home.team

        return (
          <div className='container my-5' key={game.id}>
            <div className='row align-items-center'>
              <div className='col-md align-items-center'>
                <NhlTeamCard key={awayTeam.name} team={awayTeam} />
              </div>
              <div className='col align-self-center text-center'><h1>@</h1></div>
              <div className='col-md align-items-center'>
                <NhlTeamCard key={homeTeam.name} team={homeTeam} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Home