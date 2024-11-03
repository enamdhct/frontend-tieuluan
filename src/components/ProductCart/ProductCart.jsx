import React, { useState, useEffect } from 'react';
import { deleteCart } from '@/services/cartService';
import { confirmDelete, alertSuccess } from '../Swal/alert';
import { getWareByProductID } from '@/services/warehouseService';

import UpDown from '../UpDown/UpDown'

export default function ProductCart({product, isCheck, addSelectProdut, deleteSelectProduct, arrSelected, setArrProduct, refreshData, index, arrCart}) {
    const [totalPrice, setTotalPrice] = useState('');
    const [sl, setValue] = useState(1);
    const [check, setCheck] = useState(isCheck);
    const [amount, setAmount] = useState('')

    useEffect(() => {
        
        const updatedArrOrder = arrSelected.map((item) => {
            if (item.productID == product._id) {
              item.quantity = sl; // Thay đổi giá trị state
              item.totalPrice = sl * product?.price;
            }
            return item; // Trả về đối tượng sau khi đã sửa
        });
        setTotalPrice(parseInt(sl)*product?.price)
        console.log(updatedArrOrder);
        setArrProduct(updatedArrOrder)
        handleChangeInput()
    }, [sl]);
    useEffect(()=>{
        if (product){
          getAmountWarehouse(product?._id)
        }
      }, [product?._id])

    useEffect(() => {
        setCheck(isCheck);
        handleCheckAll()
      }, [isCheck]);

    function handleChangeInput (){
        let productObj = [{
            "productID": product?._id,
            "price": product?.price,
            "quantity": sl,
            "totalPrice": totalPrice,
            "name": product?.name,
            "imgProduct": product?.imgURL
        }]
        deleteSelectProduct(productObj)
    }
    async function getAmountWarehouse(id){
        console.log(id);
        let amount = await getWareByProductID(JSON.stringify({"productID": id}))
        setAmount(amount[0].quantity)
        console.log(amount[0].quantity);
      }
    function handleCheckAll (){
        let productObj = [{
            "productID": product?._id,
            "price": product?.price,
            "quantity": sl,
            "totalPrice": totalPrice,
            "name": product?.name,
            "imgProduct": product?.imgURL
        }]
        if (isCheck){
            // addSelectProdut(productObj)
            arrSelected.push(...productObj)
        }
        else {
            setArrProduct([])
        }
    }
    
    function handleChangeCheckbox (e){
        setCheck(!check)
        console.log(e.target.checked);
        let productObj = {
            "productID": product?._id,
            "price": product?.price,
            "quantity": sl,
            "totalPrice": totalPrice,
            "name": product?.name,
            "imgProduct": product?.imgURL
        }
        if (e.target.checked){
            addSelectProdut(productObj)
        } else {
            deleteSelectProduct(productObj)
        }
    }
    async function handleDeleteCart (){
        const isConfirm = await confirmDelete()
        if (isConfirm) {
            let delCart = await deleteCart(arrCart[index]._id)
            if (delCart){
                refreshData()
                alertSuccess({ status: 'success', text: 'Đã xóa sản phẩm khỏi giỏ hàng' })
            } else {
                alertSuccess({ status: 'error', text: 'Có lỗi xãy ra' })
            }
        }
    
    }
  return (
    <div className='flex flex-row p-4 justify-between'>
        <div className='flex flex-row items-center gap-4 w-2/6'>
            <div>
                <input type="checkbox" name="" id="" checked={check  === true} onChange={(e) => handleChangeCheckbox(e)}/>
            </div>
            <div>
                {product?.imgURL &&             
                <img src={product?.imgURL} width={100} height={100} alt='product image'></img>}
            </div>
            <div>
                <span>{product?.name} {amount===0 && '(Hết hàng)'}</span>
            </div>
        </div>
        <div className='flex flex-row items-center justify-center w-1/6'>
            <span>{product?.price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
        </div>
        <div className='flex flex-row items-center justify-center w-1/6'>
            <UpDown setValue={setValue} value={sl} amount={amount}></UpDown>
        </div>
        
        <div className='flex flex-row items-center justify-center w-1/6'>
            <span>{totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
        </div>
        <div className='flex flex-row items-center justify-center w-1/6 cursor-pointer' onClick={handleDeleteCart}>
            <span>Xóa</span>
        </div>
    </div>
  )
}
