'use client'
// import React, {useState} from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React, { useState} from 'react'
import {ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import {storage} from './config'

export function InputUpLoad({onChange, imgLink}) {
  console.log(imgLink);
  const handleImageDelete = () => {
    if (imgLink === null) return;
    const parts = imgLink.split('/images%2F');
    const imgName = parts[1].split('?');
    const imgRef = ref(storage, `images/${imgName[0]}`);
    deleteObject(imgRef)
    .then(() => {
      onChange(null);
      let up = document.querySelector('#Upload')
      // console.log(up.value)
      up.value = ''
    })
    .catch((error) => {
        console.error("Lỗi khi xóa hình ảnh:", error);
    });
  }
 
  const handleImageUpload = (e) => {
    if(e.target.files[0] == null) return;
    const imgRef = ref(storage, `images/${e.target.files[0].name}`)
    console.log(imgRef)
    uploadBytes(imgRef, e.target.files[0]).then( async ()=>{
      const downloadURL = await getDownloadURL(imgRef);
      onChange(downloadURL)
    })
  }
  return (
    <div className='flex flex-col mt-4'>
        <input type="file" id='Upload' accept="image/*" onChange={(e)=>{handleImageUpload(e)}}/>
        {
          imgLink && (
            <div className="mt-4 flex flex-row gap-4 justify-center">
              <img src={imgLink} alt="" width={300} height={300}/>
              <div onClick={() => handleImageDelete()}>X</div>
            </div>
          )
        }
    </div>
  )
}


export function Label({name, className}){
  return <span className={className + "text-lg font-medium underline"}>{name}</span>
}

export default function Form({action,className,children}) {
  return (
    <form action={(e)=>action(e)} className={className + ""}>
        {children}
    </form>
  )
}


