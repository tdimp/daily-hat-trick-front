import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NhlTeamCardInterface } from '../@types/PropsInterface';

const NhlTeamCard = ({ team }: NhlTeamCardInterface) => {
  const navigate = useNavigate();

  const teamName = team.name.split(' ').join('');

  return (
    <div className='' style={{width: 16 + 'em', height: 19 + 'em'}} onClick={() => navigate(`/nhlteams/${team.id}`)}>
      <img className='card-img-top' src={require(`../logos/${teamName}.png`)} alt={`NHL team logo for ${team.name}`} />
      <div className='card-body'>
        <h4 className='text-center'>{team.name}</h4>
      </div>
    </div>
  )
}

export default NhlTeamCard