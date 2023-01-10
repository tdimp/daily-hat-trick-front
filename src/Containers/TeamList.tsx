import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { TeamInterface } from '../@types/Team';

const TeamList = ( ) => {
  const [teams, setTeams] = useState<TeamInterface[] | []>([]);

  const {user, setUser} = useContext(UserContext);

  // Fetch to teams#index on backend...
  useEffect(() => {
    if (user) {
      fetch('/teams')
    .then(res => res.json())
    .then(data => setTeams(data))
    .catch(error => alert(error))
    }
  }, [user])

  if(!user) {
    return <h3 className='need-auth'>You must be logged in to view this page.</h3>
  }

  return (
    <>
      {teams.map((team) => 
        <Link to ={`/teams/${team.id}`} className="link" key={team.id}>{team.name}</Link>
      )}
    </>
  )
}

export default TeamList