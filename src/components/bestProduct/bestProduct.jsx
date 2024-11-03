import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getCategory } from '@/services/categoryService'
import { createCart } from '@/services/cartService'
import { alertSuccess } from '../Swal/alert'
import { getWareByProductID } from '@/services/warehouseService'

import Icon from '../Icon/Icon'
export default function bestProduct({product}) {
    const [categoryName, setCategoryName] = useState('')
    const [amount, setAmount] = useState('')

    useEffect(()=>{
        getCategoryProduct()
    }, [])

    useEffect(()=>{
        if (product._id){
            getAmountWarehouse(product._id)
        }
    },[product._id])

    async function getAmountWarehouse(id){
        let amount = await getWareByProductID(JSON.stringify({"productID": id}))
        setAmount(amount[0].quantity)
      }

    async function handleAddToCart (){
        let userID = localStorage.getItem('userID')
        const formData = {
            "productID" : product._id,
            "userID": userID,
            "quantity": '',
            "state": 'cart'
        }
        let create = createCart(JSON.stringify(formData))
        if (create){
            alertSuccess({ status: 'success', text: 'Đã thêm vào giỏ hàng thành công' })
        }
        console.log(create)
    }
    async function getCategoryProduct (){
        let category = await getCategory(product.categoryID)
        setCategoryName(category.name)
    }
  return (
    <div className='bestProduct-content mt-4 p-4'>
        <div className='flex flex-row'>
            <div className='flex flex-row'>
                <div className='border rounded'>
                    <div className='img-card'>
                        <Image className='rounded-md hover:opacity-75'
                        src={product.imgURL}
                        width={300}
                        height={600}
                        alt='Image Product'/>
                    </div>
                    <div className='bottom-card flex flex-col'>
                        <div className='card-name p-2 flex justify-center'>
                            <span>{categoryName}</span>
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
                            <div className='bg-red-600 text-white p-2 rounded-md flex justify-center cursor-pointer' onClick={handleAddToCart}>
                                <Icon name={'cart'} className='w-6 h-6 text-white'></Icon>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
