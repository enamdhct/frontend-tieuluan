'use client'
import React, {useEffect, useState} from 'react'
import { getUser, updateUser } from '@/services/userService'
import { getAllLocationUser, deleteLocation} from '@/services/locationService'
import AddAddress from '@/components/addAddress/addAddress'
import Form, {InputUpLoad} from '@/components/Form/Form'
import Link from 'next/link'
import FormChangePassword from '@/components/FormChangePassword/FormChangePassword'
import { Avatar } from '@nextui-org/react'
import { confirmDelete, alertSuccess } from '@/components/Swal/alert'

export default function page() {
    const [tab, setTab] = useState('info')
    const [userInfo, setUserInfo] = useState('')
    const [locationUser, setLocationUser] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isChangeAvatar, setIsChangeAvatar] = useState(false)
    const [linkIMG,setLinkIMG] = useState('');
    const [isChangePassword, setIsChangePassword] = useState(false)

    useEffect(()=>{
        getUserInfo()
        getLocation()
    },[])
    useEffect(()=>{
        if(userInfo){
            setLinkIMG(userInfo.avatarURL)
        }
    },[userInfo])
    async function getUserInfo (){
        const ID = localStorage.getItem('userID')
        let user = await getUser(ID)
        setUserInfo(user)
    }
    async function getLocation (){
        const ID = localStorage.getItem('userID')
        let location = await getAllLocationUser(ID)
        setLocationUser(location.locations)
    }
    function handleClickTab(type){
        setTab(type)
    }
    async function handleDeleteLocation (id){
        let isConfirm = await confirmDelete()
        if (isConfirm){
            let deleteAddress = await deleteLocation(id);
            if (deleteAddress){
                alertSuccess({ status: 'success', text: 'Xóa địa chỉ thành công' })
                getLocation()
            }

        }

    }

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
    function handleChangeAvatar (){
        setIsChangeAvatar(!isChangeAvatar)
    }
    async function handleUpdate (){
        let userID = localStorage.getItem("userID")
        const formData = {
            "avatarURL" : linkIMG
        }
        let update = await updateUser(userID, JSON.stringify(formData))
        if (update){
            getUserInfo()
            setIsChangeAvatar(false)
        }
        console.log(update);
    }
    function handleChangePassword(){
        setIsChangePassword(true)
    }
    function handleCloseModal(){
        setIsChangePassword(false)
    }

  return (
    <div>
        <div className='bg-white p-4 mt-2 rounded'>
            <div className='flex flex-row gap-5'>
                <div className={`cursor-pointer ${tab === 'info' ? 'text-green-500 font-bold' : ''}`}  onClick={()=>handleClickTab('info')}>
                    <span>Thông tin cá nhân</span>
                </div>
                <div className={`cursor-pointer ${tab === 'location' ? 'text-green-500 font-bold' : ''}`}  onClick={()=>handleClickTab('location')}>
                    <span>Địa chỉ</span>
                </div>
            </div>
        </div>
        {
            tab === 'info' && 
            <div className='bg-white mt-4 rounded p-12 text-lg flex flex-row w-full gap-5'>
                <div className='w-3/4'>
                    <div>
                        <h4>Hồ sơ cá nhận</h4>
                        <span>Quản lý hồ sơ cá nhân</span>
                    </div>
                    <hr />
                    <div className='flex justify-between'>
                        <h4 className='text-green-500 font-bold'>Thông tin cá nhân</h4>
                        <Link href={`customerInfo/update/${userInfo._id}`} className='no-underline'>
                            <span className='text-sky-500 font-bold'>Thay đổi</span>
                        </Link>
                    </div>
                    <div className='flex flex-col gap-3 mt-3'>
                        <div className='flex flex-row gap-2'>
                            <label htmlFor="" className='text-slate-500 w-1/5'>Họ và tên: </label>
                            <span>{userInfo.name}</span>
                        </div>
                        <div className='flex flex-row gap-2'>
                            <label htmlFor="" className='text-slate-500 w-1/5'>Giới tính: </label>
                            <span>{userInfo.gender}</span>
                        </div>
                        <div className='flex flex-row gap-2'>
                            <label htmlFor="" className='text-slate-500 w-1/5'>Ngày sinh: </label>
                            <span>{userInfo.birthday}</span>
                        </div>
                        <div className='flex flex-row gap-2'>
                            <label htmlFor="" className='text-slate-500 w-1/5'>Số điện thoại: </label>
                            <span>{userInfo.phone}</span>
                        </div>
                        <div className='flex flex-row gap-2'>
                            <label htmlFor="" className='text-slate-500 w-1/5'>Email: </label>
                            <span>{userInfo.email}</span>
                        </div>
                    </div>
                    <hr />
                    <div className='flex justify-between'>
                        <h4 className='text-green-500 font-bold'>Thông tin tài khoản</h4>
                        <span className='text-sky-500 font-bold cursor-pointer' onClick={()=>handleChangePassword()}>Đổi mật khẩu</span>
                    </div>
                    <div className='flex flex-col gap-3 mt-3'>
                    <div className='flex flex-row gap-2'>
                            <label htmlFor="" className='text-slate-500 w-1/5'>Tên đăng nhập: </label>
                            <span>{userInfo.username}</span>
                        </div>
                        <div className='flex flex-row gap-2'>
                            <label htmlFor="" className='text-slate-500 w-1/5'>Mật khẩu: </label>
                            <span>**********</span>
                        </div>
                    </div>
                </div>
                <div className='w-1/4'>
                        <div className='flex flex-col gap-3'>
                            <h4 className='flex justify-center'>Ảnh đại diện</h4>
                            {
                                isChangeAvatar ? 
                                <Form action={handleUpdate}>
                                    <InputUpLoad   InputUpLoad onChange={setLinkIMG} imgLink = {linkIMG}></InputUpLoad>
                                    <div className='font-bold text-green-500 cursor-pointer flex justify-center'>
                                        <button type='submit'>Lưu</button>
                                    </div>
                                </Form> : 
                            <>
                                {/* <div className='flex justify-center items-center flex-col rounded-full border-'>
                                    <img src={userInfo.avatarURL} width={200} height={200} alt="" className='rounded-full'/>
                                </div> */}
                                <div class="flex h-full w-full justify-center">
                                    <img class="inline-block h-52 w-52 border rounded-full ring-2 ring-white" src={userInfo.avatarURL} alt="" />
                                </div>
                                <div onClick={handleChangeAvatar}>
                                    <div className='font-bold text-green-500 cursor-pointer flex justify-center'>Thay đổi</div>
                                </div>
                            </>
                            }
                        </div>
                </div>
                <FormChangePassword close={handleCloseModal} IsChange={isChangePassword}></FormChangePassword>
            </div>
        }
        {
            tab === 'location' && 
            <div className='bg-white mt-4 rounded p-12 text-lg'>
                <div className='flex flex-row justify-between'>
                    <div>
                        <h4>Thông tin nhận hàng</h4>
                        <span>Quản lý thông tin nhận hàng</span>
                    </div>
                    <div className='cursor-pointer' onClick={openModal}>
                        <div className='px-3 py-1 text-base bg-green-500 rounded font-bold text-white'>Thêm địa chỉ</div>
                    </div>
                </div>
                <AddAddress isOpen={isModalOpen} onClose={closeModal} loadData={getLocation}/>
                <hr />
                <div className='flex flex-col gap-3 mt-3'>
                    <div><span className='text-slate-500 text-xl'>Địa chỉ</span></div>
                    <div>
                        {
                            locationUser && locationUser.map((item, index)=>(
                            
                                <div key={index} className='flex gap-2 flex-row mt-4 justify-between text-xl'>
                                    <div>
                                        <div className='flex flex-row gap-2'>
                                            <span>{item.customerName}</span>
                                            <span>|</span>
                                            <span>{item.phone}</span>
                                        </div>
                                        <div>
                                            <span className='text-lg text-slate-500'>
                                                {item.location}
                                            </span>
                                        </div>
                                    </div>
                                    <div className='flex flex-row items-center'>
                                        <div className='flex justify-between gap-4'>
                                            {/* <div className='px-2 text-base py-1 bg-sky-500 text-white rounded flex items-center h-fit cursor-pointer'>Thay đổi</div> */}
                                            <div className='px-2 text-base py-1 bg-red-500 text-white rounded flex items-center h-fit cursor-pointer' onClick={()=>handleDeleteLocation(item._id)}>Xóa</div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        }
    </div>
  )
}
