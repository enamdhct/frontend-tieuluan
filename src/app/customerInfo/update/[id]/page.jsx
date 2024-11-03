'use client'
import React, {useState, useEffect} from 'react'
import { alertSuccess } from '@/components/Swal/alert'
import { useRouter } from 'next/navigation'
import { updateUser, getUser } from '@/services/userService'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link'

export default function page({params}) {
    const router = useRouter()
    const [user, setUser]= useState('')

    useEffect(()=>{
        getUserInfo()
    }, [params])

    async function getUserInfo (){
        let user = await getUser(params.id)
        setUser(user)
    }
    async function handleUpdate(data){
        const formData = {
            "name": data.name,
            "email": data.email,
            "birthday": data.birthday,
            "gender": data.gender,
            "location": data.location,
            "phone": data.phone,
        }
        let update = await updateUser(params.id, JSON.stringify(formData))
        console.log(formData);
        if (update){
            alertSuccess({status: "success", text: "Thay đổi thông tin thành công"})
            router.push('/customerInfo')
        }
    }
    const validationSchema = Yup.object({
        name: Yup.string().required('Vui lòng nhập họ và tên của bạn'),
        email: Yup.string().email('Email không hợp lệ'),
        birthday: Yup.date(),
        gender: Yup.string().oneOf(['Nam', 'Nữ', 'Khác'], 'Vui lòng chọn giới tính'),
        location: Yup.string(),
        phone: Yup.string(),
    });
    const RegistrationForm = () => {
        const formik = useFormik({
            initialValues: {
            name: user.name,
            email: user.email,
            birthday: user.birthday,
            gender: user.gender,
            location: user.location,
            phone: user.phone,
            },
            validationSchema: validationSchema,
            onSubmit: async (values) => {
            await handleUpdate(values);
            },
        });
        return (
            <div className="flex flex-col gap-3">
                <form onSubmit={formik.handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Họ và tên</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className={`rounded border-2 ${formik.touched.name && formik.errors.name ? 'border-red-500' : ''}`}
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.name && formik.errors.name && (
                            <span className="text-red-500">{formik.errors.name}</span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email">Địa chỉ Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className={`rounded border-2 ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''}`}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <span className="text-red-500">{formik.errors.email}</span>
                        )}
                    </div>
                    <div className="flex flex-row gap-5">
                        <div className="flex flex-col gap-2 w-1/2">
                            <label htmlFor="birthday">Ngày sinh</label>
                            <input
                                type="date"
                                name="birthday"
                                id="birthday"
                                className={`rounded border-2 ${formik.touched.birthday && formik.errors.birthday ? 'border-red-500' : ''}`}
                                onChange={formik.handleChange}
                                value={formik.values.birthday}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.birthday && formik.errors.birthday && (
                                <span className="text-red-500">{formik.errors.birthday}</span>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 w-1/2">
                            <span>Giới tính</span>
                            <div className="flex flex-row gap-5">
                                <label htmlFor="gender-male">
                                    <input
                                        type="radio"
                                        value="Nam"
                                        name="gender"
                                        id="gender-male"
                                        className={`rounded border-2 ${formik.touched.gender && formik.errors.gender ? 'border-red-500' : ''}`}
                                        checked={formik.values.gender === 'Nam'}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />{" "}
                                    Nam
                                </label>
                                <label htmlFor="gender-female">
                                    <input
                                        type="radio"
                                        value="Nữ"
                                        name="gender"
                                        id="gender-female"
                                        className={`rounded border-2 ${formik.touched.gender && formik.errors.gender ? 'border-red-500' : ''}`}
                                        checked={formik.values.gender === 'Nữ'}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />{" "}
                                    Nữ
                                </label>
                                <label htmlFor="gender-other">
                                    <input
                                        type="radio"
                                        value="Khác"
                                        name="gender"
                                        id="gender-other"
                                        className={`rounded border-2 ${formik.touched.gender && formik.errors.gender ? 'border-red-500' : ''}`}
                                        checked={formik.values.gender === 'Khác'}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />{" "}
                                    Khác
                                </label>
                            </div>
                            {formik.touched.gender && formik.errors.gender && (
                                <span className="text-red-500">{formik.errors.gender}</span>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="location">Địa chỉ</label>
                        <input
                            type="text"
                            name="location"
                            id="location"
                            className={`rounded border-2 ${formik.touched.location && formik.errors.location ? 'border-red-500' : ''}`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.location}
                        />
                        {formik.touched.location && formik.errors.location && (
                            <span className="text-red-500">{formik.errors.location}</span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="phone">Số điện thoại</label>
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            className={`rounded border-2 ${formik.touched.phone && formik.errors.phone ? 'border-red-500' : ''}`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phone}
                        />
                        {formik.touched.phone && formik.errors.phone && (
                            <span className="text-red-500">{formik.errors.phone}</span>
                        )}
                    </div>
                    <div className='flex flex-row gap-4'>
                        <button type="submit" className="bg-red-500 text-white font-bold w-fit p-2 rounded mt-4">
                            Xác nhận
                        </button>
                        <Link href={"/customerInfo"} className='text-black no-underline'>
                            <button className=' border font-bold w-fit p-2 rounded mt-4'>Đóng</button>
                        </Link>
                    </div>
                </form>
            </div>
        )
    }
  return (
    <div>
        <div className="bg-white rounded p-5 flex justify-center">
            <div className="w-2/3 border-2 p-5 rounded-lg border-green-400">
                <div className="flex justify-center">
                    <h3 className='font-bold text-lg'>Sửa thông tin khách hàng</h3>
                </div>
                <RegistrationForm></RegistrationForm>
            </div>
        </div>
    </div>
  )
}
