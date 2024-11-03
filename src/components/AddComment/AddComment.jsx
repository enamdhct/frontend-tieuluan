import React, {useState, useEffect} from 'react'
import Icon from '../Icon/Icon'
import { getUser } from '@/services/userService'

export default function AddComment({add}) {
    const [user, setUser] = useState('')

    useEffect(()=>{
        getCustomer()
    }, [])

    async function getCustomer (){
        let userID = localStorage.getItem('userID')
        let user = await getUser(userID)
        setUser(user)
        console.log(user)
    }
  return (
    <div>
        <div className='flex flex-row gap-4'>
            <div className='flex items-center'>
                <img className='rounded-full' src={user.avatarURL} alt=""  width={50} height={50}/>
            </div>
            <div className='w-full py-3 border-slate-400 rounded'>
                <form action={(e)=>{add(e)}}>
                    <div className='flex flex-row border border-slate-400 rounded items-center p-2'>
                        <input type="text" name='comment' placeholder='Nhập nộp dung' className='border-0 bg-transparent focus:outline-white w-full'/>
                        <button type='submit'>
                            <Icon name={'send'} className='w-8 h-8 font-bold'></Icon>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <hr />
    </div>
  )
}
