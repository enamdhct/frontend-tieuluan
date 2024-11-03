import React from 'react'
import Image from 'next/image'
import ImgCard from '../../assets/image/ArgiShop.png'

export default function CategoryProduct({text}) {
  return (
    <div className='mt-10'>
        <div className='flex flex-row gap-3 items-center'>
          <Image src={ImgCard} width={30} height={10} className='rounded-full' alt='logo'></Image>
          <h2 className='text-lg font-bold m-0'>{text}</h2>
        </div>
    </div>
  )
}
