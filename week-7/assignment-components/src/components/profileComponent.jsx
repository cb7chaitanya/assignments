import React from 'react'
import { profileData } from '../dummyData/profileData.js'
 
function profileComponent({profileData}) {
  return (
    <div className='bg-zinc-300 w-28 h-40'>
        <div>{profileData.name}</div>
        <div>{profileData.name}</div>
    </div>
  )
}

export default profileComponent