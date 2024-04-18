import React, { useState } from 'react'
import BuisnessCard from './components/BuisnessCard'
import props from '../BuisnessCards'

function App() {
  return (
    <div className='bg-zinc-300 h-screen w-full flex justify-center items-center'>
      {props.map((props) => (
        <BuisnessCard key={props.name} props={props} />
      ))}
    </div>
  )
}

export default App
