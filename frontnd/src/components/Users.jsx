import React, { useEffect, useState } from 'react'

const Users = () => {
    const[Online,setonline]=useState(false)

    useEffect(()=>{
      setonline(true)
    },[])

  return (
    <>
    <div className='w-[400px] max-h-[350px] border overflow-y-auto p-1 rounded-md'>
     
     <div className='flex items-center justify-between px-3 py-2 mb-1 border rounded-md'>
        <p>username</p>
        <p className={`${Online? "text-green-600" : "text-red-500"}`} 
        >{Online ? "online" :"offline"}</p>
     </div>

    </div>


     <div className='mt-3 w-[400px]'>
      <input type='text' placeholder='send message to all users..' 
      className='w-3/4 outline-none  border rounded-md px-3 py-2' />
      <button className='px-7 py-2 bg-teal-600 text-white rounded-md ms-1'>Send</button>
     </div>

    </>
  )
}

export default Users