import React from 'react'

export default function Shipping() {
  return (
    <div>
        <div className='flex flex-row items-center'>
            <div className='w-1/5'>
                <span className='font-bold'>Phương thức vận chuyển:</span>
            </div>
            <div className='w-2/5 flex justify-center'>
                <div className='flex flex-col'>
                    <span className='font-bold'>Mặc định</span>
                    <span>Dự kiến nhận hàng sau 3-5 ngày</span>
                </div>
            </div>
            <div className='w-1/5'>
                <span className='font-bold text-sky-500'>Thay đổi</span>
            </div>
            <div className='w-1/5'>
                <span>30.000đ</span>
            </div>
        </div>
    </div>
  )
}
