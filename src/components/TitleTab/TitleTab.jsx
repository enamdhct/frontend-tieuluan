import React from 'react'

export default function TitleTab({text, className}) {
  return (
    <div className='bg-white p-4 rounded-lg shadow-inner'>
      <div className='text-black text-xl font-bold ml-4'>
          <h3 className={className}>{text}</h3>
      </div>
    </div>
  )
}
