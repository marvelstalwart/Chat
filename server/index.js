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

global.onlineUsers = new Map();
io.on("connection", (socket)=> {
    global.chatSocket = socket,
    socket.on("add-user", (userId)=> {
        onlineUsers.set(userId, socket.id)
    })

    socket.on("send-msg", (data)=> {
        const sendUserSocket = onlineUsers.get
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-received", data.message)
        }
    })
})

