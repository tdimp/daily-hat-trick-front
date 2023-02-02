import { PlayerInterface } from "./PlayerInterface";

export interface PropsInterface {
  children: React.ReactNode;
}

export interface PopupProps {
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ErrorProps {
  message: string;
}

export interface PlayerPropsInterface {
  player: PlayerInterface;
}