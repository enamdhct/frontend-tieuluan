'use client'
import React from 'react'
import {Input} from "@nextui-org/react";
import { createContact } from '@/services/contactService';
import { alertSuccess } from '@/components/Swal/alert';
import { useFormik } from 'formik';
import * as Yup from 'yup';


export default function page() {
  async function handleContact(data){

    const formData = {
        "name": data.name,
        "email": data.email,
        "content": data.content,
        "phone": data.phone,
        "state": "Chưa xử lý"
    }
    console.log(formData);
    let contact = await createContact(JSON.stringify(formData))
    if (contact._id){
        alertSuccess({ status: 'success', text: 'Thành công. Chúng tôi sẽ liên lạc với bạn' })
    }
}
const validationSchema = Yup.object({
    name: Yup.string().required('Vui lòng nhập họ và tên của bạn'),
    email: Yup.string().email('Email không hợp lệ'),
    content: Yup.string('Vui lòng nội dung ban cần được hổ trọ'),
    phone: Yup.string(),
});
const RegistrationForm = () => {
    const formik = useFormik({
        initialValues: {
        name: '',
        email: '',
        content: '',
        phone: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
        console.log('Form submitted:', values);
        await handleContact(values);
        },
    });
    return (
        <div className="flex flex-col gap-3">

            <form onSubmit={formik.handleSubmit} className='border p-2 rounded'>
              <div className='p-2'>
                <div className='py-2'><span className='font-bold text-lg text-green-500'>Liên hệ</span></div>
                  <div className="flex flex-col gap-2">
                      <label htmlFor="name">Họ và tên:</label>
                      <input
                          type="text"
                          name="name"
                          id="name"
                          className={`rounded border-2 ${formik.touched.name && formik.errors.name ? 'border-red-500' : ''}`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                      />
                      {formik.touched.name && formik.errors.name && (
                          <span className="text-red-500">{formik.errors.name}</span>
                      )}
                  </div>
                  <div className="flex flex-col gap-2">
                      <label htmlFor="email">Địa chỉ Email:</label>
                      <input
                          type="email"
                          name="email"
                          id="email"
                          className={`rounded border-2 ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''}`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                      />
                      {formik.touched.email && formik.errors.email && (
                          <span className="text-red-500">{formik.errors.email}</span>
                      )}
                  </div>
                  <div className="flex flex-col gap-2">
                      <label htmlFor="phone">Số điện thoại:</label>
                      <input
                          type="text"
                          name="phone"
                          id="phone"
                          className={`rounded border-2 ${formik.touched.phone && formik.errors.phone ? 'border-red-500' : ''}`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                      />
                      {formik.touched.phone && formik.errors.phone && (
                          <span className="text-red-500">{formik.errors.phone}</span>
                      )}
                  </div>
                  <div className="flex flex-col gap-2">
                      <label htmlFor="content">Vấn đề:</label>
                      <textarea
                          type="text"
                          name="content"
                          id="content"
                          className={`rounded border-2 ${formik.touched.content && formik.errors.content ? 'border-red-500' : ''}`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                      />
                      {formik.touched.content && formik.errors.content && (
                          <span className="text-red-500">{formik.errors.content}</span>
                      )}
                  </div>
                  <div className='flex justify-center'>
                      <button type="submit" className="bg-red-500 text-white font-bold w-fit p-2  rounded mt-4">
                          Tư vấn giúp tôi
                      </button>
                  </div>
              </div>
            </form>
        </div>
    )
}
  return (
    <div className='w-full bg-white rounded p-8'>
      <div className='flex justify-center'>
        <h1 className='text-green-500 font-bold'>Liên hệ với chúng tôi</h1>
      </div>
      <div className='flex flex-row gap-10 mt-4 w-full'>
        <div className='w-1/3'>
          <RegistrationForm></RegistrationForm>
        </div>
        <div className='w-2/3 ml-4'> 
          <img src="https://burst.shopifycdn.com/photos/a-phone-on-a-blue-background-with-contact-us.jpg?width=1000&format=pjpg&exif=0&iptc=0" alt="" />
        </div>
      </div>
    </div>
  )
}
