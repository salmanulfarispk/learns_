import React, { useEffect, useMemo, useState } from 'react'
import { io } from "socket.io-client"
import { HiOutlineDotsVertical } from "react-icons/hi";
import Users from './Users';




export const Message = () => {

  const socket=useMemo(()=> io("http://localhost:8000"),[])  // prevent it from being reinitialized on every render. 

const [message,setMessage]=useState('')
const [socketId,setSocketId]=useState('')
const [AllMessage,setAllMessage]=useState([])


  const handlesSubmit=(e)=>{
    e.preventDefault();
    if(message.trim()){
     socket.emit("message",message);
     setMessage('')
    }
  }

   useEffect(()=>{
    
    socket.on("connect",()=>{
       setSocketId(socket.id)
    })

    socket.on('message',(newMessage)=>{
       setAllMessage((prevmess)=> [...prevmess,newMessage])
    })


    return ()=>{
       socket.disconnect();
    }
    
   },[socket])



  return (
    <div className='w-full h-screen flex flex-col px-3 md:px-0'>
       <div className='w-full h-28 flex items-center justify-center'>
        <h1 className='text-5xl font-serif tracking-wide'>Welcome to ChatRoom </h1>
       </div>
       <div className='w-full flex items-center justify-center'>
        <h1 className='text-2xl font-serif tracking-wider'>Total message send by me <span>{3}</span></h1>
       </div>

        <div className='mx-auto pt-16 grid grid-cols-1 md:grid-cols-2 gap-x-10'>

            <div>
               <h1 className='text-md font-semibold mb-2'>All users :-</h1>
               <Users/>
            </div>


           <div className='w-[500px] h-[450px] flex flex-col rounded border relative'>

             <div className='px-4 py-2 border flex items-center justify-between'>
              <div className='flex'>
                  <span className='w-9 h-9 rounded-full bg-black text-white flex items-center justify-center'>SA</span>
                  <span className='ms-2 mt-1'>{socketId}</span>
               </div>
               <div className='cursor-pointer'>
               <HiOutlineDotsVertical size={20}/>
               </div>
             </div>

            {/**message area */}
             <div className='flex-1 overflow-y-auto p-2 text-sm'>
              {AllMessage.map((ms,ind)=>(
                     <p key={ind} className='mb-1'>
                     {ms}
                    </p>   
              ))}
                
             </div>



             <div className='flex w-full h-11 border-t rounded-sm'>
                <input type='text' className='outline-none w-full px-3 text-xs' placeholder='type here...'
                 value={message} onChange={(e)=> setMessage(e.target.value)}
                />
                <button className='px-4 bg-teal-600 text-white' onClick={handlesSubmit}>send</button>
             </div>
           </div>
        </div>

        

    </div>
  )
}
