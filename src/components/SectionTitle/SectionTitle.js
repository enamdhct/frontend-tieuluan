import React from 'react'


export default function sectionTitle({title}) {
  return (
    <div className='mt-4'>
        <h1 className='text-center text-2xl text-red-400 font-bold md:text-sm'>{title}</h1>
    </div>
  )
}
