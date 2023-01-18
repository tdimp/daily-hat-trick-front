import { PlayerInterface } from "./PlayerInterface";

export interface TeamInterface {
  id: number;
  name: string;
  user_id: number;
  players: PlayerInterface[];
}

export type TeamContextType = {
  teams: TeamInterface[] | null;
  setTeams: React.Dispatch<React.SetStateAction<TeamInterface[] | null>>
}