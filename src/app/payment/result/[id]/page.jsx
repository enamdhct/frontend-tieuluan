'use client'
import React, {useEffect, useState} from 'react'
import Icon from '@/components/Icon/Icon'
import { getOrder } from '@/services/orderService'
import ProductPayment from '@/components/ProductPayment/ProductPayment'
import { getLocation } from '@/services/locationService'
import Link from 'next/link'

const moment = require('moment');

export default function page({params}) {
    const [arrProduct, setArrProduct] = useState('')
    const [totalPrice, setTotalPrice] = useState('')
    const [ship, setShip] = useState('')
    const [location, setLocation] = useState('')
    const [locationID, setLocationID] = useState('')
    const [orderInfo, setOrderInfo] = useState('')
    const [priceVoucher, setPriceVoucher] = useState('')
    const [coinApply, setCoinApply] = useState(null)

    useEffect(()=>{
        getInfoOrder()
    },[])
    useEffect(()=>{
        if (locationID){
            getLocationInfo()
        }
    }, [locationID])
    async function getLocationInfo(){
        let location = await getLocation(locationID)
        setLocation(location)
        console.log(location);
    }
    async function getInfoOrder(){
        let order = await getOrder(params.id)
        console.log({order});
        
        setOrderInfo(order)
        setArrProduct(order.product)
        setTotalPrice(order.Price)
        setShip(order.shippingFee)
        setLocationID(order.shippingAddress)
        setPriceVoucher(order?.voucherPrice || null)
        setCoinApply(order?.coinApply || null)

    }
    return (
        <div>
            <div className='bg-white rounded p-4 mx-20'>
                <div className='flex justify-center'>
                    <div className='border-8 border-green-100 rounded-full'>
                        <div className='border-8 border-green-200 rounded-full'>
                            <div className='h-20 w-20 bg-green-400 rounded-full p-4 flex justify-center text-center items-center'>
                                <Icon name={'check'} className='w-20 h-20 text-white font-bold'></Icon>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-8 flex justify-center'>
                    <div className='flex justify-center flex-col'>
                        <h3>Đặt hàng thành công</h3>
                        <span className='text-slate-400 flex justify-center'>Mã giao dịch: {params.id}</span>
                    </div>
                </div>
                <div className='bg-white rounded p-4 mt-4 border'>
                    <div className='flex flex-row'>
                        <div className='w-3/6'>
                            <span className='font-bold text-xl'>SẢN PHẨM</span>
                        </div>
                        <div className='w-1/6 flex justify-center'>
                            <span>Đơn giá</span>
                        </div>
                        <div className='w-1/6 flex justify-center'>
                            <span>Số lượng</span>
                        </div>
                        <div className='w-1/6 flex justify-center'>
                            <span>Thành tiền</span>
                        </div>
                    </div>
                    <hr />
                    <div>
                        {
                            arrProduct && arrProduct.map((item, index)=><ProductPayment key={index} productCart={item}></ProductPayment>)
                        }
                    </div>
                </div>
                <div className='mt-4'>
                    <div className='flex flex-col text-lg w-full gap-2'>
                        <div className='w-full flex'>
                            <span className='text-bold text-slate-500 w-1/4'>Thời gian đặt hàng: </span> <span className='text-bold w-3/4'>Vào lúc {moment(orderInfo.orderTime).format('DD-MM-YYYY hh:mm:ss')}</span>
                        </div>
                        <div className='w-full flex'>
                            <span className='text-bold text-slate-500 w-1/4'>Địa chỉ giao hàng: </span><span className='text-bold w-3/4'>{location.location}</span>
                        </div>
                        <div className='w-full flex'>
                            <span className='text-bold text-slate-500 w-1/4'>Thời gian giao hàng: </span><span className='text-bold w-3/4'>Dự kiến khoảng 3-5 ngày.</span>
                        </div>
                        <span>Bạn có thể theo dõi đơn hàng tại đơn hàng của tôi</span>
                    </div>
                </div>
                <div className='mt-4 flex justify-end'>
                    <div className='flex flex-row gap-4 w-1/3 justify-end'>
                        <div className='flex flex-col gap-4'>
                            <span className='text-xl font-bold '>Phí vận chuyển: </span>
                            {priceVoucher && <span className='text-xl font-bold '>Mã giảm giá: </span>}
                            {coinApply && <span className='text-xl font-bold '>Coin sử dụng: </span>}

                            <span className='text-xl font-bold'>Tổng tiền: </span>
                            
                        </div>
                        <div className='flex flex-col gap-4'>
                            <span className='text-xl flex justify-end font-bold text-red-500'>{ship.toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})}</span>
                           { priceVoucher && <span className='text-xl flex justify-end font-bold text-red-500'>{priceVoucher && priceVoucher?.toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})}</span>}
                           { coinApply && <span className='text-xl flex justify-end font-bold text-red-500'>{coinApply && coinApply?.toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})}</span>}
                            
                            <span className='text-xl font-bold text-red-500'>{totalPrice.toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})}</span>
                        </div>
                    </div>
                </div>
                {/* <div className='mt-4 flex justify-end'>
                    <div className='flex flex-row gap-4'>
                        <span className='text-xl font-bold'>Tổng tiền: </span>
                        <span className='text-xl font-bold text-red-500'>{totalPrice.toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})}</span>
                    </div>
                </div> */}
                {/* <div className='mt-4'>
                    
                </div> */}
                <div className='my-8'>
                    <div className='flex flex-row gap-5 justify-center'>
                        <Link href={'/'} className='no-underline text-black'>
                            <div className='px-4 border-2 border-green-600 p-2 rounded cursor-pointer'><span>Về trang chủ</span></div>
                        </Link>
                        <Link href={'/product'} className='no-underline'>
                            <div className='px-4 bg-green-400 font-bold text-white p-2 rounded cursor-pointer'><span>Tiếp tục mua hàng</span></div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
      )
}
