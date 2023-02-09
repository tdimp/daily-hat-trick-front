import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NhlTeamCardInterface } from '../@types/PropsInterface';

const NhlTeamCard = ({ team }: NhlTeamCardInterface) => {
  const navigate = useNavigate();

  const teamName = team.name.split(' ').join('');

  return (
    <div className='nhl-card' onClick={() => navigate(`/nhlteams/${team.id}`)}>
      <img className='nhl-logo' src={require(`../logos/${teamName}.png`)} alt={`NHL team logo for ${team.name}`} />
      <p className='nhl-card-text'>{team.name}</p>
    </div>
  )
}

export default NhlTeamCard