import React from 'react';
import { ErrorProps } from '../@types/PropsInterface';

const ErrorPage = ({ message }: ErrorProps) => {
  return (
    <div className='error-page'>{message}</div>
  )
}

export default ErrorPage