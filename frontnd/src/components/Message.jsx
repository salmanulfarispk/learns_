import React, { useEffect, useMemo, useState } from 'react'
import { io } from "socket.io-client"
import { Button, Container, TextField, Typography} from "@mui/material"


export const Message = () => {

  const socket=useMemo(()=> io("http://localhost:8000"),[])  // prevent it from being reinitialized on every render. 

const [message,setMessage]=useState('')

  const handlesSubmit=(e)=>{
    e.preventDefault();

    socket.emit("message",message)
    setMessage('')

  }

   useEffect(()=>{
    
    socket.on("connect",()=>{
       console.log("connected",socket.id);
       
    })


    socket.on("welcome",(data)=>{
       console.log(data);
       
    })

    return ()=>{
       socket.disconnect();
    }
    
   },[])



  return (
    <Container maxWidth='sm' className='pt-10'>
      <Typography variant='h2' component="div" gutterBottom>
     Welcome to Sender!
      </Typography>


      <form onSubmit={handlesSubmit}>
        <TextField id='outlined-basic' label='message' variant='outlined' value={message} onChange={(e)=> setMessage(e.target.value)}/>
        <Button type='submit' variant='contained' color='primary'>send</Button>
      </form>

    </Container>
  )
}
