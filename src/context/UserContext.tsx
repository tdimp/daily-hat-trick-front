import React, { createContext, useState } from 'react';
import { UserContextInterface, UserContextType } from '../@types/User';
import { Props } from '../@types/Props';

export const UserContext = createContext<UserContextType | null>(null)

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserContextInterface | null>({username: "testUser"});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}