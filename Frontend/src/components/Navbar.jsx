import React from 'react'
import { Outlet } from 'react-router-dom'

function Navbar() {
  return (
    <>
        <div className='w-full px-12 py-4'>
            <div>
                <h1 className='font-bold uppercase text-2xl'>Postly</h1>
            </div>
        </div>
        <Outlet/>
    </>
  )
}

export default Navbar