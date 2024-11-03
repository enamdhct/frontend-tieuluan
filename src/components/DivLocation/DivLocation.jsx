import React from 'react'

export default function DivLocation({location}) {

  return (
    <div className='w-full'>
        <div className='flex flex-row mt-3 justify-between'>
            <div className='flex flex-col w-2/6'>
                <span className='text-lg font-bold'>{location.customerName}</span>
                <span className='text-lg font-bold'>{location.phone}</span>
            </div>
            <div className='flex flex-row gap-3 w-4/6 items-center'>
                <p className='text-lg flex items-center my-0'>
                    {location.location}
                </p>
            </div>
        </div>
    </div>
  )
}
