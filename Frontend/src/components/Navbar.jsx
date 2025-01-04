import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { CiSearch } from "react-icons/ci"
import { TfiWrite } from "react-icons/tfi"
import { IoMdNotificationsOutline } from "react-icons/io"
import { IoNotifications } from "react-icons/io5"
import { FaRegUser } from "react-icons/fa6"



function Navbar() {

  const[isNotific, setIsNotific] = useState(false)

  function handleNotific(){
    if(isNotific){
      setIsNotific(false)
    }else{
      setIsNotific(true)
    }
  }

  return (
    <>
        <div className='w-full bg-transparent px-12 py-4 fixed border-b-[1px] border-[#e1e1e1]'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-5'>
                  <h1 className='font-bold uppercase text-2xl'>Postly</h1>
                  <div className='w-64 bg-[#f1f1f1] py-2 flex items-center rounded-full pl-4'>
                    <div className='w-6 h-6 flex items-center justify-center'>
                    <CiSearch className='text-xl text-zinc-500' />
                  </div>
                  <input type='text' placeholder='search' className='w-full px-4 rounded-full outline-none bg-[#f1f1f1] placeholder:text-zinc-500 tracking-wide placeholder:font-medium'/>
                </div>
                </div>
                <div className=' flex items-center gap-5'>
                  <div className='flex items-center text-zinc-600 gap-2 cursor-pointer hover:text-zinc-800'>
                    <TfiWrite />
                    <p>Write</p>
                  </div>
                  <div>
                    {
                      isNotific ?<div className='text-2xl text-zinc-600' onClick={handleNotific}><IoNotifications/></div> : <div className='text-2xl text-zinc-600 hover:text-zinc-800 cursor-pointer' onClick={handleNotific}><IoMdNotificationsOutline /></div>
                    }
                  </div>
                  <div className='h-8 w-8 rounded-full flex items-center cursor-pointer text-zinc-600 justify-center'>
                    <FaRegUser />
                  </div>
                </div>
              </div>
        </div>
        <Outlet/>
    </>
  )
}

export default Navbar