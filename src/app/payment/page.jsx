"use client"
import React, { useEffect, useState } from 'react'

export default function page() {
    const [arrProduct, setArrProduct] = useState([]);
    useEffect(()=>{
      const getMessage = e => {
        if (e.data.message=='payment') {
          console.log(e.data.data);
          setArrProduct(e.data.data.selectedProducts)
          console.log(e.data.data);
        }
      }
      window.addEventListener('message', getMessage)
      return () => {
        document.removeEventListener('message', getMessage) 
      }
    },[])

  return (
    <div>
      {arrProduct && arrProduct.map((product, index) => <div key={index}>{product}</div>)}
      {arrProduct && console.log(arrProduct)}
    </div>
  )
}
