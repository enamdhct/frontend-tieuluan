'use client'
import React, {useState, useEffect} from 'react'
import { useSearchParams } from 'next/navigation'
import Icon from '@/components/Icon/Icon'
import ProductPayment from '@/components/ProductPayment/ProductPayment'
import { getOrder, updateOrder } from '@/services/orderService'
import Link from 'next/link'
import { getLocation } from '@/services/locationService'
const moment = require('moment');


export default function page() {
    const searchParams = useSearchParams()
    const [statusPayment, setStatusPayment] = useState('');
    const [vnpPaymentID, setVnpPaymentID] = useState('');
    const [vnp_Amount, setVnpAmount] = useState('')
    const [arrProduct, setArrProduct] = useState('')
    const [ship, setShip] = useState('')
    const [orderInfo, setOrderInfo] = useState('')
    const [location, setLocation] = useState('')
    const [voucherPrice,setVoucherPrice] = useState(null)
    // for (const value of searchParams.values()) {
    // console.log(value);
    // }
    useEffect(()=>{
        getInfoVNP()
        getInfoOrder()
    },[])

    useEffect(()=>{
        if(orderInfo){
            getLocationInfo()
        }
    }, [orderInfo])

    useEffect (()=>{
        updateStatusOrder()
    }, [statusPayment])
    async function getLocationInfo (){
        let location = await getLocation(orderInfo.shippingAddress)
        setLocation(location)
        console.log(location);
    }
    function getInfoVNP (){
        let vnp_ResponseCode  = searchParams.get('vnp_ResponseCode')
        let vnp_TransactionNo = searchParams.get('vnp_TransactionNo')
        let vnp_Amount = searchParams.get('vnp_Amount')
        setVnpAmount(vnp_Amount/100)
        setStatusPayment(vnp_ResponseCode)
        setVnpPaymentID(vnp_TransactionNo)
    }
    async function getInfoOrder(){
        let vnp_TxnRef = searchParams.get('vnp_TxnRef')
        let order = await getOrder(vnp_TxnRef)
        console.log(order)
        setOrderInfo(order)
        setArrProduct(order.product)
        setShip(order.shippingFee)
        setVoucherPrice(order?.voucherPrice)

    }
    async function updateStatusOrder(){
        if (statusPayment === '00'){
            let vnp_TxnRef = searchParams.get('vnp_TxnRef')
            let update = await updateOrder(vnp_TxnRef, JSON.stringify({"state": "Đang xử lí"}))
            // console.log(update)
        } else {
            let vnp_TxnRef = searchParams.get('vnp_TxnRef')
            let update = await updateOrder(vnp_TxnRef, JSON.stringify({"state": "Nháp"}))
        }
    }

  return (
    <div>
        <div className='bg-white rounded p-4 mx-20'>
            <div className='flex justify-center'>
                {statusPayment === '00' ?
                    <div className='border-8 border-green-100 rounded-full'>
                        <div className='border-8 border-green-200 rounded-full'>
                            <div className='h-20 w-20 bg-green-400 rounded-full p-4 flex justify-center text-center items-center'>
                                <Icon name={'check'} className='w-20 h-20 text-white font-bold'></Icon>
                            </div>
                        </div>
                    </div> :
                    <div className='border-8 border-red-100 rounded-full'>
                        <div className='border-8 border-red-200 rounded-full'>
                            <div className='h-20 w-20 bg-red-500 rounded-full p-4 flex justify-center text-center items-center'>
                                <Icon name={'cancel'} className='w-20 h-20 text-white font-bold'></Icon>
                            </div>
                        </div>
                    </div>      }

            </div>
            <div className='mt-8 flex justify-center'>
                <div className='flex justify-center flex-col'>
                    {
                        statusPayment === '00' ? 
                        <h3>Đặt hàng thành công</h3> : <h3>Đặt hàng thất bại</h3>
                    }
                    <span className='text-slate-400 flex justify-center'>Mã giao dịch: {vnpPaymentID}</span>
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
                        <span className='text-xl font-bold '>Ma giam gia: </span>

                        <span className='text-xl font-bold'>Tổng tiền: </span>
                        
                    </div>
                    <div className='flex flex-col gap-4'>
                        <span className='text-xl flex justify-end font-bold text-red-500'>{ship.toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})}</span>
                        <span className='text-xl flex justify-end font-bold text-red-500'>{voucherPrice?.toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})}</span>
                        
                        <span className='text-xl font-bold text-red-500'>{vnp_Amount.toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})}</span>
                    </div>
                </div>
            </div>


            <div className='my-8'>
                <div className='flex flex-row gap-5 justify-center'>
                    <Link href={'/'} className='no-underline text-black'>
                        <div className='px-4 border-2 border-green-600 p-2 rounded cursor-pointer'><span>Về trang chủ</span></div>
                    </Link>
                    <Link href={'/product'} className='no-underline'>
                        <div className='px-4 bg-green-400 font-bold text-white p-2 flex items-center rounded cursor-pointer'><span>Tiếp tục mua hàng</span></div>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}
