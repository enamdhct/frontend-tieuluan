"use client"
import React, { useEffect, useState } from 'react'
import Search from '@/components/Search/Search'
import Product from '@/components/Product/Product'
import { getAllCategory } from '@/services/categoryService'
import { getAllProductWithCategory, searchProductName, getAllProduct, getAll } from '@/services/productService'
import Link from 'next/link'


export default function page() {
    const [product, setProduct] = useState('')
    const [category, setCategory] = useState('')
    const [IDCategoryCurrent, setIDCategoryCurrent] = useState('all')
    const [amount, setAmount] = useState(8)
    const [searchValue, setSearchValue] = useState('');
    const [startPrice,setStartPrice] = useState(0)
    const [endPrice,setEndPrice] = useState(10_0000_000_000)



    useEffect(() => {
        getData()
        getCategoryName()
    }, [])

    useEffect(() => {
        if (category) {
            getData()
        }
    }, [category])
    async function getData() {
        const res = await getAll()
        setProduct(res)
        console.log(category[0]);
    }
    async function getCategoryName() {
        let arrCategory = await getAllCategory()
        setCategory(arrCategory.filter(element => element.isActive !== "Ẩn"))
    }
    async function handleChangeSelect(id) {
        console.log({ id });

        if (id === '653a9c825070cb4913244992' || id == 'All') {
            getData()
        } else {
            let arrProduct = await getAllProductWithCategory(id)
            setProduct(arrProduct.products)
            setIDCategoryCurrent(id)
        }
    }
    async function filterPrice() {
        try {
            let productCurrent = await getAll();
            console.log({startPrice},{endPrice},productCurrent);
            
            productCurrent = productCurrent.filter(product => {
                return Number(product?.price) >= Number(startPrice) && Number(product?.price) <= Number(endPrice)
            });
            console.log({startPrice},{endPrice},productCurrent);

            setProduct(productCurrent)
        } catch (err) {
            console.log({ err });

        }
    }
    async function handleSearchProduct(e) {
        if (e.key === 'Enter') {
            const searchText = e.target.value;
            const filteredProducts = product.filter(element => element.name.toLowerCase().includes(searchText.toLowerCase()));
            setProduct(filteredProducts);
        }
    }
    async function handleClickSearchProduct() {
        const searchText = searchValue;
        const filteredProducts = product.filter(element => element.name.toLowerCase().includes(searchText.toLowerCase()));
        setProduct(filteredProducts);
    }
    async function handleEmptyInput(e) {
        if (e.target.value === '') {
            let arrProduct = await getAllProductWithCategory(IDCategoryCurrent)
            setProduct(arrProduct.products)
        } else {
            setSearchValue(e.target.value)
        }
    }

    function handleClickViewMore() {
        setAmount(amount + 8)
    }
    function handleClickCollapse() {
        setAmount(Math.max(amount - 8, 8))
    }

    return (
        <div className='mb-4 bg-white p-8 rounded'>
            <div className='flex flex-row justify-between'>
                <div className='flex gap-3'>
                <select className='rounded' onChange={(e) => { handleChangeSelect(e.target.value) }}>
                    {
                        category && [{ _id: 'All', name: "All" }, ...category].map((item, index) => {
                            return (
                                <option value={item._id} key={index}>{item.name}</option>
                            )
                        })
                    }
                    {/* <option value="different">Khác</option> */}
                </select>
                <div className="flex items-center gap-3">
                    <span className='font-bold'>Price: </span>
                    <input type="number" onChange={(e)=> setStartPrice(e.target.value)} />
                    -
                    <input type="number" onChange={(e)=> setEndPrice(e.target.value)} />
                    <button className='px-4 py-2 bg-green-500 rounded-lg text-white' onClick={()=>filterPrice()}>Tìm</button>
                </div>
                </div>
               
                <Search fnSearch={handleSearchProduct} fnChange={handleEmptyInput} fnClickSearch={handleClickSearchProduct} />
            </div>
         
            <div className='flex flex-row flex-wrap'>
                {product &&
                    product.filter(element => element.isActive === "Hiện").slice(0, amount).map((item, index) => {
                        return (
                            <Link href={`/product/${item._id}`} key={index} className='w-1/4 p-2'>
                                <Product product={item} />
                            </Link>
                        )
                    })
                }
            </div>
            <div className='w-full flex justify-center mt-4 gap-4'>
                {
                    amount > 8 &&
                    <div className='rounded-md border-2 border-green-600 w-fit px-10 py-1 cursor-pointer' onClick={() => handleClickCollapse()}>
                        <span className='text-green-600'>Ẩn bớt</span>
                    </div>
                }
                <div className='rounded-md border-2 border-green-600 w-fit px-10 py-1 cursor-pointer' onClick={() => handleClickViewMore()}>
                    <span className='text-green-600'>Xem thêm</span>
                </div>
            </div>
        </div>
    )
}
