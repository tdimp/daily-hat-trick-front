import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { TeamInterface } from '../@types/TeamInterface';
import { TeamContext } from '../context/TeamContext';
import NewTeamForm from '../components/NewTeamForm';

const TeamList = () => {
  const {teams, setTeams} = useContext(TeamContext);

  const {user} = useContext(UserContext);

  const handleCreateTeam = (newTeam: TeamInterface) => {
    if (teams) {
      setTeams([...teams, newTeam])
    }
  }

  if (!user) {
    return <h3 className='need-auth'>You must be logged in to view this page.</h3>
  }

  return (
    <div className='container'>
      <NewTeamForm handleCreate={handleCreateTeam}/>
      <div className='team-container'>
      {teams?.map((team) => 
        <Link to ={`/teams/${team.id}`} className="link" key={team.id}>{team.name}</Link>
      )}
      </div>
    </div>
  )
}

export default TeamList