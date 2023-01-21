import React from 'react';
import { PopupProps } from '../@types/PropsInterface';

export const AddPlayer = (props: PopupProps) => {
  return props.trigger ? (
    <div>
      <div>
        <button>Close Popup</button>
        
      </div>
    </div>
  ) : <></>;

}