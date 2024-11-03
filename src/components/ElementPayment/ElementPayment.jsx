import React from 'react'
import Icon from '../Icon/Icon'

export default function ElementPayment({iconName, text}) {
  return (
    <div className='flex flex-row gap-2 items-center'>
        <Icon name={iconName} className='w-6 h-6 mr-3 text-green-500'></Icon>
        <span className='text-xl font-bold text-green-500'>{text}</span>
    </div>
  )
}
