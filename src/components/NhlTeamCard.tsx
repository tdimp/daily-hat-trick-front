import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NhlTeamCardInterface } from '../@types/PropsInterface';

const NhlTeamCard = ({ team }: NhlTeamCardInterface) => {
  const navigate = useNavigate();

  const teamName = team.name.split(' ').join('');

  return (
    <div className='col border align-items-center' onClick={() => navigate(`/nhlteams/${team.id}`)}>
      <img className='' src={require(`../logos/${teamName}.png`)} alt={`NHL team logo for ${team.name}`} />
    </div>
  )
}

export default NhlTeamCard