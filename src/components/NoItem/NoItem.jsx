import React from 'react'
import Icon from '../Icon/Icon'

export default function NoItem({text}) {
  return (
    <div>
        <div className='bg-white py-80 h-3/4 mt-4 '>
            <div className='w-full flex flex-col justify-center'>
                <div className='flex justify-center'>
                    <Icon name={'noItem'} className='w-28 h-28 text-red-600'></Icon>
                </div>
                <div className='flex justify-center mt-4 font-bold text-slate-500'>
                    {text}
                </div>
            </div>
        </div>
    </div>
  )
}
