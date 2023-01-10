import { PlayerInterface } from "./Player";

export interface TeamInterface {
  id: number;
  name: string;
  user_id: number;
  players: PlayerInterface[];
}