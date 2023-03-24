import { NhlTeamInterface } from "./NhlTeamInterface";
import { PlayerInterface } from "./PlayerInterface";

export interface PropsInterface {
  children: React.ReactNode;
}

export interface ErrorProps {
  message: string;
}

export interface PlayerPropsInterface {
  player: PlayerInterface;
}

export interface NhlTeamCardInterface {
  team: NhlTeamInterface;
}