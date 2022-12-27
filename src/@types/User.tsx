export interface UserContextInterface {
  username: string | null;
  userId: number;
}

export type UserContextType = {
  user: UserContextInterface | null;
  setUser: React.Dispatch<React.SetStateAction<UserContextInterface | null>>
}