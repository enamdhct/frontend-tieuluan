
'use client'
import React, {useState, useEffect, useRef} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TextFW500 from '../textFW500/textFW500'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { usePathname, useParams } from 'next/navigation'
import { getUser } from '@/services/userService'
import { searchProductName } from '@/services/productService'
import ImgLogo from '@/assets/image/ArgiShop.png'
import Search from '../Search/Search'
import './header.css'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User} from "@nextui-org/react";
// import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenuToggle} from "@nextui-org/react";
import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Button} from "@nextui-org/react";


export default function header() {
    const router = useRouter()
    const params = useParams()
    const pathname = usePathname()
    const [token, setToken] = useState('')
    const [user, setUser] = useState('')
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [typeTab, setTypeTab] = useState('/')

    const [searchValue, setSearchValue] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(()=>{
        setToken(localStorage.getItem('accessToken'))
        getUserInfo()

    },[])
    useEffect(()=>{
        handleClickTab()
    }, [pathname])

    const handleDropdownToggle = () => {
      setDropdownOpen(!isDropdownOpen);
    };
    async function getUserInfo (){
        let userID  = localStorage.getItem('userID')
        let user = await getUser(userID)
        console.log(user);
        setUser(user)
    }
    function handleLogOut (){
        localStorage.removeItem('accessToken')
        localStorage.removeItem('userID')
        window.location.reload()
    }
    function handleClickTab (){
        setTypeTab(pathname)
    }
    async function handleInputChange (event){
        const valueInput = event.target.value;
        setSearchValue(valueInput);
        if (event.target.value === ''){
            setShowMenu(false);
        }
    }
    async function handleSearchProduct(e){
        if (e.key === 'Enter') {
            let results = await searchProductName(searchValue)
            setSearchResults(results.products);
            setShowMenu(true);
        }
    }
    async function handleClickSearchProduct(){
        console.log('huhu');
        let results = await searchProductName(searchValue)
        setSearchResults(results.products);
        setShowMenu(true);
    }
    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
      ];
  return (
    <div className='header flex flex-col justify-center w-full '>
        <div className='bg-green-500 flex h-16 items-center w-full px-[calc(100%-1660px)]'>
            <div className='w-full flex justify-between'>
                <TextFW500 text={'Tổng đài: 0123456789'}/>
                <div>
                    <div className='relative'>
                        <Search fnSearch={handleSearchProduct} fnChange={handleInputChange} fnClickSearch={handleClickSearchProduct}/>
                    </div>
                    {showMenu && (
                        <div className='menu absolute bg-slate-50 rounded p-3 mt-2' style={{ zIndex: 9999 }}>
                            <div>
                                {
                                    searchResults && searchResults.length > 0 ? (searchResults.slice(0, 5).map((item, index)=>(
                                        <div key={index} className='mt-2 hover:bg-slate-200 flex items-center p-2'>
                                            <Link href={`/product/${item._id}`} className='text-black no-underline'>
                                                <div className='flex flex-row gap-2'>
                                                    <div>
                                                        <img src={item.imgURL} alt="" width={70} height={70}/>
                                                    </div>
                                                    <div className='flex flex-col gap-2'>
                                                        <span className='font-bold text-lg'>{item.name}</span>
                                                        <span className='font-bold text-red-500'>{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                                    </div>
                                                </div>
                                            </Link>
                                            <hr />
                                        </div>
                                    ))) : (
                                        <div className='mt-2 p-2 flex items-center'>
                                            <span>Không có kết quả tìm kiếm</span>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
        {pathname !== `/payment/${params.id}` &&         
        <div>
            <div className='px-[calc(100%-1660px)] flex flex-row justify-between'>
                <div className='logo flex justify-start md:hidden'>
                    <Image className='rounded-full md:hidden'
                    src={ImgLogo}
                    width={200}
                    height={100}
                    alt='ImageLogo'/>
                </div>
                <div className='menu flex flex-col justify-end items-end'>
                    <div className='menu-top flex flex-row space-x-4 items-center'>
                        {/* <div className='text-green-500 font-bold'>
                            <span>Thông báo</span>
                        </div> */}
                        {token ?      

                        <div className="flex flex-col items-center gap-4">
                            <Dropdown placement="bottom-start">
                                <DropdownTrigger>
                                <div className='flex flex-row gap-2 items-center'>
                                    <span>{user.name}</span>
                                    <img className="inline-block h-12 w-12 border rounded-full ring-2 ring-white" src={user.avatarURL} alt="" />
                                </div>
                              
                                </DropdownTrigger>
                             
                                <DropdownMenu aria-label="User Actions" variant="flat">
                                <DropdownItem key="settings">
                                    <Link href={'/customerInfo'} className='no-underline text-black'>
                                        <div className='flex justify-center items-center'>Thông tin cá nhân</div>
                                    </Link>
                                </DropdownItem>
                                <DropdownItem key="build">
                                    <Link href={'/build'} className='no-underline text-black'>
                                        <div className='flex justify-center items-center'>Tự build máy tính</div>
                                    </Link>
                                </DropdownItem>
                                <DropdownItem key="logout" color="danger">
                                    <div className='flex justify-center cursor-pointer' onClick={handleLogOut}>Đăng xuất</div>
                                </DropdownItem>

                                </DropdownMenu>
                            </Dropdown>
                            <div className='flex flex-row gap-2 items-center'>
                                    <span className='font-bold text-[24px] text-yellow-500'>{user?.coin?.toLocaleString('vi-VN') || 0}</span>
                                    <img className='h-[50px] w-[50px]' src="./dollar.gif" alt="" />
                                </div>
                        </div>
                         :
                        <div className='flex flex-row space-x-4'>
                            <Link href={'/auth/register'} className='no-underline'>
                                <div className='text-green-500 font-bold'>
                                    <span>Đăng ký</span>
                                </div>
                            </Link>
                            <div>|</div>
                            <Link href={'/auth/login'} className='no-underline'>
                                <div className='text-green-500 font-bold'>
                                    <span>Đăng nhập</span>
                                </div>
                            </Link>
                        </div>
                        }
                    </div>
                    <div className='menu-bottom mx-5 my-2'>
                        <ul className='flex flex-row space-x-4 font-medium text-lg text-black' >
                            <Link href={'/'} className="no-underline text-black">
                                <li className={`hover:text-green-400 ${typeTab === '/' ? 'text-green-400 font-bold' : ''}`}>TRANG CHỦ</li>
                            </Link>
                            <Link href='/introduce' className="no-underline text-black">
                                <li className={`hover:text-green-400 ${typeTab === '/introduce' ? 'text-green-400 font-bold' : ''}`}>GIỚI THIỆU</li>
                            </Link>
                            <Link href={'/policy'} className="no-underline text-black">
                                <li className={`hover:text-green-400 ${typeTab === '/policy' ? 'text-green-400 font-bold' : ''}`}>CHÍNH SÁCH</li>
                            </Link>
                            <Link href={'/product'} className="no-underline text-black">
                                <li className={`hover:text-green-400 ${typeTab === '/product' ? 'text-green-400 font-bold' : ''}`}>SẢN PHẨM</li>
                            </Link>
                            {
                                token ?
                                <Link href={'/cart'} className="no-underline text-black">
                                    <li className={`hover:text-green-400 ${typeTab === '/cart' ? 'text-green-400 font-bold' : ''}`}>GIỎ HÀNG</li>
                                </Link> :
                                <Link href={'/auth/login'} className="no-underline text-black">
                                    <li className={`hover:text-green-400 ${typeTab === '/cart' ? 'text-green-400 font-bold' : ''}`}>GIỎ HÀNG</li>
                                </Link>
                            }
                            <Link href={'/contact'} className="no-underline text-black">
                                <li className={`hover:text-green-400 ${typeTab === '/contact' ? 'text-green-400 font-bold' : ''}`}>LIÊN HỆ</li>
                            </Link>
                            {
                                token ?                             
                                <Link href={'/userOrder'} className="no-underline text-black">
                                    <li className={`hover:text-green-400 ${typeTab === '/userOrder' ? 'text-green-400 font-bold' : ''}`}>ĐƠN HÀNG</li>
                                </Link> : 
                                <Link href={'/auth/login'} className="no-underline text-black">
                                    <li className={`hover:text-green-400 ${typeTab === '/userOrder' ? 'text-green-400 font-bold' : ''}`}>ĐƠN HÀNG</li>
                                </Link>
                            }
                            {
                                  token ?                             
                                <Link href={'/vouchers'} className="no-underline text-black">
                                    <li className={`hover:text-green-400 ${typeTab === '/vouchers' ? 'text-green-400 font-bold' : ''}`}>MÃ GIẢM GIÁ</li>
                                </Link> : 
                                <Link href={'/auth/login'} className="no-underline text-black">
                                    <li className={`hover:text-green-400 ${typeTab === '/userOrder' ? 'text-green-400 font-bold' : ''}`}>MÃ GIẢM GIÁ</li>
                                </Link>
                            }

                        </ul>
                    </div>
                </div>
            </div>
        </div>}          
    </div>
  )
}
