import React from 'react'

function BuisnessCard({props}) {
  return (
    <div className='bg-white w-full p-2 m-4 rounded-lg text-black'>
        <h1 className='text-4xl'>{props.name}</h1>
        <h1 className='text-2xl'>{props.description}</h1>
        <h1 className='text-xl'>{props.interests}</h1>
        <div className='flex flex-wrap text-white'>
            <button className='bg-blue-500 p-1 m-2 rounded-md'>Linkedin</button>
            <button className='bg-blue-500 p-1 m-2 rounded-md'>Twitter</button>
        </div>
    </div>
  )
}

export default BuisnessCard