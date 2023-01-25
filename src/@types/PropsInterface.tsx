export interface PropsInterface {
  children: React.ReactNode;
}

export interface PopupProps {
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>
}