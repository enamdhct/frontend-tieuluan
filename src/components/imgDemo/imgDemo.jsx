import React from 'react'
// import ImgCard from '../../assets/image/goicangu-min.jpg'
import Image from 'next/image'
import fieldIMG from '@/assets/image/pc1.jpg'
import fruitIMG from '@/assets/image/pc2.jpg'
import vegetableIMG from '@/assets/image/pc3.jpg'

export default function imgDemo() {
  return (
    <div className='flex flex-row gap-4'>
        <div className='rounded border-4 border-green-100 w-1/3 h-fit'>
            <Image 
                src={fieldIMG} 
                alt='Image Product'
            />
        </div>
        <div className='rounded border-4 border-green-100 w-1/3'>
            <Image 
                src={fruitIMG} 
                alt='Image Product'
            />
        </div>
        <div className='rounded border-4 border-green-100 w-1/3 h-fit'>
            <Image 
                src={vegetableIMG} 
                alt='Image Product'
            />
        </div>
    </div>
  )
}
