"use client";
import React, { useEffect, useState } from "react";
import { getCartOfUser, deleteCart } from "@/services/cartService";
import { getProduct } from "@/services/productService";
import { useRouter } from 'next/navigation'

import ProductCart from "@/components/ProductCart/ProductCart";
import { createOrder } from "@/services/orderService";

import Link from "next/link";
import { confirmDelete, alertSuccess } from "@/components/Swal/alert";
import { getWareByProductID } from "@/services/warehouseService";

export default function page() {
    const router = useRouter()
    const [arrCart, setArrCart] = useState("");
    const [price, setPrice] = useState("");
    const [arrProduct, setArrProduct] = useState([]);

    const [checkAll, setCheckAll] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);

    useEffect(() => {
        getCart();
    }, []);
    useEffect(()=>{
        console.log(selectedProducts)
        if (selectedProducts){
            CaculatorSumPrice();
        }
    }, [selectedProducts])


    async function getCart() {
        let userID = localStorage.getItem('userID')
        let arr_Carts = await getCartOfUser(userID);
        setArrCart(arr_Carts);
        let arr = [];
        for (let i = 0; i < arr_Carts.length; i++) {
            let product = await getProduct(arr_Carts[i].productID);
            arr.push(product);
        }
        setArrProduct(arr);
    }
    function handleCheck (){
        setSelectedProducts([])
        setCheckAll(!checkAll)
    }
    function addSelectProdut (product){
        
        let updatedSelectedProducts = [...selectedProducts];
        const existingProductIndex = updatedSelectedProducts.findIndex(
            (item) => item.productID === product.productID
        );
        console.log(existingProductIndex);
        if (existingProductIndex === -1) {
            updatedSelectedProducts.push(product);
        }
        setSelectedProducts(updatedSelectedProducts);
    }
    function deleteSelectProduct (product){
        let deletedProducts = [...selectedProducts];
        let productIDToDelete = product.productID;
        if (productIDToDelete === undefined){
            productIDToDelete = product[0].productID
        }

        const updatedProducts = deletedProducts.filter(product => product.productID !== productIDToDelete);
        // setSelectedProducts(updatedProducts);
    }
    async function handleDeleteCart (){
        var arrIDProduct = []
        for(let i=0; i<selectedProducts.length;i++){
            arrIDProduct.push(selectedProducts[i].productID)
        }
        for(let i=0; i<arrIDProduct.length;i++){
            let filterCart = arrCart.filter(item => item.productID === arrIDProduct[i])
            console.log(filterCart[0]._id)
            if(filterCart.length > 0){
                const isConfirm = await confirmDelete()
                if (isConfirm) {
                    let delCart = await deleteCart(filterCart[0]._id)
                }
            }

        }
        getCart()
    }
    async function deleteCartWhenOrder (){
        var arrIDProduct = []
        for(let i=0; i<selectedProducts.length;i++){
            arrIDProduct.push(selectedProducts[i].productID)
        }
        for(let i=0; i<arrIDProduct.length;i++){
            let filterCart = arrCart.filter(item => item.productID === arrIDProduct[i])
            if(filterCart.length > 0){
                let delCart = await deleteCart(filterCart[0]._id)    
            }
        }
    }
    async function handlePayment(){
        console.log({selectedProducts});
        for(let i = 0; i<selectedProducts.length; i++){
            console.log(selectedProducts[i].productID);
            let ware = await getWareByProductID(JSON.stringify({"productID": selectedProducts[i].productID}))
            if (ware[0].quantity < selectedProducts[i].quantity){
                return alertSuccess({ status: 'error', text: `Sản phẩm ${selectedProducts[i].name} tạm hết hàng. Vui lòng quay lại sau.` })
            }
        }
        let orderInfo = {
            'product': selectedProducts,
            'state': "Nháp",
        }
        let addOrder = await createOrder(JSON.stringify(orderInfo))
        if (addOrder && addOrder._id) {
            // window.location.href = `/payment/${addOrder._id}`;
            deleteCartWhenOrder()
            router.push(`/payment/${addOrder._id}`);
        } else {
            console.error("Không thể lấy được ID của đơn hàng");
        }
    }

    function CaculatorSumPrice(){
        let price = 0
        if (selectedProducts){
            for(let i=0; i<selectedProducts.length;i++){
                price = price + selectedProducts[i].totalPrice
            }
        }
        setPrice(price)
        // return price
    }
    return (
        <div className="flex flex-col">
            <div className="flex flex-row p-4 justify-between bg-white rounded">
                <div className="w-2/6">
                    <input type="checkbox" name="" id="checkedAll" onChange={handleCheck}/>
                </div>
                <div className="flex justify-center w-1/6">
                    <span>Đơn giá</span>
                </div>
                <div className="flex justify-center w-1/6">
                    <span>Số lượng</span>
                </div>
                <div className="flex justify-center w-1/6">
                    <span>Số tiền</span>
                </div>
                <div className="flex justify-center w-1/6">
                    <span>Thao tác</span>
                </div>
            </div>
            <div className="bg-white rounded mt-4">
                {arrProduct.length > 0 &&
                    arrProduct.map((item, index) => (
                        <ProductCart key={index} index={index} arrCart={arrCart} refreshData={getCart} arrSelected = {selectedProducts} setArrProduct={setSelectedProducts} product={item} isCheck={checkAll} addSelectProdut={addSelectProdut} deleteSelectProduct ={deleteSelectProduct}></ProductCart>
                    ))}
            </div>
            <div className="bg-white rounded mt-4">
                <div className="flex flex-row p-3 gap-5 items-center justify-between">
                    <div className="flex flex-row gap-4 items-center">
                        <div className="w-2/6">
                            <input type="checkbox" name="" id="checkedAll" onChange={handleCheck}/>
                        </div>
                        <div onClick={handleDeleteCart}>
                            <button className="p-2 bg-rose-600 rounded text-white font-bold">Xóa</button>
                        </div>
                    </div>
                    <div className="flex flex-row items-center gap-4">
                        <div>
                            <span>
                                Tổng thanh toán (Sản phẩm)
                            </span>
                        </div>
                        <div>
                            <span className="text-rose-600 font-bold">{price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                        </div>
                        {/* <Link href={`/payment`} onClick={()=>{window.postMessage({message:'payment',data:{selectedProducts}},"*")}}> */}
                            <div>
                                <button className="p-2 bg-orange-500 rounded text-white font-bold" onClick={handlePayment}>Thanh toán</button>
                            </div>
                        {/* </Link> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
