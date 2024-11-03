'use client'
import React, { useEffect, useState } from 'react'
import { getProduct } from '@/services/productService'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import TitleTab from '@/components/TitleTab/TitleTab'
// import Comment from '@/components/comment/Comment'
// import AddComment from '@/components/AddComment/AddComment'
import UpDown from '@/components/UpDown/UpDown'
import { createCart } from '@/services/cartService'
import { createOrder } from '@/services/orderService'
import { createComment, getCommentProduct, deleteComment, deleteRepComment} from '@/services/commentService'
import { getWareByProductID } from '@/services/warehouseService'
import { alertSuccess } from '@/components/Swal/alert'



export default function page({params}) {
  const router = useRouter()
  const [dataProduct, setDataProduct] = useState('')
  const [sl, setValue] = useState(1);
  const [arrComment, setArrComment] = useState('')
  const [amount, setAmount] = useState('')
  useEffect(()=>{
    getData()
},[])
useEffect(()=>{
  if (dataProduct._id){
    console.log("dataId", dataProduct._id);
    getComment()
    getAmountWarehouse(dataProduct._id)
  }
}, [dataProduct._id])

  async function  getData()  {
    const product = await getProduct(params.id)
    setDataProduct(product)
  }
  async function getAmountWarehouse(id){
    console.log(id);
    let amount = await getWareByProductID(JSON.stringify({"productID": id}))
    setAmount(amount[0].quantity)
    console.log(amount[0].quantity);
  }
  const formattedPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(dataProduct.price);
  async function handleAddToCart (){
      let userID = localStorage.getItem('userID')
      const formData = {
          "productID" : dataProduct._id,
          "userID": userID,
          "quantity": ''
      }
      let create = createCart(JSON.stringify(formData))
      if (create){
        alertSuccess({ status: 'success', text: 'Thêm sản phẩm thành công' })
      }
      console.log(create)
  }
  async function handleOrder (){
    let userID = localStorage.getItem('userID')
    let orderInfo = {
      "product": [{
        "productID": dataProduct._id,
        "price": dataProduct.price,
        "quantity": sl,
        "totalPrice": dataProduct.price*sl,
        "name": dataProduct.name,
        "imgProduct": dataProduct.imgURL,
      }],
      "Price": dataProduct.price*sl,
      "state": "Nháp",
      "userID": userID
    }

    if (addOrder && addOrder._id) {
      router.push(`/payment/${addOrder._id}`);
    } else {
        console.error("Không thể lấy được ID của đơn hàng");
    }



    console.log(orderInfo)
  }
  // const handleAddComment = (e)=>{
  //   let userID = localStorage.getItem('userID')
  //   const formData = {
  //     "content": e.get('comment'),
  //     "like": 0,
  //     "userID": userID,
  //     "productID": dataProduct._id
  //   }
  //   let comment = createComment(JSON.stringify(formData))
  //   if(comment){
  //     getComment()
  //   }
  // }

  async function getComment (){
    let comments = await getCommentProduct(dataProduct._id)
    setArrComment(comments)
    console.log(comments)
  }
  // function deleteCommentCus (id){
  //   console.log(id);
  //   let deleteCmt = deleteComment(id)
  //   if (deleteCmt){
  //     getComment()
  //   }
  // }
  // function deleteRepCommentCus (commentId, replyId){
  //   const formData = {
  //     "commentId": commentId,
  //     "replyId": replyId
  //   }
  //   console.log(formData);
  //   let deleteCmt = deleteRepComment(JSON.stringify(formData))
  //   if (deleteCmt){
  //     getComment()
  //   }
  // }
  function convertUlToClass(text) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    const ulElements = doc.querySelectorAll('ul');

    ulElements.forEach((ulElement) => {
        ulElement.setAttribute('class', 'list-disc ml-5');
    });
    const convertedHTML = doc.body.innerHTML;
    return convertedHTML;
  }

  return (
    <div>
      <div className='bg-white p-4 rounded'>
        <div className='flex flex-row gap-3'>
          <div>
            {dataProduct.imgURL&& <Image src={dataProduct.imgURL} alt='image product' width={500} height={500}/>}
          </div>
          <div> 
            <TitleTab text={dataProduct.name}></TitleTab>
            <div className='mt-4'>
              <span className='text-md font-semibold'>THƯƠNG HIỆU: </span> {dataProduct.standard}
            </div>
            {/* <div className='mt-3'>
              <span className='text-md font-semibold'>THÀNH PHẦN:</span> {dataProduct.component}
            </div> */}
            {
              amount > 0 && 
                <div className='flex flex-row items-center mt-3'>
                <span className='text-md font-semibold'>SỐ LƯỢNG: </span><UpDown setValue={setValue} value={sl} amount={amount}></UpDown>
              </div>
            }
            <div className='mt-3'>
              <span className='text-md font-semibold'>SỐ LƯỢNG KHO HÀNG: </span> <span className='text-lg font-bold'>{amount}</span>
            </div>
            <div className='mt-3'>
              <span className='text-md font-semibold'>GIÁ BÁN: </span> <span className='text-lg text-rose-600'>{formattedPrice}</span>
            </div>
            <div className='mt-3'>
              <span className='text-md font-semibold'>Hotline: </span> <span className='text-lg text-rose-600'>0123456789 - 0123456789</span>
            </div>
            <div>
              {amount > 0 ?
                <div className='flex flex-row gap-5 mt-4'>
                <div className='py-1 px-2 border-2 w-fit border-green-500 font-bold text-lg rounded flex items-center cursor-pointer hover:bg-green-500 hover:text-white' onClick={handleAddToCart}>
                  <span>Thêm vào giỏ hàng</span>
                </div>
                <div className='py-1 px-2 bg-red-500 font-bold text-lg text-white rounded w-fit flex items-center cursor-pointer' onClick={handleOrder}>
                  <span>Mua ngay</span>
                </div>
              </div> : <div className='flex mt-4'><span className='text-xl text-red-500 font-bold'>Hết hàng</span></div>
              }
            </div>
          </div>
        </div>
        <div className='mt-10'>
          <div>
            <span className='text-xl font-semibold text-rose-600'>Thông tin chi tiết</span>
          </div>
          <div className='mt-3'>
            <div dangerouslySetInnerHTML={{ __html: dataProduct.description }} />
          </div>
          <div>
            <div className='mt-3'>
              <span className='text-lg font-semibold'>Tính năng:</span>
            </div>
            <div dangerouslySetInnerHTML={{ __html: convertUlToClass(dataProduct.specialTreatment) }} className='mt-3'/>
          </div>
          {/* <div>
            <div>
              <span className='text-lg font-semibold'>Hướng dẫn sử dụng:</span>
            </div>
            <div dangerouslySetInnerHTML={{ __html: convertUlToClass(dataProduct.userGuide) }} className='mt-3'/>
          </div> */}
        </div>
      </div>
      {/* <div className="mt-4 bg-white rounded p-4">
        <div>
          <h4>Bình luận</h4>
          <div className='flex flex-col'>
            <AddComment add={handleAddComment}></AddComment>
            <div className='max-h-[900px] overflow-y-auto'>
              {
                arrComment && arrComment.map((item, index)=> (
                  <div key={index}>
                    <Comment refreshData={getComment} type={'comment'} commentId={item._id} comment={item} funDelete={deleteCommentCus} funDeleteRep={deleteRepCommentCus}></Comment>
                    <div className='mt-3 ml-12 flex gap-3 flex-col'>
                      {
                        item.replyComment && item.replyComment.map((comment, index)=>(
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
      </div> */}
    </div>
  )
}
