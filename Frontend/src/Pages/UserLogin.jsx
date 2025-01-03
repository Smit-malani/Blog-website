import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../utils/slices/userSlice'

function UserLogin() {
    const[user,setUser] = useState({})

    const[email,setEmail] = useState('')
    const[password, setPassword] = useState('')
    const navigate = useNavigate()

    const dispatch = useDispatch()


    async function submitHandler(e){
      e.preventDefault()  
      const userData = {
        email,
        password
      }
      
      try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/login`,userData)        
        if(res.status === 200){
          const data = res.data
          setUser(data.user)
          dispatch(login(data.user))
          toast.success("Account Logged-In successfully")
          navigate('/')
        }        
      } catch (err) {
        toast.error(err.response?.data?.message || "An error occurred")
      }
      setEmail('')
      setPassword('')
      
    }



    return (
        <div className='w-screen h-screen flex flex-col items-center justify-start mt-20 gap-3'>
          <form onSubmit={(e)=>submitHandler(e)} className='flex flex-col w-full items-center gap-10 lg:w-1/2 md:w-full'>
              <h1 className='text-4xl font-bold'>Login</h1>
              <div className='flex flex-col w-1/2 gap-4'>
                <input onChange={(e)=>setEmail(e.target.value)} required value={email} type='email' placeholder='Enter email' className='px-3 py-2 rounded-md focus:outline-none border-2 focus:border-black'/>
                <input onChange={(e)=>setPassword(e.target.value)} required value={password} type='password' placeholder='Enter password' className='px-3 py-2 rounded-md focus:outline-none border-2 focus:border-black'/>
                <button className='bg-blue-600 px-3 py-2 rounded-md text-white font-semibold hover:bg-blue-700'>Login</button>
              </div>
          </form>
          <p className='text-xs'>Don't have an Account? <Link to={'/signup'} className='font-medium text-blue-600 cursor-pointer underline text-sm'>Create Account</Link></p>
        </div>
      )
}


export default UserLogin