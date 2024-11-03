import React, {useEffect, useState} from 'react'
import URL from '@/assets/image/raumau.jpg'
import { getUser } from '@/services/userService';
import { repComment } from '@/services/commentService';
import Icon from '../Icon/Icon';
import AddComment from '../AddComment/AddComment';
const moment = require('moment');

export default function Comment({comment, funDelete, funDeleteRep, type, commentId, refreshData}) {
    const [date, setDate] = useState('')
    const [isOptionsVisible, setIsOptionsVisible] = useState(false);
    const [isAction, setIsAction] = useState(false)
    const [user, setUser] = useState('')
    const [isAddComment, setIsAddComment] = useState(false)
    const [userLogin, setUserLogin] = useState('')
    useEffect(()=>{
        processingData()
        getCustomer()
    }, [comment])
    useEffect(()=>{
        getUserLogin()
    }, [])

    function processingData (){
        setDate(moment(comment.createdAt).format("DD/MM/YYYY HH:mm:ss"))
    }
    async function getCustomer (){
        let user = await getUser(comment.userID)
        setUser(user)
        console.log(user)
    }
    async function getUserLogin (){
        let userID = localStorage.getItem('userID')
        let user = await getUser(userID)
        setUserLogin(user)
        
    }
    const handleMouseEnter = () => {
        let userID = localStorage.getItem('userID')
        console.log(userID);
        console.log(comment.userID);
        console.log(user.role);
        if (userID === comment.userID || userLogin.role === 'admin'){
            setIsOptionsVisible(true);
        }
      };
    
    const handleMouseLeave = () => {
        setIsOptionsVisible(false);
        setIsAction(false)
    };
    const handleOptionsClick = () => {
        setIsAction(!isAction)
    };

    // const handleEditComment = () => {
    //     console.log('Edit comment clicked');
    // };

    const handleDeleteComment = () => {
        if(type === 'comment'){
            let deleteCmt = funDelete(comment._id)
            console.log('Delete comment clicked');
            console.log(comment)
        }else {
            let deleteCmt = funDeleteRep(commentId, comment._id)
            console.log('hihi');
            console.log(comment)
            console.log(commentId);

        }
    };
    const handleClickAddComment = () => {
        setIsAddComment(!isAddComment)
    }
    async function handleAddRepComment (e) {
        let userID = localStorage.getItem('userID')
        const formData = {
            "userID": userID,
            "content": e.get('comment'),
            "like": 0,
            "commentId": commentId
        }
        console.log(formData)
        let rep = await repComment(JSON.stringify(formData))
        console.log(rep);
        if(rep){
            refreshData()
            setIsAddComment(false)
        }
    }
  return (
    <div>
        <div className='flex flex-col gap-2'>
            <div className='flex flex-row gap-4'>
                <div className='flex items-center'>
                    <img className='rounded-full' src={user.avatarURL} alt=""  width={50} height={50}/>
                </div>
                <div className='flex flex-col gap-1 w-full'>
                    <span className='text-slate-500'>{user.name}</span>
                    <div className='bg-slate-100 flex items-center p-2 rounded' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <div className='flex flex-row justify-between w-full items-center'>
                            <p className='m-0'>{comment.content}</p>
                            {isOptionsVisible && (
                                <div onClick={handleOptionsClick} className='relative'>
                                    <Icon name={'threeDots'} className='w-5 h-5 font-bold text-red-500'></Icon>
                                    {isAction && (
                                        <div className='absolute top-full right-0 bg-white shadow-md flex justify-center items-center'>
                                            <ul className='p-3 m-0'>
                                                {/* <li onClick={handleEditComment} className='cursor-pointer'>Sửa</li> */}
                                                <li onClick={handleDeleteComment} className='cursor-pointer'>Xóa</li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='flex flex-row gap-4'>
                        <span className='cursor-pointer' onClick={handleClickAddComment}>Trả lời</span>
                        <div>
                            <span className='text-slate-400 text-base'>{date}</span>
                        </div>
                    </div>
                </div>
            </div>
            {
                isAddComment && 
                <AddComment add={handleAddRepComment}></AddComment>
            }
        </div>
    </div>
  )
}
