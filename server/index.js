const express = require('express');
const mongoose = require('mongoose');
const app = express(); 
const cors = require("cors")
const groupsRoute = require("./routes/groupsRoute")
const messageRoute = require("./routes/messagesRoute")
const userRoute = require("./routes/userRoute")
const socket = require("socket.io")
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
require("dotenv").config();
const PORT = process.env.PORT
const CONN = process.env.CONN


 



app.use("/api/users", userRoute)
app.use("/api/messages", messageRoute)
app.use("/api/groups", groupsRoute)
  

    mongoose.connect(`${CONN}`, {useNewUrlParser:true, useUnifiedTopology: true} )
    .then(()=> {
        console.log("connected")
    })
    .catch((err)=> {
        console.log(err.message)
    })

 


const server =app.listen(PORT, ()=> console.log(`server running on port ${PORT}`))



const io = socket(server, {
    cors: {
     origin: `https://yarnchat.netlify.app`,
     credentials:true
    }        
 }) 
 
global.onlineUsers = new Map()
let activeUsers = []
 io.on("connection", (socket)=> {
    global.chatSocket = socket

    socket.on("newUser", (userId)=> {
        onlineUsers.set(userId, socket.id)
        if (!activeUsers.some((user)=> user.userId ===userId)){
            
            activeUsers.push({userId: userId, socketId: socket.id})
        }
        
        io.emit("userOnline", activeUsers)
        
        console.log(activeUsers)
      })
    
    socket.on("send-msg", (data)=> {
       
        const sendUserSocket = onlineUsers.get(data.to)
        console.log(global.onlineUsers)
        if (sendUserSocket) {
           console.log(data.message)
            socket.to(sendUserSocket).emit("msg-received", data)
        }
    }) 

    socket.on("msg-read", (user)=> {
        const sendUserSocket = onlineUsers.get(user)
        if(sendUserSocket){
            console.log(sendUserSocket)
            socket.to(sendUserSocket).emit("msg-read")
        }
    })
        
        socket.on("callUser", (data)=> {
            
            const sendUserSocket = onlineUsers.get(data.userToCall)
            if (sendUserSocket){
               
             
                socket.to(sendUserSocket).emit("callUser", 
               
                {

                    signal: data.signalData,
                    from: data.from,
                    name:data.name,
                    avatar: data.avatar
                   
    
                })
            }
            
        })
        socket.on("end-call", (data)=> {
            const sendUserSocket = onlineUsers.get(data.userToCall) 
            socket.to(sendUserSocket).emit("endCall")
        })

        socket.on("answerCall", (data)=> {
           
            const sendUserSocket = onlineUsers.get(data.to)
 
            socket.to(sendUserSocket).emit("callAccepted", data.signal)
        }) 
 
    socket.on("typing", (data)=> {
        const sendUserSocket = onlineUsers.get(data) 
            socket.to(sendUserSocket).emit("typing")
       
    })

    socket.on("stop-typing", (data)=> {
        const sendUserSocket = onlineUsers.get(data) 
            socket.to(sendUserSocket).emit("stop-typing")
       
    })

    socket.on("join-chat", (id)=> {

        socket.join(id)
        console.log(`A user joined ${id}`)
    })
 
    socket.on("send-groupMsg", (data)=> {
      console.log(data)
        socket.broadcast.to(data.groupId).emit("message", data.data)
    })

    socket.on("group-typing", (data)=> {

    })

     socket.on("disconnect", ()=> {

        console.log("Disconnecting")
      activeUsers = activeUsers.filter((user)=> user.socketId !== socket.id)
      console.log(activeUsers)

      io.emit("userOffline", activeUsers)
      
        console.log(`A user disconnected`)
     })
     socket.on("offline", ()=> {
      
        console.log(socket.id)
        activeUsers = activeUsers.filter((user)=> user.socketId !== socket.id)
      console.log("User logged out")
      
      io.emit("userOffline", activeUsers)
     })
 
       //  socket.on("send-msg", (data)=> {
    //      const sendUserSocket = onlineUsers.get
    //      if (sendUserSocket) {
    //          socket.to(sendUserSocket).emit("msg-received", data.message)
    //      }
    //  })
 })