import React from 'react'
import { TeamInterface } from '../@types/Team'



const Team = ({ name }: TeamInterface) => {

  // Fetch to teams#show on backend...
  console.log()
  
  return (
    <div>
      {name} Hellod
    </div>
  )
}

export default Team