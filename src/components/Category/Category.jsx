'use client'
import React, { useEffect, useState } from 'react'
import CategoryProduct from '../CategoryTag/CategoryTag'
import Product from '../Product/Product'
import ViewMoreProduct from '../ViewMoreProduct/ViewMoreProduct'
import {getAllProductWithCategory, } from '@/services/productService'

export default function Category({categoryName, categoryID}) {
  const [arrProduct, setProduct] = useState('')
  const [amount, setAmount] = useState(8)
  const [viewMore, setViewMore] = useState(0)

  useEffect(()=>{
    if(categoryID){
      getData()
    }
  },[categoryID])
  async function getData (){
    let data = await getAllProductWithCategory(categoryID)
    setProduct(data.products)
    setViewMore(data.products.length)
  }
  function handleClickViewMore (){
    setAmount(amount+8)
    console.log(arrProduct.length);
  }
  function handleClickCollapse (){
    setAmount(Math.max(amount - 8, 8))
  }
  return ( 
    <div>
        <CategoryProduct text={categoryName}></CategoryProduct>
        <div className='flex flex-wrap'>
          {
            arrProduct && arrProduct.filter((item) => item.isActive === "Hiện").slice(0, amount).map((item, index)=>{
              // console.log(arrProduct)
              return(
                <div key={index} className='w-1/4 p-2'>
                  <Product product={item}></Product>
                </div>
              )
            })
          }
        </div>
        <div className='w-full flex justify-center mt-4 gap-4'>
          {
            amount > 8 && 
            <div className='rounded-md border-2 border-green-600 w-fit px-10 py-1 cursor-pointer' onClick={()=>handleClickCollapse()}>
              <span className='text-green-600'>Ẩn bớt</span>
          </div>
          }
          {viewMore > 8 &&
            <div className='rounded-md border-2 border-green-600 w-fit px-10 py-1 cursor-pointer' onClick={()=>handleClickViewMore()}>
              <span className='text-green-600'>Xem thêm</span>
            </div>}

      </div>
        {/* <ViewMoreProduct></ViewMoreProduct> */}
    </div>
  )
}
