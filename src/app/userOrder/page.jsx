'use client'
import React, {useEffect, useState} from 'react'
import { getAllOrder, getOrderUser } from '@/services/orderService'
import OrderItem from '@/components/OrderItem/OrderItem'
import NoItem from '@/components/NoItem/NoItem'
import FormReview from '@/components/FormReview/FormReview'
import Icon from '@/components/Icon/Icon'
import FormRefund from '@/components/FormRefund/FormRefund'



export default function page() {
    const [arrOrder, setArrOrder] = useState('')
    const [typeOrder, setTypeOrder] = useState('all')
    const [isReview, setIsReview] = useState(false)
    const [isRefund, setIsRefund] = useState(false)

    const [orderID, setOrderId] = useState('')
    const [searchValue, setSearchValue] = useState('');

    useEffect(()=>{
        getData()
    }, [])

    async function getData (){
        let userID = localStorage.getItem('userID')
        let arrData = await getOrderUser(userID)
        console.log({arrData});
        
        setArrOrder(arrData.reverse())
    }
    function handleClickTabOrder(type){
        setTypeOrder(type)
    }
  
    function handleReview(orderID){
        setIsReview(true)
        setOrderId(orderID)
        console.log(orderID);
    }
    function handleRefund(orderID){
        setIsRefund(true)
        setOrderId(orderID)
        console.log(orderID);
    }
    function handleCloseModal(){
        setIsReview(false)
    }
    function handleCloseModalRefund(){
        setIsRefund(false)
    }
    async function handleSearchOrder(e){
        if (e.key === 'Enter') {
            const searchText = e.target.value;
            console.log(arrOrder);
            console.log(searchText);
            const filteredOrders = arrOrder.filter(element => element._id.toLowerCase().includes(searchText.toLowerCase()) || element.product.some(product => product.name.toLowerCase().includes(searchText.toLowerCase())));
            console.log(filteredOrders);
            setArrOrder(filteredOrders);
        }
    }
    async function handleClickSearchOrder(){
        const searchText = searchValue;
        const filteredOrders = arrOrder.filter(element => element.name.toLowerCase().includes(searchText.toLowerCase()));
        setArrOrder(filteredOrders);
    }
    async function handleEmptyInput (e){
        if (e.target.value === ''){
            // let arrOrder = await getAllOrderWithCategory(IDCategoryCurrent)
            // setArrOrder(arrOrder)
            getData()
        } else {
            setSearchValue(e.target.value)
        }
    }   
    

  return (
    <div>
        <div className='bg-white p-4 mt-2 rounded'>
            
            <div className='flex flex-row justify-between'>
                <div className={`cursor-pointer ${typeOrder === 'all' ? 'text-green-500 font-bold' : ''}`}  onClick={()=>handleClickTabOrder('all')}>
                    <span>Tất cả</span>
                </div>
                <div className={`cursor-pointer ${typeOrder === 'draf' ? 'text-green-500 font-bold' : ''}`}  onClick={()=>handleClickTabOrder('draf')}>
                    <span>Nháp</span>
                </div>
                <div className={`cursor-pointer ${typeOrder === 'processing' ? 'text-green-500 font-bold' : ''}`}  onClick={()=>handleClickTabOrder('processing')}>
                    <span>Đang xử lí</span>
                </div>
                <div className={`cursor-pointer ${typeOrder === 'delivery' ? 'text-green-500 font-bold' : ''}`}  onClick={()=>handleClickTabOrder('delivery')}>
                    <span>Vận chuyển</span>
                </div>
                <div className={`cursor-pointer ${typeOrder === 'complete' ? 'text-green-500 font-bold' : ''}`}  onClick={()=>handleClickTabOrder('complete')}>
                    <span>Hoàn thành</span>
                </div>
                <div className={`cursor-pointer ${typeOrder === 'refund' ? 'text-green-500 font-bold' : ''}`}  onClick={()=>handleClickTabOrder('refund')}>
                    <span>Hoàn đơn</span>
                </div>
                <div className={`cursor-pointer ${typeOrder === 'cancel' ? 'text-green-500 font-bold' : ''}`} onClick={()=>handleClickTabOrder('cancel')}>
                    <span>Đã hủy</span>
                </div>
                <FormReview close={handleCloseModal} IsChange={isReview} orderID={orderID} refreshData={getData}></FormReview>
                <FormRefund close={handleCloseModalRefund} IsChange={isRefund} orderID={orderID} refreshData={getData}></FormRefund>
            
            </div>
        </div>
        <div className='mt-4'>
            <div className='flex flex-row items-center border-2 bg-white rounded px-2 justify-between'>
                <input placeholder='Tìm kiếm đơn hàng' className='rounded p-3 w-full' onKeyDown={(e)=>{handleSearchOrder(e)}} onChange={(e)=>{handleEmptyInput(e)}} style={{outline: "none"}}></input>
                <div  className='cursor-pointer' onClick={()=>{handleClickSearchOrder()}}>
                    <Icon name={'search'} className='w-6 h-6 font-bold text-green-400'></Icon>
                </div>
            </div>
        </div>
        {
            typeOrder === 'all' && <div className="max-h-[900px] overflow-y-auto">
                {
                    arrOrder && arrOrder.filter((item) => item.state != 'Nháp').length > 0 ? (
                        arrOrder
                        .filter((item) => item.state != 'Nháp')
                        .map((item, index) => (
                            <div className='bg-white p-4 mt-4 rounded' key={index}>
                            <OrderItem data={item} refreshData={getData}  openReview={handleReview}></OrderItem>
                            </div>
                        ))
                    ) : (
                        <div>
                            <NoItem text={'Không có đơn hàng'}></NoItem>
                        </div>
                    )
                }
            </div>
        }
        {
            typeOrder === 'draf' && <div className="max-h-[900px] overflow-y-auto">
                {
                    arrOrder && arrOrder.filter((item) => item.state === "Nháp").length > 0 ? (
                        arrOrder
                        .filter((item) => item.state === "Nháp")
                        .map((item, index) => (
                            <div className='bg-white p-4 mt-4 rounded' key={index}>
                            <OrderItem data={item} refreshData={getData}></OrderItem>
                            </div>
                        ))
                    ) : (
                        <div>
                            <NoItem text={'Không có đơn hàng'}></NoItem>
                        </div>
                    )
                }
            </div>
            
        }
        {
            typeOrder === 'processing' && <div className="max-h-[900px] overflow-y-auto">
                {
                    arrOrder && arrOrder.filter((item) => item.state === 'Đang xử lí').length > 0 ? (
                        arrOrder
                        .filter((item) => item.state === 'Đang xử lí')
                        .map((item, index) => (
                            <div className='bg-white p-4 mt-4 rounded' key={index}>
                            <OrderItem data={item} refreshData={getData}></OrderItem>
                            </div>
                        ))
                    ) : (
                        <div>
                            <NoItem text={'Không có đơn hàng'}></NoItem>
                        </div>
                    )
                }
            </div>
            
        }
        {
            typeOrder === 'delivery' && <div className="max-h-[900px] overflow-y-auto">
                {
                    arrOrder && arrOrder.filter((item) => item.state === 'Đang vận chuyển').length > 0 ? (
                        arrOrder
                        .filter((item) => item.state === 'Đang vận chuyển')
                        .map((item, index) => (
                            <div className='bg-white p-4 mt-4 rounded' key={index}>
                            <OrderItem data={item} refreshData={getData}></OrderItem>
                            </div>
                        ))
                    ) : (
                        <div>
                            <NoItem text={'Không có đơn hàng'}></NoItem>
                        </div>
                    )
                }
            </div>
            
        }
        {
            typeOrder === 'complete' && <div className="max-h-[900px] overflow-y-auto">
                {
                    arrOrder && arrOrder.filter((item) => item.state === 'Hoàn thành').length > 0 ? (
                        arrOrder
                        .filter((item) => item.state === 'Hoàn thành')
                        .map((item, index) => (
                            <div className='bg-white p-4 mt-4 rounded' key={index}>
                            <OrderItem data={item} refreshData={getData} openReview={handleReview} openRefunds={handleRefund}  ></OrderItem>
                            </div>
                        ))
                    ) : (
                        <div>
                            <NoItem text={'Không có đơn hàng'}></NoItem>
                        </div>
                    )
                }
            </div>
            
        }
        {
            typeOrder === 'cancel' && <div className="max-h-[900px] overflow-y-auto">
                {
                    arrOrder && arrOrder.filter((item) => item.state === 'Đã hủy').length > 0 ? (
                        arrOrder
                        .filter((item) => item.state === 'Đã hủy')
                        .map((item, index) => (
                            <div className='bg-white p-4 mt-4 rounded' key={index}>
                            <OrderItem data={item} refreshData={getData}></OrderItem>
                            </div>
                        ))
                    ) : (
                        <div>
                            <NoItem text={'Không có đơn hàng'}></NoItem>
                        </div>
                    )
                }
            </div>
            
        }
         {
            typeOrder == 'refund' && <div className="max-h-[900px] overflow-y-auto">
                {
                    arrOrder && arrOrder.filter((item) => item.state.includes("Refund")).length > 0 ? (
                        arrOrder
                        .filter((item) => item.state.includes("Refund"))
                        .map((item, index) => (
                            <div className='bg-white p-4 mt-4 rounded' key={index}>
                            <OrderItem data={item} refreshData={getData}></OrderItem>
                            </div>
                        ))
                    ) : (
                        <div>
                            <NoItem text={'Không có đơn hàng'}></NoItem>
                        </div>
                    )
                }
            </div>
            
        }
    </div>
  )
}
