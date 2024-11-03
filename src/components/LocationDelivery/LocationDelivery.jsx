import React, {useEffect, useState} from 'react'
import { getAllLocationUser, updateLocation } from '@/services/locationService'
import DivLocation from '../DivLocation/DivLocation';

export default function LocationDelivery({IsChange, close}) {
    console.log(IsChange)
    const [location, setLocation] = useState("");
    const [choiseLocation, setChoiseLocation] = useState(-1)
    const [idLocationChoise, setIDLocationChoise] = useState('')
    useEffect(() => {
        getAllLocation();

    }, []);

    async function getAllLocation() {
        let userID = localStorage.getItem('userID')
        let locationUser = await getAllLocationUser(userID);
        setLocation(locationUser.locations);
    }
    async function handleSaveNewLocation (id){
        let updateLocationNew = await updateLocation(id, JSON.stringify({"default": true}))
        return updateLocationNew
    }
    async function handleSaveLocation (){
        let locationFilter = location.filter(item => item.default === true)
        let updateLocationOld = await updateLocation(locationFilter[0]._id, JSON.stringify({"default": false}))
        let updateLocationNew = await handleSaveNewLocation(idLocationChoise)
        if(updateLocationNew && updateLocationOld){
            window.postMessage({message:"update_location_delivery","locationID": idLocationChoise}, window.location.origin)
            getAllLocation();
        }
        close()
    }
    function handleItemClick (index, item){
        setChoiseLocation(index)
        setIDLocationChoise(item._id)
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
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className='font-bold text-xl pt-5 flex justify-center'>
                                <span>Thay đổi địa chỉ</span>
                            </div>
                            <div className="bg-white flex flex-col justify-center w-full items-center mt-4 gap-3 pb-4 sm:p-6 sm:pb-4">
                                {
                                    location && location.map((item, index)=>{
                                        return(
                                            <div key={index} className={`flex flex-row items-center w-11/12 ${choiseLocation == index ? 'border-green-500 border-4' : 'border-slate-400 border-2'} rounded p-3`} onClick={() => handleItemClick(index, item)}>
                                                <DivLocation location={item}></DivLocation>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="bg-gray-50 px-4 py-3 gap-4 flex flex-row sm:flex-row-reverse sm:px-6">
                                <div className='bg-green-400 text-white font-bold p-2 rounded cursor-pointer' onClick={handleSaveLocation}>
                                    <span>Xác nhận</span>
                                </div>
                                <div className='bg-slate-200 font-bold p-2 rounded cursor-pointer' onClick={close}>
                                    <span>
                                        Hủy
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
