import React, { useState, useEffect, useContext } from 'react';
import Team from './Team';
import { UserContext } from '../context/UserContext';
import { TeamInterface } from '../@types/Team';

const TeamList = ( ) => {
  const [teams, setTeams] = useState<TeamInterface[] | []>([]);
  const userContext = useContext(UserContext);

  // Fetch to teams#index on backend...
  useEffect(() => {
    if (userContext.user) {
      fetch('/teams')
      .then(res => res.json())
      .then(data => setTeams(data))
      .catch(error => alert(error))
    }
  }, [])


  return (
    <>
      {teams?.map((team) => 
      <Team key={team.id} name={team.name} id={team.id} user_id={team.user_id}/>)}
    </>
    
  )
      
}

export default TeamList