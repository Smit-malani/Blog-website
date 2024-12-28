import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Navigate} from 'react-router-dom'

function CreateBlog() {

  // useEffect(()=>{

  // },[])
  let user = JSON.parse(localStorage.getItem('user'))
  
  if(!user){
    return <Navigate to={"/signup"}/>
  }  

  const[blog,setBlog] = useState([])
  const[title,setTitle] = useState('')
  const[description,setDescription] = useState('')
    
  async function submitHandler(e){
    e.preventDefault()  
    const blogData = {
      title,
      description
    }    
    try {      
      const res = await axios.post("http://localhost:3000/api/v1/blog", blogData, {headers: {Authorization: `Bearer ${user.token}`}})      
      if(res.status === 201){
        const data = res.data
        setBlog(data.blog)
        alert("Blog created successfully")
      }        
    } catch (err) {
        alert(err.response.data.message || "An error occurred") 
    }
    setTitle('')
    setDescription('')      
  }

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
          <form onSubmit={(e)=>submitHandler(e)} className='flex flex-col w-full items-center gap-10 lg:w-1/2 md:w-full'>
              <h1 className='text-4xl font-bold'>Create Blog</h1>
              <div className='flex flex-col w-1/2 gap-4'>
                <input onChange={(e)=>setTitle(e.target.value)} value={title} required type='text' placeholder='Enter Blog Title' className='px-3 py-2 rounded-md focus:outline-none border-2 focus:border-black'/>
                <input onChange={(e)=>setDescription(e.target.value)} value={description} required type='text' placeholder='Enter Blog Description' className='px-3 py-2 rounded-md focus:outline-none border-2 focus:border-black'/>
                <button className='bg-blue-600 px-3 py-2 rounded-md text-white font-semibold hover:bg-blue-700'>Create Blog</button>
              </div>
          </form>

        </div>
  )
}

export default CreateBlog