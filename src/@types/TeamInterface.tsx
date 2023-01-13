import { PlayerInterface } from "./PlayerInterface";

export interface TeamInterface {
  id: number;
  name: string;
  user_id: number;
  players: PlayerInterface[];
}