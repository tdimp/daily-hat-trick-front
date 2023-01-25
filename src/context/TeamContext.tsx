import React, { createContext, useState, useEffect, useContext } from 'react';
import { TeamInterface, TeamContextType } from '../@types/TeamInterface';
import { PropsInterface } from '../@types/PropsInterface';
import { UserContext } from './UserContext';

export const TeamContext = createContext({} as TeamContextType)

export const TeamsProvider = ({ children }: PropsInterface) => {
  const { user } = useContext(UserContext);
  const [teams, setTeams] = useState<TeamInterface[] | null>(null);

  useEffect(() => {
    if (user) {
    fetch('/teams')
    .then((res) => {
      if (res.ok) {
        res.json()
        .then(data => setTeams(data))
      }
    });
    }
  }, [user]);

  return (
    <TeamContext.Provider value={{ teams, setTeams }}>
      {children}
    </TeamContext.Provider>
  )
}