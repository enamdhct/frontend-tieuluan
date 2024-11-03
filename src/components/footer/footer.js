import React from 'react'
import TextFW500 from '../textFW500/textFW500'
export default function footer() {
  return (
    <div>
        <div className=''></div>
        <div className='bg-green-500 h-16 flex items-center w-full px-[calc(100%-1660px)]'>
            <div className='flex justify-between w-full'>
                <div className='flex flex-row w-full justify-between'>
                  <TextFW500 text={'© 2020 ArgiShop Co. All rights reserved.'} />
                  <div className='flex flex-row gap-4'>
                    <TextFW500 text={'Privacy & Security'} />
                    <TextFW500 text={'Site map'} />
                  </div>
                </div>
            </div>
        </div>
    </div>
  )
}
