import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NhlTeamCardInterface } from '../@types/PropsInterface';

const NhlTeamCard = ({ team }: NhlTeamCardInterface) => {
  const navigate = useNavigate();

  const teamName = team.name.split(' ').join('');

  return (
    <div className='nhl-card' onClick={() => navigate(`/nhlteams/${team.id}`)}>
      <img src={require(`../logos/${teamName}.png`)} />
    </div>
  )
}

export default NhlTeamCard