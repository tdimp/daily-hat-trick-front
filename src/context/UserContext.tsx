import React, { createContext, useState, useEffect } from 'react';
import { UserContextInterface, UserContextType } from '../@types/User';
import { Props } from '../@types/Props';

export const UserContext = createContext({} as UserContextType)

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserContextInterface | null>(null);

  // useEffect to check if user is logged in
  useEffect(() => {
    fetch('/auth')
      .then(res => {
        if(res.ok){
          res.json().then(user => setUser(user.username))
        }
      })
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}