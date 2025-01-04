import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigationType, useParams } from 'react-router-dom'
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa6";
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { addSelectedBlog, removeSelectedBlog } from '../utils/slices/selectedBlogSlice';

function BlogPage() {

    const {id} = useParams()
    const dispatch = useDispatch()
    const {token, user} = useSelector(slice => slice.user)    
    const navigationType = useNavigationType()
    
    const[blogData, setBlogData] = useState(null)     
    const [isLike, setIsLike] = useState(false)
    

    async function fetchBlogById(){
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/blog/${id}`)
            if(res.status === 200){
                const data = res.data           
                setBlogData(data.blog)  
                if(res.data.blog.likes.includes(user._id)){
                    setIsLike(true)
                }                              
                dispatch(addSelectedBlog(data.blog))
            } 
        }catch (err) { 
            toast.error(err.response.data.message || "An error occurred")
        }
    }

    async function handleLikeUnlike() {
        if(token){
            if(isLike){
                const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/blog/like/${id}`,{},{headers:{Authorization: `Bearer ${token}`}})
                setIsLike(false)
                toast.success(res.data.message)
            }else{
                const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/blog/like/${id}`,{},{headers:{Authorization: `Bearer ${token}`}})
                setIsLike(true)
                toast.success(res.data.message)
            }
            fetchBlogById()
        }else{
            toast.error("Please Sign-in")
        }
    }

    useEffect(()=>{
        fetchBlogById()
        if(navigationType == 'POP'){
            return ()=>{
                dispatch(removeSelectedBlog())
            }
        }
    },[])
    

  return (
    <div className='w-full min-h-screen flex justify-center mt-28'>
        {
            blogData ? <div className='w-[55%] h-full flex flex-col'>
                <div className='title w-full '>
                    <h1 className='font-bold text-4xl opacity-80'>{blogData.title}</h1>
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
                <div className='w-full h-10  border-t-[1px] border-b-[1px] py-6 border-[#d3d3d3] mt-10 flex items-center justify-start gap-3 px-5'>
<                   div className='flex items-center gap-1 cursor-pointer min-w-10'>
                        {
                            !isLike ? <> 
                                <BiLike className='text-base' onClick={handleLikeUnlike}/>
                                <p className='text-xs opacity-70 font-medium'>{blogData.likes.length}</p>
                            </>
                            : <>
                                <BiSolidLike className='text-base' onClick={handleLikeUnlike} />
                                <p className='text-xs opacity-70 font-medium'>{blogData.likes.length}</p>
                            </> 
                        }
                    </div>
                    <div  className='flex items-center gap-1  min-w-10'>
                        <FaRegComment className='text-base'/>
                        <p className='text-xs opacity-70 font-medium'>{blogData.comment ? 0 : blogData.comment}</p>
                    </div>
                </div>
                <div className='w-full h-[75vh] flex items-center justify-center rounded-md overflow-hidden mt-7'>
                    <img className='object-cover rounded-md' src={blogData.image} alt="" />
                </div>
                <div></div>
                <div className='w-full flex items-center justify-center'>
                    {
                        token && user.email == blogData.creater.email && <Link to={`/edit/${blogData.blogId}` } className='bg-blue-600 hover:bg-blue-700 w-1/3 my-5 text-white font-semibold text-lg rounded-md px-5 py-2 flex items-center justify-center'>Edit Blog</Link>
                    }
                </div>    
            </div> : <h1>Loading....</h1>
        }
    </div>
  )
}

export default BlogPage