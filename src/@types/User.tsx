export interface UserContextInterface {
  username: string | null;
}

export type UserContextType = {
  user: UserContextInterface | null;
  setUser: React.Dispatch<React.SetStateAction<UserContextInterface | null>>
}