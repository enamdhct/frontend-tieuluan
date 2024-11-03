"use client"
import React, { useDebugValue, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getOrder, updateOrder } from '@/services/orderService'
import { getAllLocationUser, getLocation } from '@/services/locationService'
import { paymentVNP } from '@/services/paymentService'
import { getServiceDelivery, getFeeDelivery } from '@/services/ghnService'
import ProductPayment from '@/components/ProductPayment/ProductPayment'
import ElementPayment from '@/components/ElementPayment/ElementPayment'
import Shipping from '@/components/Shipping/Shipping'
import LocationDelivery from '@/components/LocationDelivery/LocationDelivery'
import DivLocation from '@/components/DivLocation/DivLocation'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { getVoucher, getVoucherUser } from '@/services/voucherService'
import { getUser } from '@/services/userService'
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const PERCENT = 80;
export default function page({ params }) {
    const router = useRouter()
    const [orderInfo, setOrderInfo] = useState('')
    const [arrProduct, setArrProduct] = useState('')
    const [ship, setShip] = useState(30_000)
    const [inputNote, setInputNote] = useState('')
    const [location, setLocation] = useState('')
    const [isChangeLocation, setIsChangeLocation] = useState(false)
    const [isPaymentVNP, setPaymentVNP] = useState(false);
    const [isCod, setCod] = useState(true);
    const [idLocation, setIDLocation] = useState('')
    const [idDistrictLocation, setIdDistrictLocation] = useState('')
    const [idWardLocation, setIdWardLocation] = useState('')
    const [arrServerDelivery, setArrServiceDelivery] = useState('')
    const [bgBtnService, setBgBtnService] = useState(-1)
    const [open, setOpen] = React.useState(false);
    const [vouchers, setVouchers] = useState([])
    const [user, setUser] = useState('')
    const [coinApply, setCoinApply] = useState(0)
    const [isApplyCoin, setIsApplyCoin] = useState(false)



    const [voucherApply, setVoucherApply] = useState(null)
    const handleClickOpen = () => {
        setOpen(true);
    };
    async function getUserInfo() {
        let userID = localStorage.getItem('userID')
        let user = await getUser(userID)
        console.log({userTest:user});
        setUser(user);
    }
    const FEE_DELIVERY = 30_000;
    const handleClose = () => {
        setOpen(false);
    };
    const getVouchersUser = async () => {
        try {
            let userID = localStorage.getItem('userID')
            const vouchers = await getVoucherUser(userID);
            console.log('getVouchersUser', {
                vouchers: vouchers?.voucherUser
            });

            setVouchers(vouchers?.voucherUser)
        } catch (err) {
            console.log({ err });
        }
    }
    useEffect(() => {
        getInfoOrder()
        getAllLocation()
        getVouchersUser()
        getUserInfo()
        window.addEventListener('message', handleMessage);
       
        // Cleanup the event listener when the component unmounts
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, [])
    // Handle received messages
    const handleMessage = (event) => {
        // Verify the origin of the message for security reasons
        if (event.origin !== window.location.origin) {
            return;
        }

        // Update state with the received message
        if (event.data.message && event.data.message == "update_location_delivery") {
            setIDLocation(event.data.locationID)
            getAllLocation()
        }

    };
    useEffect(() => {
        if (arrProduct) {
            caculatorPrice()
        }
    }, [arrProduct])
    useEffect(() => {
        if (ship) {
            caculatorPrice(ship)
        }
    }, [ship])
    useEffect(() => {
        if (idLocation) {
            getAddress()
        }
    }, [idLocation])
    useEffect(() => {
        if (idDistrictLocation || location) {
            getService()
        }
    }, [idDistrictLocation, location])
    async function getInfoOrder() {
        let order = await getOrder(params.id)
        setOrderInfo(order)
        setArrProduct(order.product)
    }
    async function getAllLocation() {
        let userID = localStorage.getItem('userID')
        let locationUser = await getAllLocationUser(userID)
        setLocation(locationUser.locations)
    }
    async function getAddress() {
        let address = await getLocation(idLocation)
        setIdDistrictLocation(address.districtID)
        setIdWardLocation(address.wardCode)
        console.log(address)
    }
    async function getService() {
        if (idDistrictLocation) {
            let services = await getServiceDelivery(idDistrictLocation)
            setArrServiceDelivery(services.data)
        }
        if (location) {
            // console.log(location)
            let locationTrue = location?.filter(item => item.default === true)
            let services = await getServiceDelivery(locationTrue[0]?.districtID)
            setArrServiceDelivery(services.data)
            console.log(locationTrue)
        }
    }

    async function handleChooseDeliveryService(item, index) {
        setBgBtnService(index)
        let locationTrue = location?.filter(item => item.default === true)
        const formData = {
            "from_district_id": 2054,
            "from_ward_code": "570407",
            "service_id": item.service_id,
            "service_type_id": item.service_type_id,
            "to_district_id": parseInt(locationTrue[0]?.districtID),
            "to_ward_code": locationTrue[0].wardCode,
            "height": 50,
            "length": 20,
            "weight": 200,
            "width": 20
        }
        console.log(formData);

        let fee = await getFeeDelivery(JSON.stringify(formData))
        console.log(fee);
        // setDeliveryFee(fee.data.total)
        if (fee.data.total) {
            setShip(fee.data.total)
        }
        console.log(fee.data.total)
    }

    function caculatorPrice() {
        let price = 0
        for (let i = 0; i < arrProduct.length; i++) {
            let priceProduct = arrProduct[i].totalPrice
            price = price + priceProduct
        }
        return price
    }
    function caculatorTotalPrice(ship) {
        let totalPrice = caculatorPrice()
        let priceFinal = totalPrice + ship

        return priceFinal
    }
    function handleChangeNote(e) {
        let text = e.target.value
        setInputNote(text)
    }
    // async function handleClickOrder (){
    //     let formData = {
    //         product: arrProduct,
    //         state: "Đang xử lí",
    //         userID: "65046e1d40ee336989d6e5bf",
    //         orderTime: new Date(),
    //         note: inputNote,
    //         Price: caculatorTotalPrice(ship)
    //     }
    //     let update = await updateOrder(params.id, JSON.stringify(formData))
    //     console.log(update)

    // }
    async function handleClickOrder() {
        let userID = localStorage.getItem('userID')
        if (isPaymentVNP) {
            let formData = {
                bankCode: "",
                language: "vn",
                orderID: params.id,
                amount: (caculatorTotalPrice(ship) - (voucherApply?.voucherPrice || 0) - (coinApply>0 && isApplyCoin ? coinApply : 0))
            }
            let formOrder = {
                product: arrProduct,
                state: "",
                userID: userID,
                orderTime: new Date(),
                note: inputNote,
                Price: (caculatorTotalPrice(ship) - (voucherApply?.voucherPrice || 0) - (coinApply>0 && isApplyCoin ? coinApply : 0)),
                shippingAddress: idLocation,
                paymentMethod: 'Payment',
                shippingFee: ship,
                voucherPrice: voucherApply ? voucherApply?.voucherPrice : 0,
                voucherId: voucherApply ? voucherApply?.idVoucher : "",
                coinApply
            }
            let update = await updateOrder(params.id, JSON.stringify(formOrder))
            if (update === 'Updated succesfully!') {
                let payment = await paymentVNP(JSON.stringify(formData))
                if (payment) {
                    router.push(payment)
                }
            }
        } else {
            let formData = {
                product: arrProduct,
                state: "Đang xử lí",
                userID: userID,
                orderTime: new Date(),
                note: inputNote,
                Price: (caculatorTotalPrice(ship) - (voucherApply?.voucherPrice || 0) - (coinApply>0 && isApplyCoin ? coinApply : 0)),
                shippingAddress: idLocation,
                paymentMethod: 'COD',
                shippingFee: ship,
                voucherPrice: voucherApply ? voucherApply?.voucherPrice : 0,
                voucherId: voucherApply ? voucherApply?.idVoucher : "",
                coinApply
            }
            let update = await updateOrder(params.id, JSON.stringify(formData))
            if (update === 'Updated succesfully!') {
                router.push(`/payment/result/${params.id}`);
            }
            console.log(update);
        }
    }
    function handleChangLocation() {
        setIsChangeLocation(!isChangeLocation)
    }
    function handleClickPaymentFunction() {
        setPaymentVNP(!isPaymentVNP);
        setCod(!isCod);
    }
    function handleCloseModel() {
        setIsChangeLocation(false)
    }
    const applyVoucher = (voucher) => {
        try {
            const voucherPrice = voucher?.detailVoucher?.fixed + Number(caculatorTotalPrice(0)) * (Number(voucher?.detailVoucher?.percent) / 100)
            setVoucherApply({ idVoucher: voucher?._id, voucherPrice });
            handleClose()
        } catch (err) {
            console.log({ err });
        }
    }
    const calculateCoinApply = ()=>{
        try{
            console.log({user});
            
            const finalCoinApply =  Math.min(user?.coin || 0,(caculatorTotalPrice(ship) - (voucherApply?.voucherPrice || 0)) * (PERCENT / 100))
            console.log({finalCoinApply});
            setCoinApply(finalCoinApply)
            return finalCoinApply
        }catch(err){
            console.log({err});
            
        }
    }
    return (
        <div className='mb-10'>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                maxWidth="md"
                fullWidth='md'
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Voucher
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <div className="grid grid-cols-1 gap-3">

                        {vouchers?.length > 0 && vouchers.map(voucher => {
                            const detail = voucher?.detailVoucher
                            console.log({ a: Number(caculatorTotalPrice(ship)) - ship });

                            return <div className="flex gap-3 rounded-lg bg-white shadow">
                                <div className="rounded-lg">
                                    <img className="rounded-lg h-full w-[200px]" src="https://down-vn.img.susercontent.com/file/01ad529d780769c418b225c96cb8a3d7" alt="" />
                                </div>
                                <div className="flex flex-1 p-3 gap-2 flex-col items-start justify-center">
                                    <span className="font-bold text-2xl">{detail?.name}</span>
                                    <span className="text-gray-400 text-xl">Ngay nhan: {new Date(detail?.createdAt).toLocaleString()}</span>
                                    <span className="text-gray-400 text-xl">Dieu kien: Tổng đơn hàng ít nhất {Number(detail?.minimumPrice)} đ</span>
                                    {Number(detail.minimumPrice) < Number(caculatorTotalPrice(ship) - ship) ?
                                        <button onClick={() => applyVoucher(voucher)} className="bg-green-500 text-white py-3 rounded-lg font-bold text-center w-full text-2xl hover:scale-105 transition-all">Sử dụng</button>
                                        :
                                        <button className="bg-gray-500 text-white py-3 rounded-lg font-bold text-center w-full text-2xl ">Sử dụng</button>

                                    }
                                </div>
                            </div>
                        })}
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <div>

                <div className='bg-white rounded p-3'>
                    <span className='text-red-600 font-bold text-xl'>
                        THANH TOÁN ĐƠN HÀNG
                    </span>
                </div>
                <div className='bg-white rounded p-3 mt-4 border-4 border-green-100 border-t-green-500'>
                    <ElementPayment iconName={'location'} text={'Địa chỉ giao hàng'}></ElementPayment>
                    <div className='flex flex-row'>
                        {location && location.filter((item) => item.default === true).map((item, index) => {
                            return (
                                <div key={index} className='w-5/6'>
                                    <DivLocation location={item}></DivLocation>
                                </div>
                            )
                        })}
                        <div className='flex items-center w-1/6 justify-center cursor-pointer' onClick={handleChangLocation}>
                            <span className='text-sky-500 font-bold'>Thay đổi</span>
                        </div>
                    </div>
                    <LocationDelivery IsChange={isChangeLocation} close={handleCloseModel}></LocationDelivery>
                </div>
                <div className='bg-white rounded p-4 mt-4'>
                    <div className='flex flex-row'>
                        <div className='w-3/6'>
                            <span className='font-bold text-xl'>SẢN PHẨM</span>
                        </div>
                        <div className='w-1/6 flex justify-center'>
                            <span>Đơn giá</span>
                        </div>
                        <div className='w-1/6 flex justify-center'>
                            <span>Số lượng</span>
                        </div>
                        <div className='w-1/6 flex justify-center'>
                            <span>Thành tiền</span>
                        </div>
                    </div>
                    <hr />
                    <div>
                        {
                            arrProduct && arrProduct.map((item, index) => <ProductPayment key={index} productCart={item}></ProductPayment>)
                        }
                    </div>
                </div>
                <div className='bg-white rounded p-4 mt-4'>
                    <ElementPayment iconName={'pencil'} text={'Lời nhắn'}></ElementPayment>
                    <hr />
                    <div>
                        <div>
                            <span>Vui lòng để lại lời nhắn nếu bạn có yêu cầu đặt biệt về đơn hàng này</span>
                        </div>
                        <div className='flex flex-row items-center gap-4 mt-4'>
                            <label htmlFor="">Lời nhắn:</label>
                            <input onInput={(e) => { handleChangeNote(e) }} type="text" placeholder='Viết lời nhắn của bạn vào đây' className='outline-none border border-slate-100 rounded w-1/2' />
                        </div>
                    </div>
                </div>
                <div className='bg-white rounded p-4 mt-4'>
                    <ElementPayment iconName={'ticket'} text={'Mã giảm giá'}></ElementPayment>
                    <hr />
                    <div>
                        <span onClick={handleClickOpen} className='cursor-pointer text-sky-500 font-bold'>
                            Chọn mã
                        </span>
                        <span className='ml-3 text-orange-500 font-semi-bold'>
                            {voucherApply ? '- ' + voucherApply?.idVoucher : ""}

                        </span>
                    </div>
                    <hr />
                    <div className='flex gap-3 items-center'>
                        <span className='cursor-pointer text-yellow-500 font-bold'>
                            {`Dùng ${(Math.min(user?.coin || 0,(caculatorTotalPrice(ship) - (voucherApply?.voucherPrice || 0)) * (PERCENT /100))).toLocaleString('vi-VN')} xu`}
                        </span>

                        <label class="inline-flex items-center cursor-pointer">
                            <input type="checkbox" onChange={(e)=>{
                                setIsApplyCoin((isApplyCoinW)=> !isApplyCoinW)
                                console.log({value:isApplyCoin});
                                calculateCoinApply()
                                //  if(isApplyCoin == true && (caculatorTotalPrice(ship) - (voucherApply?.voucherPrice || 0) - (coinApply>0 && isApplyCoin ? coinApply : 0))<=0){
                                //     setPaymentVNP(false)
                                //  }
                            }} value={isApplyCoin} class="sr-only peer" />
                            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                            <span className='text-red-500'>Chỉ sử dụng được tối đa {PERCENT}% giá trị đơn hàng</span>

                    </div>
                </div>

                <div className='bg-white rounded p-4 mt-4'>
                    <ElementPayment iconName={'credit'} text={'Phương thức thanh toán'}></ElementPayment>
                    <hr />
                    <div className='flex flex-row gap-5'>
                        <div className={`border-1 border-green-400 w-fit p-2 rounded font-medium ${isCod ? 'bg-green-400 text-white font-bold' : ''}`} onClick={handleClickPaymentFunction}>
                            <span>Thanh toán khi nhận hàng</span>
                        </div>
                        {(caculatorTotalPrice(ship) - (voucherApply?.voucherPrice || 0) - (coinApply>0 && isApplyCoin ? coinApply : 0)) <=0 ?
                        
                        <div className={`border-1 w-fit p-2 rounded bg-gray-300 font-medium ${isPaymentVNP ? 'bg-green-400 text-white font-bold' : ''}`}>
                        <span>Chuyển khoản</span>
                        </div>
                        :
                         <div className={`border-1 border-green-400 w-fit p-2 rounded font-medium ${isPaymentVNP ? 'bg-green-400 text-white font-bold' : ''}`} onClick={handleClickPaymentFunction}>
                         <span>Chuyển khoản</span>
                     </div>
                        }
                       
                    </div>
                    {/* {
                    isCod &&  
                    <div className='my-4'>
                        <div className='flex flex-row gap-5 my-4'>
                            <span>Thanh toán khi nhận hàng</span>
                            <span>Bạn sẽ thanh toán khi đơn vị vận chuyển giao hàng đến tay bạn</span>
                        </div>
                        <div className='flex flex-row gap-5'>
                            {
                                arrServerDelivery && arrServerDelivery.map((item, index)=>(
                                    <div key={index} className={`border-2 border-green-500 px-3 rounded py-1 cursor-pointer ${bgBtnService === index && 'bg-green-400 text-white'}`} onClick={()=>handleChooseDeliveryService(item, index)}>
                                        <span>{item.short_name}</span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>               

                }
                {
                    isPaymentVNP && 
                    <div>
                        <div className='flex flex-row gap-5 my-4'>
                            <span>Thanh toán khi đặt hàng</span>
                            <span>Bạn sẽ thanh toán khi đặt hàng, đơn hàng sẽ đến tay bạn và không có chi phí nào phát sinh</span>
                        </div>
                        <div className='flex flex-row gap-5'>
                            {
                                arrServerDelivery && arrServerDelivery.map((item, index)=>(
                                    <div key={index} className={`border-2 border-green-500 px-3 rounded py-1 cursor-pointer ${bgBtnService === index && 'bg-green-400 text-white'}`} onClick={()=>handleChooseDeliveryService(item, index)}>
                                        <span>{item.short_name}</span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                } */}

                </div>
                <div className='bg-white rounded p-4 mt-4'>
                    <ElementPayment iconName={'delivery'} text={'Phương thức vận chuyển'}></ElementPayment>
                    <hr />
                    {
                        isCod &&
                        <div className='my-4'>
                            <div className='flex flex-row gap-5 my-4'>
                                <span>Thanh toán khi nhận hàng</span>
                                <span>Bạn sẽ thanh toán khi đơn vị vận chuyển giao hàng đến tay bạn</span>
                            </div>
                            <div className='flex flex-row gap-5'>
                                {
                                    arrServerDelivery && arrServerDelivery.map((item, index) => (
                                        <div key={index} className={`border-2 border-green-500 px-3 rounded py-1 cursor-pointer ${bgBtnService === index && 'bg-green-400 text-white'}`} onClick={() => handleChooseDeliveryService(item, index)}>
                                            <span>{item.short_name}</span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                    }
                    {
                        isPaymentVNP &&
                        <div>
                            <div className='flex flex-row gap-5 my-4'>
                                <span>Thanh toán khi đặt hàng</span>
                                <span>Bạn sẽ thanh toán khi đặt hàng, đơn hàng sẽ đến tay bạn và không có chi phí nào phát sinh</span>
                            </div>
                            <div className='flex flex-row gap-5'>
                                {
                                    arrServerDelivery && arrServerDelivery.map((item, index) => (
                                        <div key={index} className={`border-2 border-green-500 px-3 rounded py-1 cursor-pointer ${bgBtnService === index && 'bg-green-400 text-white'}`} onClick={() => handleChooseDeliveryService(item, index)}>
                                            <span>{item.short_name}</span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    }
                </div>
                <div className='bg-white p-4 mt-4'>
                    <div>
                        <span className='font-bold text-xl text-red-600'>
                            TỔNG GIÁ
                        </span>
                    </div>
                    <hr />
                    <div className='flex flex-col'>
                        <div className='flex justify-end'>
                            <div className='flex flex-col w-1/4'>
                                <div className='flex flex-row justify-between mt-2'>
                                    <span>Tổng tiền hàng:</span>
                                    <span>{caculatorPrice().toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                </div>
                                <div className='flex flex-row justify-between mt-3'>
                                    <span>Phí vận chuyển:</span>
                                    <span>{ship.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                </div>
                                {voucherApply &&
                                    <div className='flex flex-row justify-between mt-3'>
                                        <span>Mã giảm giá:</span>
                                        <span> -{voucherApply?.voucherPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                    </div>
                                }
  {coinApply>0 && isApplyCoin&& 
                                    <div className='flex flex-row justify-between mt-3'>
                                        <span>Coin sử dụng:</span>
                                        <span> -{coinApply?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                    </div>
                                }
                                <div className='flex flex-row justify-between mt-3 items-center'>
                                    <span>Tổng thanh toán:</span>
                                    <span className='text-2xl font-bold text-red-500'>{(caculatorTotalPrice(ship) - (voucherApply?.voucherPrice || 0) - (coinApply>0 && isApplyCoin ? coinApply : 0)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className='flex flex-row justify-between'>
                            <div className='flex items-center'>
                                <span>Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý các <a href="#">điều khoản của chúng tôi</a></span>
                            </div>
                            <div className='flex flex-row gap-5'>
                                <Link href={'/product'} className='no-underline'>
                                    <div className='border-1 border-orange-600 w-fit py-2 px-4 rounded font-bold text-orange-600 cursor-pointer'>
                                        Lúc khác
                                    </div>
                                </Link>
                                <div className='bg-orange-600 w-fit py-2 px-4 rounded text-white font-bold cursor-pointer' onClick={handleClickOrder}>
                                    Đặt hàng
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
