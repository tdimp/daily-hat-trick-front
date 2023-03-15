import React, { useState, useEffect } from 'react';

// NHL Team endpoint: `https://statsapi.web.nhl.com/api/v1/schedule?teamId=${player.nhl_team.id}&startDate=${startDate}&endDate=${endDate}`

const StatsOutlook = ({ nhlTeamId }: any) => {
  const [remainingGames, setRemainingGames] = useState("");

  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  let url: URL;
  let startDate: String;
  let endDate: String;
  let offsetDate;

  useEffect(() => {
    if (nhlTeamId) {
      fetch(url)
      .then(res => res.json())
      .then(data => setRemainingGames(data.totalGames))
    }
  });

  /* 
    The startDate and endDate string conversions can be written as templates instead of calling .toString() on them and concatenating.
    Example: `0${offsetDate.getDate()`.slice(-2)}` instead of ('0' + offsetDate.getDate()).toString().slice(-2)
  */

    if (currentDay === 0) {
      url = new URL(`https://statsapi.web.nhl.com/api/v1/schedule?teamId=${nhlTeamId}`)
    } else if (currentDay === 1) {
      offsetDate = new Date(new Date().setDate(new Date().getDate() + 6))
      startDate = `${currentDate.getFullYear()}-${('0' + (currentDate.getMonth() + 1)).toString().slice(-2)}-${('0' + currentDate.getDate()).toString().slice(-2)}`
      endDate = `${offsetDate.getFullYear()}-${('0' + (offsetDate.getMonth() + 1)).toString().slice(-2)}-${('0' + offsetDate.getDate()).toString().slice(-2)}`
      url = new URL(`https://statsapi.web.nhl.com/api/v1/schedule?teamId=${nhlTeamId}&startDate=${startDate}&endDate=${endDate}`)
    } else {
     for (let i = 1; i <= 6; i++) {
      if (currentDay - i === 1) {
        offsetDate = new Date(new Date().setDate(new Date().getDate() - i))
        let newDate = new Date(new Date().setDate(offsetDate.getDate() + 6))
        startDate = `${currentDate.getFullYear()}-${('0' + (currentDate.getMonth() + 1)).toString().slice(-2)}-${('0' + currentDate.getDate()).toString().slice(-2)}`
        endDate = `${newDate.getFullYear()}-${('0' + (newDate.getMonth() + 1)).toString().slice(-2)}-${('0' + newDate.getDate()).toString().slice(-2)}`
        url = new URL(`https://statsapi.web.nhl.com/api/v1/schedule?teamId=${nhlTeamId}&startDate=${startDate}&endDate=${endDate}`)
      }
     }
    }

  return (
    <div>Games Remaining This Week: {remainingGames}</div>
  )
}

export default StatsOutlook