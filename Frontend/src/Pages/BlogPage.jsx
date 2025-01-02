import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AiOutlineLike } from "react-icons/ai"
import { FaRegComment } from "react-icons/fa6";
import toast from 'react-hot-toast';

function BlogPage() {

    const {id} = useParams()
    const[blogData, setBlogData] = useState(null)    
    async function fetchBlogById(){
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/blog/${id}`)
            if(res.status === 200){
                setBlogData(res.data.blog)  
            }
        }catch (err) {            
            toast.error(err.response.data.message || "An error occurred")
        }
    }

    useEffect(()=>{
        fetchBlogById()
    },[])
    

  return (
    <div className='w-full min-h-screen flex justify-center'>
        {
            blogData ? <div className='w-[55%] h-full flex flex-col'>
                <div className='title mt-12 w-full'>
                    <h1 className='font-bold text-5xl opacity-80'>{blogData.title}</h1>
                </div>
                <div className='profile flex items-center justify-start w-full mt-8 gap-4'>
                    <div className='h-10 bg-green-300 w-10 rounded-full overflow-hidden'>
                        {/* <img src="" alt="" /> */}
                    </div>
                    <div className=''>
                        <div className='flex items-center gap-4'>
                            <h1 className='font-medium opacity-80'>{blogData.creater.name}</h1>
                            <p className='text-[#2B84BD] underline cursor-pointer'>Follow</p>
                        </div>
                        <p className='text-sm '>May 21, 2024</p>
                    </div>
                </div>
                <div className='w-full h-10  border-t-[1px] border-b-[1px] py-6 border-[#d3d3d3] mt-10 flex items-center justify-start gap-10'>
<                   div className='flex items-center gap-1'>
                        <AiOutlineLike className='text-base'/>
                        <p className='text-xs opacity-70 font-medium'>{blogData.likes ? 0 :  blogData.likes }</p>
                    </div>
                    <div  className='flex items-center gap-1'>
                        <FaRegComment className='text-base'/>
                        <p className='text-xs opacity-70 font-medium'>{blogData.comment ? 0 : blogData.comment}</p>
                    </div>
                </div>
                <div className='w-full h-[75vh] flex items-center justify-center rounded-md overflow-hidden mt-10'>
                    <img className='object-fill h-full w-full' src={blogData.image} alt="" />
                </div>
                <div></div>
            </div> : <h1>Loading....</h1>
        }
    </div>
  )
}

export default BlogPage