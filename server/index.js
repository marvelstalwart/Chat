const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require("cors")
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
  

    mongoose.connect(CONN, {useNewUrlParser:true, useUnifiedTopology: true} )
    .then(()=> {
        console.log("connected")
    })
    .catch((err)=> {
        console.log(err.message)
    })

 


const server =app.listen(PORT, ()=> console.log(`server running on port ${PORT}`))



const io = socket(server, {
    cors: {
     origin: `http://localhost:3000`,
     credentials:true
    }        
 }) 
 
global.onlineUsers = new Map()
 io.on("connection", (socket)=> {
    global.chatSocket = socket
    socket.on("newUser", (userId)=> {
        onlineUsers.set(userId, socket.id)
        console.log(global.onlineUsers)
      })
    
    socket.on("send-msg", (data)=> {
        console.log(data.to)
        const sendUserSocket = onlineUsers.get(data.to)
        console.log(global.onlineUsers)
        if (sendUserSocket) {
            console.log("socket", sendUserSocket)
            console.log(data.message)
            socket.to(sendUserSocket).emit("msg-received", data.message)
        }
    })
       
  


    socket.on("typing", (data)=> {
    
        // socket.broadcast.emit('typingResponse', data)
    })
     socket.on("disconnect", (userId)=> {
        // onlineUsers = onlineUsers.filter((user)=> user.socketID !==socket.id )
        // io.emit("newUserResponse", onlineUsers)
        console.log(`A user disconnected`)
     })
 
    //  socket.on("send-msg", (data)=> {
    //      const sendUserSocket = onlineUsers.get
    //      if (sendUserSocket) {
    //          socket.to(sendUserSocket).emit("msg-received", data.message)
    //      }
    //  })
 })