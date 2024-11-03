'use client'
import React, {useState, useEffect} from 'react'
import { alertSuccess } from '@/components/Swal/alert'
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {Slider} from "@nextui-org/react";
import { createReview } from '@/services/reviewService';
import { getUser } from '@/services/userService';
import { updateOrder } from '@/services/orderService';

export default function FormReview({IsChange, close, orderID, refreshData}) {
    console.log(IsChange);
    const router = useRouter()
    const [user, setUser]= useState('')
    const [userID, setUserID]= useState('')



    useEffect(()=>{
        getUserInfo()
    }, [])

    async function getUserInfo (){
        let ID = localStorage.getItem('userID')
        let user = await getUser(ID)
        setUser(user)
        setUserID(ID)
    }
    async function handleReview(data){
        console.log(user._id);
        const formData = {
            "user": {
                "name": user.name,
                "avt": user.avatarURL
            },
            "content": data.review,
            "orderID": orderID,
            "rate": data.rating
        }
        console.log(formData)
        let create = await createReview(JSON.stringify(formData))
        console.log(create);

        if (!create){
            alertSuccess({status: "error", text: "Đã xãy ra lỗi vui lòng thử lại"})
            // router.push('/customer')
        } else {
            let update = await updateOrder(orderID, JSON.stringify({"isReview": "yes"}))
            if (update){
                refreshData()
                alertSuccess({status: "success", text: "Đánh giá thành công"})
                close()
            }
        }
    }
    const validationSchema = Yup.object({
        review: Yup.string().required('Vui lòng nhập nhập đánh giá'),
    });
    const ReviewForm = () => {
        const formik = useFormik({
            initialValues: {
            review: '',
            rating: 5,

            },
            validationSchema: validationSchema,
            onSubmit: async (values) => {
            await handleReview(values);
            },
        });
        return (
            <div className="flex flex-col gap-4 px-5 pb-5">
                <form onSubmit={formik.handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="review">Nội dung đánh giá:</label>
                        <input
                            type="text"
                            name="review"
                            id="review"
                            className={`rounded border-2 ${formik.touched.review && formik.errors.review ? 'border-red-500' : ''}`}
                            onChange={formik.handleChange}
                            value={formik.values.review}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.review && formik.errors.review && (
                            <span className="text-red-500">{formik.errors.review}</span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2 mt-4">
                        <label htmlFor="review">Điểm đánh giá:</label>
                        <Slider 
                            label={"Điểm"}
                            color={"warning"}
                            showTooltip={true}
                            step={1} 
                            maxValue={5} 
                            minValue={0} 
                            defaultValue={5}
                            className="max-w-md"
                            onChange={(value) => formik.setFieldValue('rating', value)}
                        />
                    </div>
                    <div className='flex flex-row gap-4'>
                        <button type="submit" className="bg-red-500 text-white font-bold w-fit p-2 rounded mt-4">
                            Xác nhận
                        </button>
                        <button className=' border font-bold w-fit p-2 rounded mt-4' onClick={()=> close()}>Đóng</button>
                    </div>
                </form>
                
            </div>
        )
    }

  return (
    <div className={IsChange === false ? "hidden" : ""}>
        <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg" style={{width: '30%'}}>
                        <div className='font-bold text-xl pt-5 flex justify-center'>
                            <span>Đánh giá đơn hàng</span> 
                        </div>
                        <ReviewForm></ReviewForm>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
