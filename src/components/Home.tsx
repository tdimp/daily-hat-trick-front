import React, { useState, useEffect } from 'react';
import NhlTeamCard from './NhlTeamCard';
import ErrorPage from './ErrorPage';
import { off } from 'process';

const Home = () => {
  const [games, setGames] = useState([]);
  const [errors, setErrors] = useState('');

  const date = new Date()

  const offseason = () => {
    if (date.getMonth() > 6 && date.getMonth() < 10) {
      if (date.getDate() < 10) {
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    fetch('https://api-web.nhle.com/v1/schedule/now')
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
      : <ErrorPage message={offseason() ? "The 2023-24 NHL season begins October 10th!" : "Today's matchups are currently unavailable. Try again later."} />} 
    </div>
  )
}

export default Home