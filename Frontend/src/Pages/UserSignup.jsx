import React from "react";
import axios from 'axios'
import { useState} from 'react'
import {useNavigate} from 'react-router-dom'
import toast from "react-hot-toast";



function UserSignup(){
    const[user,setUser] = useState([])
    const[name,setName] = useState('')
    const[email,setEmail] = useState('')
    const[password, setPassword] = useState('')
    const Navigate = useNavigate()
    async function submitHandler(e){
      e.preventDefault()  
      const userData = {
        name,
        email,
        password
      }
      try {
        const res = await axios.post("http://localhost:3000/api/v1/register",userData)
        if(res.status === 201){
          const data = res.data
          setUser(data.user)
          localStorage.setItem("user",JSON.stringify(data.user))
          toast.success("Account created successfully")
          Navigate('/')
        }        
      } catch (err) {
        toast.error(err.response.data.message || "An error occurred")
      }
      setName('')
      setEmail('')
      setPassword('')
      
    }

    return (
        <div className='w-screen h-screen flex items-center justify-center'>
          <form onSubmit={(e)=>submitHandler(e)} className='flex flex-col w-full items-center gap-10 lg:w-1/2 md:w-full'>
              <h1 className='text-4xl font-bold'>Sign up</h1>
              <div className='flex flex-col w-1/2 gap-4'>
                <input onChange={(e)=>setName(e.target.value)} value={name} required type='text' placeholder='Enter name' className='px-3 py-2 rounded-md focus:outline-none border-2 focus:border-black'/>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} required type='email' placeholder='Enter email' className='px-3 py-2 rounded-md focus:outline-none border-2 focus:border-black'/>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} required type='password' placeholder='Enter password' className='px-3 py-2 rounded-md focus:outline-none border-2 focus:border-black'/>
                <button className='bg-blue-600 px-3 py-2 rounded-md text-white font-semibold hover:bg-blue-700'>Register</button>
              </div>
          </form>
        </div>
      )
}

export default UserSignup