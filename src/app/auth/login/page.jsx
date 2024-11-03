'use client'
import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Login } from '@/services/authService'
import GoogleLoginButton from '@/components/NextAuth/NextAuth'

export default function page() {
    const router = useRouter()
    const [username,setusername] = useState('')
    const [password,setPassword] = useState('')

    const handleOnChangeUsername = (event) => {
        setusername(event.target.value)
    }
    const handleOnChangePassword = (event) => {
        setPassword(event.target.value)
    }
    async function handleLogin (){
        const formData = {
            "username": username,
            "password": password
        }
        let login = await Login(JSON.stringify(formData))
        
        localStorage.setItem('accessToken', login.accessToken);
        localStorage.setItem('userID', login._id);
        if(login.accessToken){
            router.push('/', { scroll: false })
        }
    }

  return (
    <div>
        <div className='bg-white p-3'>
            <div>
                <h2>Chào mừng bạn đến với NN Shop</h2>
            </div>
            <div className='flex flex-row gap-5 mt-4'>
                <div className='flex flex-col gap-3 w-2/3'>
                    <div className='flex flex-col gap-3'>
                        <label htmlFor="">Tên đăng nhập *</label>
                        <input type="text" placeholder='Nhập tên đăng nhập' className='border-2 rounded' onChange={(e)=>{handleOnChangeUsername(e)}}/>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label htmlFor="">Mật khẩu *</label>
                        <input type="password" placeholder='Nhập mật khẩu' className='border-2 rounded' onChange={(e)=>{handleOnChangePassword(e)}}/>
                    </div>
                    <div>
                        <span>
                            Nếu chưa có tài khoản, bạn có thể <Link href={'/auth/register'}>Đăng ký tại đây</Link>
                        </span>
                    </div>
                </div>
                <div className='w-1/3'>
                    <div className='flex justify-center'>
                        <h5>Sử dụng phương thức khác</h5>
                    </div>
                    <div className='flex gap-2 flex-col'>
                        <div className='font-bold text-lg p-2 rounded flex flex-row items-center gap-2 justify-center border-2'>
                            <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-Zalo-App-Rec.png" width={30} height={30} alt="" className='rounded-full' /><span>Zalo</span>
                        </div>
                        <div className='font-bold text-lg p-2 rounded flex flex-row gap-2 justify-center items-center border-2'>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png" width={30} height={30} alt="" /><span>Facebook</span>
                        </div>
                        <div className='font-bold text-lg p-2 rounded flex justify-center border-2 flex-row gap-2'>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png" width={30} height={30} alt="" /><span>Google</span>
                        </div>
                        {/* <GoogleLoginButton></GoogleLoginButton> */}
                    </div>
                </div> 
            </div>
            <div className='mt-4'>
                <div className='bg-red-500 cursor-pointer text-white text-lg font-bold w-fit p-2 rounded' onClick={handleLogin}>Đăng nhập</div>
            </div>
        </div>
    </div>
  )
}
