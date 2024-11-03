// 'use client'
// import React, { useState } from "react";
// import { Register } from "@/services/authService";
// import { useRouter } from 'next/navigation'

// export default function register() {
//     const router = useRouter()
//     const [birthday, setBirthday] = useState('')
//     const [gender, setGender] = useState('')
//     async function handleRegister(e){
//         if (e.get('birthday')){
//             let birthday = e.get('birthday')
//             setBirthday(birthday)
//         }
//         if (e.get('gender')){
//             let gender = e.get('gender')
//             setGender(gender)
//         }
//         const formData = {
//             "username": e.get('username'),
//             "password": e.get('password'),
//             "name": e.get('name'),
//             "email": e.get('email'),
//             "birthday": birthday,
//             "gender": gender,
//             "location": e.get('location'),
//             "phone": e.get('phone'),
//             "role": '',
//             "avatarURL" : "https://firebasestorage.googleapis.com/v0/b/argishop-cab9c.appspot.com/o/images%2Fimages.png?alt=media&token=08ed9ef5-bce1-4447-b484-aa11bf25e1e7"
//         }
//         let register = await Register(JSON.stringify(formData))
//         console.log(register)
//         if (register._id){
//             // redirect('/auth/login', 'push')
//             router.push('/auth/login', { scroll: false })
//         }
//     }
//     return (
//         <div>
//             <div className="bg-white rounded p-5 flex justify-center">
//                 <div className="w-2/3 border-2 p-5 rounded-lg border-green-400">
//                     <div className="flex justify-center">
//                         <h3>Đăng ký tài khoản</h3>
//                     </div>
//                     <div className="flex flex-col gap-3">
//                         <form action={handleRegister}>
//                             <div className="flex flex-col gap-2">
//                                 <label htmlFor="">Tên đăng nhập *</label>
//                                 <input type="text" name="username" className="border-2 rounded" />
//                             </div>
//                             <div className="flex flex-col gap-2">
//                                 <label htmlFor="">Mật khẩu *</label>
//                                 <input type="text" name="password" className="border-2 rounded" />
//                             </div>
//                             <div className="flex flex-col gap-2">
//                                 <label htmlFor="">Nhập lại mật khẩu *</label>
//                                 <input type="text" name="comfirmPasssword" className="border-2 rounded" />
//                             </div>
//                             <div className="flex flex-col gap-2">
//                                 <label htmlFor="">Họ và tên</label>
//                                 <input
//                                     type="text"
//                                     name="name"
//                                     id=""
//                                     className="rounded border-2"
//                                 />
//                             </div>
//                             <div className="flex flex-col gap-2">
//                                 <label htmlFor="">Địa chỉ Email</label>
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     id=""
//                                     className="rounded border-2"
//                                 />
//                             </div>
//                             <div className="flex flex-row gap-5">
//                                 <div className="flex flex-col gap-2 w-1/2">
//                                     <label htmlFor="">Ngày sinh</label>
//                                     <input
//                                         type="date"
//                                         name="birthday"
//                                         id=""
//                                         className="rounded border-2"
//                                     />
//                                 </div>
//                                 <div className="flex flex-col gap-2 w-1/2">
//                                     <span>Giới tính</span>
//                                     <div className="flex flex-row gap-5">
//                                         <label htmlFor="">
//                                             <input
//                                                 type="radio"
//                                                 value="Nam"
//                                                 name="gender"
//                                                 id=""
//                                                 className="rounded border-2"
//                                                 checked
//                                             />{" "}
//                                             Nam
//                                         </label>
//                                         <label htmlFor="">
//                                             <input
//                                                 type="radio"
//                                                 value="Nữ"
//                                                 name="gender"
//                                                 id=""
//                                                 className="rounded border-2"
//                                             />{" "}
//                                             Nữ
//                                         </label>
//                                         <label htmlFor="">
//                                             <input
//                                                 type="radio"
//                                                 value="Khác"
//                                                 name="gender"
//                                                 id=""
//                                                 className="rounded border-2"
//                                             />{" "}
//                                             Khác
//                                         </label>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="flex flex-col gap-2">
//                                 <label htmlFor="">Địa chỉ</label>
//                                 <input
//                                     type="text"
//                                     name="location"
//                                     id=""
//                                     className="rounded border-2"
//                                 />
//                             </div>
//                             <div className="flex flex-col gap-2">
//                                 <label htmlFor="">Số điện thoại</label>
//                                 <input
//                                     type="text"
//                                     name="phone"
//                                     id=""
//                                     className="rounded border-2"
//                                 />
//                             </div>
//                             <div className="flex flex-row gap-3 items-center mt-4">
//                             <input type="checkbox" />
//                                 <span>Tôi đồng ý tất cả các điều khoản của NNShop</span>
//                             </div>
//                             <div>
//                                 <button type="submit" className="bg-red-500 text-white font-bold w-fit p-2 rounded mt-4">
//                                     Đăng ký
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
'use client'
import React, { useState } from "react";
import { Register } from "@/services/authService";
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function register() {
    const router = useRouter()

    async function handleRegister(data){

        const formData = {
            "username": data.username,
            "password": data.password,
            "name": data.name,
            "email": data.email,
            "birthday": data.birthday,
            "gender": data.gender,
            "location": data.location,
            "phone": data.phone,
            "role": '',
            "avatarURL" : "https://firebasestorage.googleapis.com/v0/b/argishop-cab9c.appspot.com/o/images%2Fimages.png?alt=media&token=08ed9ef5-bce1-4447-b484-aa11bf25e1e7"
        }
        let register = await Register(JSON.stringify(formData))
        console.log(formData)
        if (register._id){
            router.push('/auth/login', { scroll: false })
        }
    }
    const validationSchema = Yup.object({
        username: Yup.string().required('Vui lòng nhập tên đăng nhập'),
        password: Yup.string().required('Vui lòng nhập mật khẩu'),
        confirmPasssword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
            .required('Vui lòng nhập lại mật khẩu'),
        name: Yup.string().required('Vui lòng nhập họ và tên của bạn'),
        email: Yup.string().email('Email không hợp lệ'),
        birthday: Yup.date(),
        gender: Yup.string().oneOf(['Nam', 'Nữ', 'Khác'], 'Vui lòng chọn giới tính'),
        location: Yup.string(),
        phone: Yup.string(),
        agreement: Yup.boolean().oneOf([true], 'Bạn phải đồng ý với điều khoản'),
    });
    const RegistrationForm = () => {
        const formik = useFormik({
            initialValues: {
            username: '',
            password: '',
            confirmPasssword: '',
            name: '',
            email: '',
            birthday: '',
            gender: '',
            location: '',
            phone: '',
            avatarURL: 'https://firebasestorage.googleapis.com/v0/b/argishop-cab9c.appspot.com/o/images%2Fimages.png?alt=media&token=08ed9ef5-bce1-4447-b484-aa11bf25e1e7',
            agreement: false,
            },
            validationSchema: validationSchema,
            onSubmit: async (values) => {
            // Xử lý submit form
            console.log('Form submitted:', values);
            // Gọi hàm handleRegister với giá trị values
            await handleRegister(values);
            },
        });
        return (
            <div className="flex flex-col gap-3">
                <form onSubmit={formik.handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="">Tên đăng nhập *</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className={`border-2 rounded ${formik.touched.username && formik.errors.username ? 'border-red-500' : ''}`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.username && formik.errors.username && (
                            <span className="text-red-500">{formik.errors.username}</span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password">Mật khẩu *</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className={`border-2 rounded ${formik.touched.password && formik.errors.password ? 'border-red-500' : ''}`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <span className="text-red-500">{formik.errors.password}</span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="confirmPassword">Nhập lại mật khẩu *</label>
                        <input
                            type="password"
                            name="confirmPasssword"
                            id="confirmPassword"
                            className={`border-2 rounded ${formik.touched.confirmPasssword && formik.errors.confirmPasssword ? 'border-red-500' : ''}`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.confirmPasssword && formik.errors.confirmPasssword && (
                            <span className="text-red-500">{formik.errors.confirmPasssword}</span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Họ và tên</label>
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
                        <label htmlFor="email">Địa chỉ Email</label>
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
                    <div className="flex flex-row gap-5">
                        <div className="flex flex-col gap-2 w-1/2">
                            <label htmlFor="birthday">Ngày sinh</label>
                            <input
                                type="date"
                                name="birthday"
                                id="birthday"
                                className={`rounded border-2 ${formik.touched.birthday && formik.errors.birthday ? 'border-red-500' : ''}`}
                                onChange={formik.handleChange}
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
                        />
                        {formik.touched.phone && formik.errors.phone && (
                            <span className="text-red-500">{formik.errors.phone}</span>
                        )}
                    </div>
                    <div className="flex flex-row gap-3 items-center mt-4">
                        <input
                            type="checkbox"
                            name="agreement"
                            checked={formik.values.agreement}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <span>Tôi đồng ý tất cả các điều khoản của NNShop</span>
                        {formik.touched.agreement && formik.errors.agreement && (
                            <span className="text-red-500">{formik.errors.agreement}</span>
                        )}
                    </div>
                    <div>
                        <button type="submit" className="bg-red-500 text-white font-bold w-fit p-2 rounded mt-4">
                            Đăng ký
                        </button>
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
                        <h3>Đăng ký tài khoản</h3>
                    </div>
                    <RegistrationForm></RegistrationForm>
                </div>
            </div>
        </div>
    );
}

