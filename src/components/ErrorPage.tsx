import React from 'react';

interface ErrorProps {
  message: string;
}

const ErrorPage = ({ message }: ErrorProps) => {
  return (
    <div className='error-page'>{message}</div>
  )
}

export default ErrorPage