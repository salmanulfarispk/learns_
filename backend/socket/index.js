import express from "express"
import { Server } from 'socket.io'
import {createServer} from "http"

const app = express();
 
const server= createServer(app);

const io = new Server(server,{ 
    cors:{
        origin:"http://localhost:5173",
        methods: ['GET','POST'],
        credentials: true
    }
})
 
   

io.on("connection",(socket)=>{
 
    console.log("New client connected:", socket.id);

    socket.on("message",(data)=>{
        
        io.emit('message',data)
            
    }) 
     
    socket.on("disconnect",()=> {
        console.log("user Disconect",socket.id);
        
    })  
    
})
 













export{
    app,
    server
}