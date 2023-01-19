import React, { createContext, useState, useEffect } from 'react';
import { TeamInterface, TeamContextType } from '../@types/TeamInterface';
import { Props } from '../@types/PropsInterface';

// Need to create TeamContext to provide team list to PlayerList component.
// This will enable users to select which team to add players to from the PlayerList.

export const TeamContext = createContext({} as TeamContextType)

export const TeamsProvider = ({ children }: Props) => {
  const [teams, setTeams] = useState<TeamInterface[] | null>(null);

  useEffect(() => {
    fetch('/teams')
    .then((res) => {
      if (res.ok) {
        res.json()
        .then(data => setTeams(data))
      } else {
        alert('Oops, something went wrong.')
      }
    });
  }, []);

  console.log(teams)

  return (
    <TeamContext.Provider value={{ teams, setTeams }}>
      {children}
    </TeamContext.Provider>
  )
}



