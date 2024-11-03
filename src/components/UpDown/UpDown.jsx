import React, { useState } from 'react';
import { alertSuccess } from '../Swal/alert';


export default function UpDown({setValue, value, amount}) {

    const handleIncrease = () => {
      const newValue = parseInt(value) + 1;
      if (newValue <= amount) {
        setValue(newValue);
        console.log("hahhaa");
      }else {
        console.log("ahuhu");
        alertSuccess({ status: 'error', text: 'Số lượng đã tối đa' })
      }
    };
    
      const handleDecrease = () => {
        if (value > 0) {
          setValue(value - 1);
        }
      };

  return (
    <div>
        <div className='flex flex-row justify-center h-1/2'>
            <div onClick={handleDecrease} className='text-xl flex items-center border p-2 h-1/2 cursor-pointer'>-</div>
            <input type="text" value={value} onChange={e => setValue(Math.min(Math.max(parseInt(e.target.value) || 1, 1), amount))} className='w-2/5 border-inherit text-center'/>
            <div onClick={handleIncrease} className='text-xl flex items-center border p-2 h-1/2 cursor-pointer'>+</div>
        </div>
    </div>
  )
}
