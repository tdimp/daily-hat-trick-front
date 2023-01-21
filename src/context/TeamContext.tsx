import React, { createContext, useState, useEffect } from 'react';
import { TeamInterface, TeamContextType } from '../@types/TeamInterface';
import { PropsInterface } from '../@types/PropsInterface';

// Need to create TeamContext to provide team list to PlayerList component.
// This will enable users to select which team to add players to from the PlayerList.

export const TeamContext = createContext({} as TeamContextType)

export const TeamsProvider = ({ children }: PropsInterface) => {
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

  return (
    <TeamContext.Provider value={{ teams, setTeams }}>
      {children}
    </TeamContext.Provider>
  )
}



