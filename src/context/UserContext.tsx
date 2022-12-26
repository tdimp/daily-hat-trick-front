import React, { createContext, useState } from 'react';
import { UserContextInterface, UserContextType } from '../@types/User';
import { Props } from '../@types/Props';

export const UserContext = createContext({} as UserContextType)

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserContextInterface | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}