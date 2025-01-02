import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import toast from "react-hot-toast";


function CreateBlog() {
  
  let user = JSON.parse(localStorage.getItem('user'))    
  if(!user){
    return <Navigate to={"/signup"}/>
  }  

  const[blog,setBlog] = useState([])
  const[title,setTitle] = useState('')
  const[description,setDescription] = useState('')
  const[image, setImage] = useState(null)
  const navigate = useNavigate()

    
  async function submitHandler(e){
    e.preventDefault()  
    const blogData = {
      title,
      description,
      image
    }    
    
    try {      
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/blog`, blogData, {headers: {"Content-Type": "multipart/form-data",Authorization: `Bearer ${user.token}`}})      
      if(res.status === 201){
        const data = res.data
        setBlog(data.blog)
        toast.success("Blog created successfully")
        navigate('/')
      }        
    } catch (err) {      
      toast.error(err.response.data.message || "An error occurred") 
    }
    setTitle('')
    setDescription('')  
  }

  return (
    <div className='w-screen h-screen flex items-start mt-7 justify-center'>
      <form onSubmit={(e)=>submitHandler(e)} className='flex flex-col w-full items-center gap-10 lg:w-1/2 md:w-full'>
        <h1 className='text-4xl font-bold'>Create Blog</h1>
          <div className='flex flex-col w-1/2 gap-4'>
            <div className='flex flex-col items-start gap-1'>
              <label htmlFor='title' className='text-base font-medium opacity-80'>Title:</label>
              <input id='title' onChange={(e)=>setTitle(e.target.value)} value={title} required type='text' placeholder='Enter Blog Title' className='px-3 py-2 rounded-md focus:outline-none border-2 focus:border-black w-full'/>
            </div>
            <div className='flex flex-col items-start gap-1'>
              <label htmlFor='desc' className='text-base font-medium opacity-80'>Content:</label>
              <input id='desc' onChange={(e)=>setDescription(e.target.value)} value={description} required type='text' placeholder='Enter Blog Description' className='px-3 py-2 rounded-md focus:outline-none border-2 focus:border-black w-full'/>
            </div>
            <div className='flex flex-col items-start gap-1'>
              <label htmlFor='image' className='text-base font-medium opacity-80 w-full'>
                {
                  image ? <img className='h-40 rounded-xl w-full' src={URL.createObjectURL(image)} alt="" /> : <div className='h-40 rounded-xl border-2 border-dashed border-black flex items-center justify-center bg-white'>Select Image</div>
                }
              </label>
              <input id='image' onChange={(e)=>setImage(e.target.files[0])} required type='file' placeholder='Enter Blog Description' className='hidden'/>
            </div>
            <button className='bg-blue-600 px-3 py-2 rounded-md text-white font-semibold hover:bg-blue-700'>Post Blog</button>
          </div>
        </form>
    </div>
  )
}

export default CreateBlog