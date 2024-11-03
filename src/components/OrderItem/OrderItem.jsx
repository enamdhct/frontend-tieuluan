'use client'
import React, { useState, useEffect } from 'react'
import ProductPayment from '../ProductPayment/ProductPayment'
import { updateOrder, deleteOrder } from '@/services/orderService';
import { confirmDelete } from '../Swal/alert';
import Link from 'next/link';
import Icon from '../Icon/Icon'
import { usePathname } from 'next/navigation';
import { getLocation } from '@/services/locationService';
const moment = require('moment');
const servenDay = 60 * 60 * 24 * 30 * 1000


export default function OrderItem({ data, refreshData, openReview, openRefunds }) {
    console.log({openRefunds});
    
    const pathName = usePathname()
    const [location, setLocation] = useState('')

    useEffect(() => {
        if (data) {
            getLocationInfo()
        }
    }, [data])

    function getStateClass(state) {
        switch (state) {
            case 'Đang xử lí':
            case 'Refund:Đang xử lý':
                return 'text-yellow-500 font-bold text-lg';
            case 'Đang vận chuyển':
                return 'text-sky-500 font-bold text-lg';
            case 'Refund:Hoàn thành':
            case 'Hoàn thành':
                return 'text-green-500 font-bold text-lg';
            case 'Refund:Chờ duyệt':
                return 'text-green-500 font-bold text-lg';
            case 'Đã hủy':
                return 'text-red-500 font-bold text-lg';
            case 'Nháp':
                return 'text-slate-400 font-bold text-lg';
        }
    }

    async function getLocationInfo() {
        let location = await getLocation(data.shippingAddress)
        console.log(location);
        setLocation(location)
    }

    async function handleCancelOrder() {
        const isConfirm = await confirmDelete()
        if (isConfirm) {
            let update = await updateOrder(data._id, JSON.stringify({ "state": "Nháp" }))
            if (update) {
                refreshData()
            }
        }
    }
    async function handleDeleteOrderDraf() {
        const isConfirm = await confirmDelete()
        if (isConfirm) {
            let deleteDraf = await deleteOrder(data._id)
            if (deleteDraf) {
                refreshData()
            }
        }

    }
    return (
        <div>
            <div className='flex flex-row justify-between'>
                <div className='flex flex-row'>
                    <span>Đơn hàng:</span>
                    <span className='ml-4 font-bold'>{data._id}</span>
                </div>
                <div className='flex flex-row text-y'>
                    <span>Trạng thái:</span>
                    <span className={`ml-4 ${getStateClass(data.state)}`}>{data.state?.includes("Refund") ?data.state.slice(7) :data.state}</span>
                </div>
            </div>
            <hr />
            <div>
                {data.product && data.product.map((item, index) => {
                    return (
                        <ProductPayment key={index} productCart={item}></ProductPayment>
                    )
                })}
            </div>

            <hr />
            {pathName === `/order/detail/${data._id}` &&
                <div className='mt-4'>
                    <div className='flex flex-col text-lg w-full gap-2'>
                        <div className='w-full flex'>
                            <span className='text-bold text-slate-500 w-1/4'>Thời gian đặt hàng: </span> <span className='text-bold w-3/4'>Vào lúc {moment(data.orderTime).format('DD-MM-YYYY hh:mm:ss')}</span>
                        </div>
                        <div className='w-full flex'>
                            <span className='text-bold text-slate-500 w-1/4'>Địa chỉ giao hàng: </span><span className='text-bold w-3/4'>{location.location}</span>
                        </div>
                        <div className='w-full flex'>
                            <span className='text-bold text-slate-500 w-1/4'>Thời gian giao hàng: </span><span className='text-bold w-3/4'>Dự kiến khoảng 3-5 ngày.</span>
                        </div>
                    </div>
                </div>
            }
            <div>
                <div className='flex flex-col gap-3'>
                    {pathName === `/order/detail/${data._id}` &&
                        <div className='flex flex-row items-center justify-end'>
                            <div className='flex flex-row item-center'>
                                <span className='text-red-600 font-bold text-lg'>Phí vận chuyển: </span>
                            </div>
                            <div className='ml-4'>
                                <span className='font-bold text-lg text-red-600'>{data.shippingFee && data.shippingFee.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                            </div>
                        </div>
                    }
                    {data.voucherPrice && data.voucherPrice > 0 &&
                        <div className='flex flex-row items-center justify-end'>
                            <div className='flex flex-row item-center'>
                                <span className='text-red-600 font-bold text-xl'>Mã giảm giá: </span>
                            </div>
                            <div className='ml-4'>
                                <span className='font-bold text-xl text-red-600'>{data.voucherPrice && data.voucherPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                            </div>
                        </div>
                    }
    {data.coinApply && data.coinApply > 0 &&
                        <div className='flex flex-row items-center justify-end'>
                            <div className='flex flex-row item-center'>
                                <span className='text-red-600 font-bold text-xl'>Coin sử dụng: </span>
                            </div>
                            <div className='ml-4'>
                                <span className='font-bold text-xl text-red-600'>{data.coinApply && data.coinApply.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                            </div>
                        </div>
                    }
                    <div className='flex flex-row items-center justify-end'>
                        <div className='flex flex-row item-center'>
                            <div className='flex items-center'>
                                <Icon name={'money'} className='w-6 h-6 mr-3 text-red-600'></Icon>
                            </div>
                            <span className='text-red-600 font-bold text-xl'>Thành tiền: </span>
                        </div>
                        <div className='ml-4'>
                            <span className='font-bold text-xl text-red-600'>{data.Price && data.Price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                        </div>
                    </div>
                    <div className='flex flex-row justify-between items-center'>
                        {pathName === `/order/detail/${data._id}` ? <></> :
                            <div>
                                <span>Đơn hàng sẽ được giao vào khoảng 3-5 ngày</span>
                            </div>}
                        {pathName === `/order/detail/${data._id}` ? <></> :
                            <div className='flex flex-row gap-4 mt-4 justify-end'>
                                {
                                    data.state !== "Đã hủy" && <Link href={`/order/detail/${data._id}`} className='text-white no-underline'><div className='bg-sky-500 text-white cursor-pointer font-bold p-2 rounded w-fit'><span>Xem chi tiết</span></div></Link>
                                }
                                {
                                    data.state === "Hoàn thành" && data.isReview !== "yes" && <div className='bg-green-500 text-white cursor-pointer font-bold p-2 rounded w-fit' onClick={() => openReview(data._id)}><span>Đánh giá</span></div>
                                }
                                {
                                    data.state === "Hoàn thành" && data.isReview !== "yes" && new Date().getTime() - new Date(data.updatedAt).getTime() <= servenDay && <div className='bg-red-500 text-white cursor-pointer font-bold p-2 rounded w-fit' onClick={() => {
                                        if(openRefunds){
                                            openRefunds(data._id)
                                        }
                                    }}><span>Hoàn tiền</span></div>
                                }
                                {
                                    data.state === "Đang xử lí" && <div className='bg-green-500 text-white cursor-pointer font-bold p-2 rounded w-fit' onClick={() => handleCancelOrder()}><span>Hủy</span></div>
                                }
                                {
                                    data.state === "Nháp" &&
                                    <div className='flex flex-row gap-3'>
                                        <Link href={`/payment/${data._id}`} className='text-white no-underline'>
                                            <div className='bg-green-500 text-white cursor-pointer font-bold p-2 rounded w-fit'><span>Tiếp tục mua</span></div>
                                        </Link>
                                        <div className='bg-red-500 text-white cursor-pointer font-bold p-2 rounded w-fit' onClick={() => handleDeleteOrderDraf()}><span>Xóa</span></div>
                                    </div>
                                }
                            </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}
