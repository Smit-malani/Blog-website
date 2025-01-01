import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { GiStarShuriken } from "react-icons/gi"
import { AiOutlineLike } from "react-icons/ai"
import { FaRegComment } from "react-icons/fa6";
import { Link } from 'react-router-dom'
function Home() {

    const[blogs,setBlogs] = useState([])

    async function fetchBlogs(){
        try {
            let res = await axios.get("http://localhost:3000/api/v1/blogs")
            if(res.status === 200){
                const data = res.data
                setBlogs(data.blog)
            }
        } catch (err) {            
            toast.error(err.response.data.message || "An error occurred")
        }
    }
    useEffect(()=>{
        fetchBlogs()
    })    
  return (
    <div className='mt-9 w-[65%]'>
        {
            blogs.map((blog ,index)=>{
                return (
                    <Link key={index} to={`blog/${blog.blogId}`}>
                        <div  className='w-full border-b-[1px] border-[#c2c2c2] pb-9 flex items-center justify-start gap-3 mt-10'>
                        <div className='w-[65%] flex flex-col justify-start items-start gap-6 px-12'>
                            <div className='flex items-center gap-3 cursor-pointer'>
                                <div className='h-6 w-6 bg-green-200 rounded-full'>
                                    <img src="" alt="" />
                                </div>
                                <h2 className='text-sm'>{blog?.creater?.name}</h2>
                            </div>
                            <div className='cursor-pointer'>
                                <h1 className='font-bold text-2xl w-5/6 '>{blog?.title}</h1>
                                <p className='opacity-80 mt-3 h-12 overflow-hidden w-[90%] line-clamp-2'>{blog.description}</p>
                            </div>
                            <div className='flex items-center justify-start gap-7'>
                                <div className='flex items-center gap-2'>
                                    <GiStarShuriken  className='text-base text-yellow-500'/>
                                    <p className='text-xs opacity-70 font-medium'>Dec 6,2024</p>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <AiOutlineLike className='text-base'/>
                                    <p className='text-xs opacity-70 font-medium'>{blog.likes ? 0 : blog.likes }</p>
                                </div>
                                <div  className='flex items-center gap-1'>
                                    <FaRegComment className='text-base'/>
                                    <p className='text-xs opacity-70 font-medium'>{blog.comment ? 0 : blog.comment}</p>
                                </div>
                            </div>
                        </div>
                        <div className='bg-zinc-200 h-40 w-[30%] overflow-hidden rounded-md cursor-pointer'>
                            <img className='h-full w-full object-cover' src={blog?.image} alt="" />
                        </div>
                        </div>
                    </Link>
                )
            })
        }
    </div>
  )
}

export default Home