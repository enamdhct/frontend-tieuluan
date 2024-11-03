'use client'
import { alertSuccess } from "@/components/Swal/alert";
import TitleTab from "@/components/TitleTab/TitleTab";
import { getAllVoucher, saveVoucherToUser } from "@/services/voucherService.js";
import { useEffect, useState } from "react";

export default function page({ params }) {
    const [vouchers, setVouchers] = useState([])
    const getAllVoucherForUser = async () => {
        try {
            let vouchers = await getAllVoucher(1)
            console.log({vouchers});
            
            setVouchers(vouchers?.vouchers.filter(voucher => Number(voucher?.number) > 0));
        } catch (err) {
            console.log("getAllVoucherForUser",{ err });
        }
    }
    const saveVoucher = async (body)=>{
        try{
            let userID = localStorage.getItem('userID')
            body = {
                ...body,
                user_id:userID
            }
            console.log({body});
            
            const save = await saveVoucherToUser(JSON.stringify(body));
            console.log({save});
            
            if(save?.status == 200){
                await getAllVoucherForUser()
                alertSuccess({ status: 'success', text: 'Luu thanh cong' })
            }else{
            alertSuccess({ status: 'error', text: save?.message })

            }
        }catch(err){
            alertSuccess({ status: 'error', text: 'Luu that bai' })
            console.log({err:err?.message});
        }
    }
    useEffect(()=>{
        getAllVoucherForUser();
    },[])
    return <div className='p-8 h-[calc(100%-40px)]'>
        <TitleTab text={'Thông tin mã giảm giá'} className={'text-black font-bold'}></TitleTab>
        <div className="grid mt-3 grid-cols-2 gap-3 ">
            {vouchers?.length > 0 ? vouchers.map(voucher=>{
                return <div className="flex gap-3 rounded-lg bg-white shadow">
                    <div className="rounded-lg">
                        <img className="rounded-lg" src="https://down-vn.img.susercontent.com/file/01ad529d780769c418b225c96cb8a3d7" alt="" />
                    </div>
                    <div className="flex flex-1 p-3 gap-2 flex-col items-start justify-center">
                        <span className="font-bold text-2xl">{voucher?.name}</span>
                        <span className="text-gray-400 text-xl">Số lượng: {voucher?.number}</span>
                        <button onClick={()=> saveVoucher({voucher_id:voucher?._id})} className="bg-green-500 text-white py-3 rounded-lg font-bold text-center w-full text-2xl hover:scale-105 transition-all">Lưu</button>
                    </div>
                </div>
            }) : <div className="text-center font-bold text-red-500 text-xl">Hết mã giảm giá</div>}
        </div>

    </div>
}