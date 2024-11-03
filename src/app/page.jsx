'use client'
import React, { useEffect, useState } from 'react'
// import SlideShow from "@/components/slideShow/slideShow"
import BestProduct from "@/components/bestProduct/bestProduct"
import ImgDemo from "@/components/imgDemo/imgDemo"
import SectionTitle from "@/components/SectionTitle/SectionTitle"
import Category from "@/components/Category/Category"
import { getAllCategory } from '@/services/categoryService'
import { getBestProduct } from '@/services/productService'
import { getCategory } from '@/services/categoryService'



export default function Home() {
  const [arrCategory, setCategory] = useState('')
  const [arrBestProduct, setArrBestProduct] = useState('')

  useEffect(()=>{
      getDataCategory()
      getDataBestProduct()
  },[])
  async function getDataCategory() {
    let category = await getAllCategory()
    setCategory(category)
  }
  async function getDataBestProduct(){
    let arrProduct = await getBestProduct();
    setArrBestProduct(arrProduct.products)
}


// async function getCategoryProduct (){
//   let category = await getCategory('6523a42c8a735e6e0bfae9cd')
//   console.log(category)
//   console.log('jaja')
// }
// getCategoryProduct()
  return (
    <div className='mb-10'>
      <div className='w-full bg-white p-4 rounded'>
        <ImgDemo className="mt-5"/>
      </div>
      <div className="content">   
        <div className='w-100 bg-white rounded'>
          <div className='pt-4 mt-4'>
            <SectionTitle className='text-center md:text-sm' title={'SẢN PHẨM NỔI BẬT'}/>
            <div className='flex flex-row '>
              { arrBestProduct && arrBestProduct.map((item, index)=>(
                <BestProduct product={item} key={index}/>
              ))
              }
            </div>
          </div>
        </div>
        <div className='w-100 bg-white mt-4'>
          <div className='p-4'>
            <SectionTitle title={'SẢN PHẨM NÔNG NGHIỆP'} />
            {
              arrCategory && arrCategory.filter((item) => {return item.name !== 'Tất cả' && item.isActive === 'Hiện'}).map((item, index)=>{
                return(
                  <Category key={index} categoryName={item.name} categoryID={item._id}></Category>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}
