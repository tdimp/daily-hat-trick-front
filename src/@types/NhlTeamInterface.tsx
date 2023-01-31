import { PlayerInterface } from "./PlayerInterface";

export interface NhlTeamInterface {
  id: number;
  name: string;
  players: PlayerInterface[];
}