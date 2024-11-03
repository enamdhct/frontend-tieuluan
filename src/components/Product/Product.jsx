"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import Link from 'next/link'
import Icon from '../Icon/Icon'
import { createCart } from '@/services/cartService'
import { alertSuccess } from '../Swal/alert'
import { getCategory } from '@/services/categoryService'
import { getWareByProductID } from '@/services/warehouseService'


export default function bestProduct({product}) {
    const [category, setCategory] = useState('')
    const [amount, setAmount] = useState('')
    useEffect(()=>{
        getCategoryName()
    },[])

    useEffect(()=>{
        if (product._id){
            getAmountWarehouse(product._id)
        }
    },[product._id])

    async function getCategoryName (){
        let cate = await getCategory(product.categoryID)
        setCategory(cate)
    }
    async function getAmountWarehouse(id){
        let amount = await getWareByProductID(JSON.stringify({"productID": id}))
        setAmount(amount[0].quantity)
      }
    // async function getCategoryName() {
    //     var requestOptions = {
    //         method: 'GET',
    //         headers: {
    //             "Content-Type": "application/json",
    //             "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDQ2ZTFkNDBlZTMzNjk4OWQ2ZTViZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5NDc5MTI0MSwiZXhwIjoxNjk3MzgzMjQxfQ.wY8aDxAKi01CunUgMN5eRz7NzPr2TpEc0fQez4AA4cE"
    //         },
    //       };
    //     const res = await fetch('http://localhost:8000/api/categorys/'+product.categoryID, requestOptions).then(response =>response.json())
    //     console.log(res)
    //     setCategory(res)
    // }
    async function handleAddToCart (){
        let userID = localStorage.getItem('userID')
        const formData = {
            "productID" : product._id,
            "userID": userID,
            "quantity": '',
        }
        let create = createCart(JSON.stringify(formData))
        if (create){
            alertSuccess({ status: 'success', text: 'Đã thêm thành công' })
        }
        // console.log(create)
    }
  return (

    <div className='bestProduct-content mt-4'>
        {/* <SectionTitle className='text-center md:text-sm' title={'SẢN PHẨM NỔI BẬT'}/> */}
        <div className='flex flex-row'>
            <div className='border rounded'>
                <div className='img-card'>
                    <Image className='rounded-md hover:opacity-75'
                    src={product.imgURL}
                    width={300}
                    height={300}
                    alt='Image Product'
                    />
                    
                </div>
                <div className='bottom-card flex flex-col bg-white'>
                    <div className='card-name p-2 flex justify-center'>
                        <span>{category.name}</span>
                    </div>
                    <div>
                        <span className='font-medium text-lg flex justify-center'>{product.name}</span>
                    </div>
                    <div className='flex flex-row gap-2 justify-center'>
                        <span className='font-medium text-lg'>Giá bán: </span><span className='text-red-500 font-bold'>{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                    </div>
                    {
                        amount === 0 ?
                        <div className='flex justify-center'><span className='text-red-600 font-bold text-xl'>Hết hàng</span></div> :
                        <div className='flex justify-center'><span className='text-white font-bold text-xl'>an</span></div>
                    }
                    <div className='card-action flex flex-row p-2 justify-between md:flex-col'>
                        <Link href={`/product/${product._id}`}>
                            <button className='bg-green-400 p-2 rounded-md text-white'>Chi tiết</button>
                        </Link>
                        {
                            amount > 0 ?                       
                            <div className='bg-red-600 text-white p-2 rounded-md flex justify-center cursor-pointer' onClick={handleAddToCart}>
                                <Icon name={'cart'} className='w-6 h-6 text-white'></Icon>
                            </div> :
                            <div className='bg-red-400 text-white p-2 rounded-md flex justify-center cursor-pointer'>
                                <Icon name={'cart'} className='w-6 h-6 text-white'></Icon>
                            </div> 
                        }
                        {/* <button className='bg-red-600 text-white p-2 rounded-md' onClick={handleAddToCart}>Thêm vào giỏ</button> */}
                    </div>
                </div>
            </div>
        </div>
    </div> 

  )
}
