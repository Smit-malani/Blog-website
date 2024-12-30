import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

function Blogs() {

    const[blogs,setBlogs] = useState([])

    async function fetchBlogs(){
        try {
            let res = await axios.get("http://localhost:3000/api/v1/blogs")
            if(res.status === 200){
                const data = res.data
                setBlogs(data.blog)
            }else{
                
            }
        } catch (err) {
            toast.error(err.response.data.message || "An error occurred")
        }
    }
    useEffect(()=>{
        fetchBlogs()
    })    
  return (
    <div>
        {
            blogs.map((blog, index)=>{
                return (
                    <ul key={index}>
                        <li>{blog.title}</li>
                        <p>{blog.description}</p>
                    </ul>
                )
            })
        }
    </div>
  )
}

export default Blogs