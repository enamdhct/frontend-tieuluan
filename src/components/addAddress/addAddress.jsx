import React, {useState, useEffect} from 'react'
import { getAllProvince, getAllDistrict, getAllWard } from '@/services/ghnService';
import { createLocation } from '@/services/locationService';
import { alertSuccess } from '../Swal/alert';

export default function addAddress({isOpen, onClose, loadData}) {
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');
    const [typeLocation, setTypeLocation] = useState('province')
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [provinceName, setProvinceName] = useState('')
    const [districtName, setDistrictName] = useState('')
    const [wardName, setWardName] = useState('')
    const [specificAddress, setSpecificAddress] = useState('')
    useEffect(()=>{
        getProvince()
    },[])

    useEffect(()=>{
        if(selectedProvince){
            getDistrict(selectedProvince)
        }
    },[selectedProvince])

    useEffect(()=>{
        if(selectedDistrict){
            getWard(selectedDistrict)
        }
    },[selectedDistrict])
    async function getProvince () {
        let province = await getAllProvince()
        setProvince(province.data)
    }
    async function getDistrict (id) {
        if (id){
            let district = await getAllDistrict(id)
            setDistrict(district.data)
        }
    }
    async function getWard (id) {
        let ward = await getAllWard(id)
        setWard(ward.data)
    }
    const saveAddress = (event) => {
        let userID = localStorage.getItem('userID')

        let location = specificAddress+', '+ wardName +', '+ districtName +', '+ provinceName
        const formData = {
            "userID" : userID,
            "customerName": event.get('customerName'),
            "location": location,
            "districtID": selectedDistrict,
            "phone": event.get('phoneCustomer'),
            "default": false,
            "wardCode": selectedWard
        }
        document.getElementById('phoneCustomer').value=""
        document.getElementById('customerName').value=""
        document.getElementById('specificAddress').value=""
        setSelectedProvince('')
        setSelectedDistrict('')
        setSelectedWard('')

        let create = createLocation(JSON.stringify(formData))
        console.log(create)
        if (create){
            alertSuccess({ status: 'success', text: 'Đã thêm địa chỉ thành công' })
            loadData()
            onClose();
        }
    }
    function handleClickTabLocation (type){
        setTypeLocation(type)
    }

    const handleProvinceChange = (event) => {
      const selectedValue = event.target.value;
      setSelectedProvince(selectedValue);
      const obj = province.find(obj => obj.ProvinceID == selectedValue)
      setProvinceName(obj.ProvinceName)
    };
    const handleDistrictChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedDistrict(selectedValue);
        const obj = district.find(obj => obj.DistrictID == selectedValue)
        setDistrictName(obj.DistrictName)
      };
    const handleWardChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedWard(selectedValue);
        const obj = ward.find(obj => obj.WardCode == selectedValue)
        setWardName(obj.WardName)
    };
    const handleSpecificAddressChange = (event) => {
        const value = event.target.value;
        setSpecificAddress(value)
    }
    return (
        <div className={`${isOpen ? '' : 'hidden'} flex justify-center`}>
                {/* <div className='flex flex-row gap-5 w-1/2 justify-between'>
                    <div className={`cursor-pointer ${typeLocation === 'province' ? 'text-green-500 font-bold' : ''}`} onClick={()=>handleClickTabLocation('province')}><span>Tỉnh</span></div>
                    <div className={`cursor-pointer ${typeLocation === 'district' ? 'text-green-500 font-bold' : ''}`} onClick={()=>handleClickTabLocation('district')}><span>Quận / Huyện</span></div>
                    <div className={`cursor-pointer ${typeLocation === 'ward' ? 'text-green-500 font-bold' : ''}`} onClick={()=>handleClickTabLocation('ward')}><span>Xã</span></div>
                </div> */}
            <div className='border-1 rounded border-slate-400 w-3/4 flex justify-center flex-col gap-3 my-5'>
                <div className='mt-5'>
                    <div className='w-full flex justify-center'>
                        <span className='text-xl font-bold'>Thêm địa chỉ</span>
                    </div>
                </div>
                <div className='flex justify-center flex-col items-center gap-3'>
                    <form action={(e)=>{saveAddress(e)}} className='w-3/4 py-5 flex flex-col gap-2'>
                        <div className='flex flex-row gap-5 items-center w-full'>
                            <label htmlFor="" className='w-1/4'>Tên người nhận</label>
                            <input type="text" name='customerName' id="customerName" className='w-3/4 rounded'/>
                        </div>
                        <div className='flex flex-row gap-5 items-center w-full'>
                            <label htmlFor="" className='w-1/4'>Số điện thoại:</label>
                            <input type="text" name="phoneCustomer" id="phoneCustomer" className='w-3/4 rounded'/>
                        </div>
                        <div className='flex flex-row gap-5 items-center w-full'>
                            <label htmlFor="" className='w-1/4'>Tỉnh: </label>
                            <select className='w-3/4 rounded' name="provinceSelect" id="provinceSelect" onChange={handleProvinceChange}>
                                {
                                    province && province.map((item, index)=>{
                                        return (
                                            <option key={index} value={item.ProvinceID}>{item.ProvinceName}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        {
                            selectedProvince &&                 
                            <div className='flex flex-row gap-5 items-center w-full'>
                                <label htmlFor="" className='w-1/4'>Quận/Huyện</label>
                                <select className='w-3/4 rounded' name="districtSelect" id="districtSelect" onChange={handleDistrictChange}>
                                    {
                                        district && district.map((item, index)=>{
                                            return (
                                                <option key={index} value={item.DistrictID}>{item.DistrictName}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        }
                        {
                            selectedDistrict && 
                            <div className='flex flex-row gap-5 items-center w-full'>
                                <label htmlFor="" className='w-1/4'>Xã/Phường</label>
                                <select className='w-3/4 rounded' name="wardSelect" id="wardSelect" onChange={handleWardChange}>
                                    {
                                        ward && ward.map((item, index)=>{
                                            return (
                                                <option key={index} value={item.WardCode}>{item.WardName}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        }
                        {
                            selectedWard && 
                            <div className='flex flex-row gap-5 items-center w-full'>
                                <label htmlFor="" className='w-1/4'>Địa chỉ cụ thể</label>
                                <input className='w-3/4 rounded' type="text" name="specificAddress" id="specificAddress" onChange={handleSpecificAddressChange}/>
                            </div>
                        }
                        <div className='flex flex-row gap-3 mt-4'>
                            <button type="submit" className='px-3 rounded flex items-center bg-green-500 text-white'>Lưu địa chỉ</button>
                            <button onClick={onClose} className='px-3 rounded border-slate-500 border-3'>Đóng</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
