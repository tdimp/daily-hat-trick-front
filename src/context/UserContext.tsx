import React, { createContext, useState, useEffect } from 'react';
import { PropsInterface } from '../@types/PropsInterface';

export interface UserContextInterface {
  username: string | null;
  userId: number;
}

export type UserContextType = {
  user: UserContextInterface | null;
  setUser: React.Dispatch<React.SetStateAction<UserContextInterface | null>>
}

export const UserContext = createContext({} as UserContextType)

export const UserProvider = ({ children }: PropsInterface) => {
  const [user, setUser] = useState<UserContextInterface | null>(null);

  // useEffect to check if user is logged in
  useEffect(() => {
    fetch('/auth')
      .then(res => {
        if (res.ok){
          res.json().then(user => setUser({userId: user.id, username: user.username}))
        }
      })
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}