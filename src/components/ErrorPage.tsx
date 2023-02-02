import React from 'react';
import { ErrorProps } from '../@types/PropsInterface';

const ErrorPage = ({ message }: ErrorProps) => {
  return (
    <div>{message}</div>
  )
}

export default ErrorPage