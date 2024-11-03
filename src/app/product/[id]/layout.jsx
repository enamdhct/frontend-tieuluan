'use client'
import React, { useEffect, useState } from 'react'
import { getAllProductWithCategory, getProduct } from '@/services/productService'
import { useParams } from 'next/navigation'
import Product from '@/components/Product/Product'
import { createComment, getCommentProduct, deleteComment, deleteRepComment } from '@/services/commentService'
import { getVendor } from '@/services/vendorService'
import AddComment from '@/components/AddComment/AddComment'
import Comment from '@/components/comment/Comment'

export default function layout({ children }) {
  const params = useParams()
  const [dataProduct, setDataProduct] = useState('')
  const [categoryId, setCategoryID] = useState('')
  const [arrComment, setArrComment] = useState('')
  const [arrProduct, setArrProduct] = useState()
  const [arrFeild, setArrFeild] = useState([])
  const [arrValue, setArrValue] = useState([])
const [more,setMore] = useState(5)
  useEffect(() => {
    // getData()
    getComment()
    getProductCategory()
    getData1()
  }, [params.id])
  useEffect(() => {
    getData()
  }, [categoryId])
  
  async function getData1() {
    const product = await getProduct(params.id)
    console.log("hiih", product);
    console.log("layoutID", params.id);
    const vendor = await getVendor(product.vendorID)
    setDataProduct(product)
    generateContent(product)
    if (product) {
      let abc = "cpu"
      switch (abc) {
        case "cpu":
          setArrFeild(["Thương hiệu", "Tên sản phẩm", "Bảo hành", "Số luồng", "Core", "Thế hệ", "Tốc độ"])
          setArrValue([vendor.name, product.name, product.guarantee, product.productDetail.flow, product.productDetail.core, product.productDetail.genergation, product.productDetail.speed])
          break
        case 'ram':
          setArrFeild(["Thương hiệu", "Tên sản phẩm", "Bảo hành", "Bộ nhớ", "Bus", "Thế hệ", "Tốc độ"])
          setArrValue([vendor.name, product.name, product.guarantee, product.productDetail.memory, product.productDetail.bus, product.productDetail.genergation, product.productDetail.speed])
          break
        case 'gpu':
          setArrFeild(["Thương hiệu", "Tên sản phẩm", "Bảo hành", "Kết nối", "Thế hệ", "Kích thước"])
          setArrValue([vendor.name, product.name, product.guarantee, product.productDetail.connect, product.productDetail.genergation, product.productDetail.dimension])
          break
        case 'disk':
          setArrFeild(["Thương hiệu", "Tên sản phẩm", "Bảo hành", "Bộ nhớ", "Kết nối", "Tốc độ đọc", "Tốc độ ghi"])
          setArrValue([vendor.name, product.name, product.guarantee, product.productDetail.memory, product.productDetail.connect, product.productDetail.read, product.productDetail.write])
          break
        case 'source':
          setArrFeild(["Thương hiệu", "Tên sản phẩm", "Bảo hành", "Kết nối"])
          setArrValue([vendor.name, product.name, product.guarantee, product.productDetail.connect])
          break
        case 'main':
          setArrFeild(["Thương hiệu", "Tên sản phẩm", "Bảo hành", "Kết nối", "Kích thước"])
          setArrValue([vendor.name, product.name, product.guarantee, product.productDetail.connect, product.productDetail.dimension])
          break
      }

    }
  }
  async function getProductCategory() {
    let product = await getProduct(params.id)
    // console.log(product.categoryID);
    setCategoryID(product.categoryID)
  }
  async function getData() {
    let data = await getAllProductWithCategory(categoryId)
    setArrProduct(data.products)
  }

  const handleAddComment = (e) => {
    let userID = localStorage.getItem('userID')
    const formData = {
      "content": e.get('comment'),
      "like": 0,
      "userID": userID,
      "productID": dataProduct._id
    }
    let comment = createComment(JSON.stringify(formData))
    if (comment) {
      getComment()
    }
  }
  async function getComment() {
    console.log("ahih");
    let comments = await getCommentProduct(params.id)
    setArrComment(comments)
    console.log("comment", comments)
  }
  function deleteCommentCus(id) {
    console.log(id);
    let deleteCmt = deleteComment(id)
    if (deleteCmt) {
      getComment()
    }
  }
  function deleteRepCommentCus(commentId, replyId) {
    const formData = {
      "commentId": commentId,
      "replyId": replyId
    }
    console.log(formData);
    let deleteCmt = deleteRepComment(JSON.stringify(formData))
    if (deleteCmt) {
      getComment()
    }
  }
  const [content,setContent] = useState(null)
  const generateContent = async (product)=>{
    try{
      const text = 
      JSON.stringify({"text": product?.name,images:[product.imgURL]})
      const headers = {
        "Content-Type": "application/json",
    }
      let requestOptions = {
        method: 'POST',
        headers: headers,
        body: text
    }
      console.log({requestOptions});
    
      const res = await fetch('http://127.0.0.1:3006/generate-content',
        requestOptions
      )
      console.log({res});
      
      const content = await res.json();
      console.log({content});
      setContent(content?.rs)
      return content;
    }catch(err){
      console.log({err});
      
    }
  }
  return (
    <>
      <div className='flex flex-row w-full gap-4'>
        <div className='w-full'>{children}</div>

      </div>
      <div className='flex flex-row w-full gap-4 bg-white mt-4 rounded p-3'>
        <div className='w-3/5 flex flex-col'>
          <div className='font-semibold text-lg'>
            Mô tả sản phẩm
          </div>
          {content && content}
          <div>{!content && 'Đang cập nhật...!!!'}</div>
        </div>
        <div className='w-2/5'>
          <div className='font-semibold text-lg'>
            Chi tiết
          </div>
          {arrFeild && arrFeild.map((item, i) => (
            <div className={`w-full flex flex-row p-3 ${i % 2 === 1 ? 'bg-gray-100' : ''}`} key={i}>
              <div className='w-2/5'>{item}</div>
              <div className='w-3/5'>{arrValue[i]}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 bg-white rounded p-4">
        <div>
          <h4>Bình luận</h4>
          <div className='flex flex-col'>
            <AddComment add={handleAddComment}></AddComment>
            <div className='max-h-[900px] overflow-y-auto'>
              {
                arrComment && arrComment.map((item, index) => (
                  <div key={index}>
                    <Comment refreshData={getComment} type={'comment'} commentId={item._id} comment={item} funDelete={deleteCommentCus} funDeleteRep={deleteRepCommentCus}></Comment>
                    <div className='mt-3 ml-12 flex gap-3 flex-col'>
                      {
                        item.replyComment && item.replyComment.map((comment, index) => (
                          <Comment refreshData={getComment} type={'repComment'} productID={item.productID} commentId={item._id} comment={comment} funDelete={deleteCommentCus} funDeleteRep={deleteRepCommentCus} key={index}></Comment>
                        ))
                      }
                    </div>
                    <hr />
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      <div className='w-full'>
        <div className='bg-white  p-4 rounded'>
          <div>
            <h4>Sản phẩm liên quan</h4>
          </div>
          <div className='grid grid-cols-5 gap-2'>
            {arrProduct && arrProduct.slice(0,more).map((item, index) => (
              <div key={index}>
                <Product product={item}></Product>
              </div>
            ))}
          </div>
          {more < arrProduct?.length &&
          <span onClick={()=> setMore((more)=> more +5)} className='flex justify-center cursor-pointer w-full text-center text-xl mt-2'>Xem thêm</span>
          
          }
 {more >= arrProduct?.length &&
          <span onClick={()=> setMore(5)} className='flex justify-center cursor-pointer w-full text-center text-xl mt-2'>Ẩn</span>
          
          }
        </div>
      </div>
    </>

  )
}