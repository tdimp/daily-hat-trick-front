import React, { useState, useEffect } from 'react';
import NhlTeamCard from './NhlTeamCard';
import ErrorPage from './ErrorPage';

const Home = () => {
  const [games, setGames] = useState([]);
  const [errors, setErrors] = useState('');

  useEffect(() => {
    fetch('https://statsapi.web.nhl.com/api/v1/schedule')
    .then(res => {
      if (res.ok) {
        res.json()
        .then(data => setGames(data.dates[0].games));
      } else {
        setErrors(res.statusText);
      };
  })}, []);

  if (errors) {
    return <ErrorPage message={errors} />
  }

  return (
    <div className='container'>
      <h1>Today's Games</h1>
      
      {games.length ? games.map((game: any) => {
        const awayTeam = game.teams.away.team
        const homeTeam = game.teams.home.team
        
        return (
          <div className='container my-5' key={game.gamePk}>
            <div className='row align-items-center'>
              <div className='col-md align-items-center'>
                <NhlTeamCard team={awayTeam} />
              </div>
              <div className='col align-self-center text-center'><h1>@</h1></div>
              <div className='col-md align-items-center'>
                <NhlTeamCard team={homeTeam} />
              </div>
            </div>
          </div>
        )
      })
      : <ErrorPage message={"Today's matchups are currently unavailable. Try again later."} />} 
    </div>
  )
}

export default Home