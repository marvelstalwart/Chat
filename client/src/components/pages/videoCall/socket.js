import Peer from "simple-peer"
import { useState, useEffect, useRef } from 'react'
import { io } from 'socket.io-client';
import { useDispatch } from "react-redux";
import { acceptCall, endCall } from "../../../features/socket/socketSlice";
import { setStream } from "../../../features/socket/socketSlice";




export const callUser =(callAccepted, user, selectedUser, socket, connectionRef, userVideo, myVideo, stream, dispatch)=> {
   
   
   
  
   
    console.log(stream)
    const peer = new Peer ({
        initiator: true, 
        trickle: false,
        stream: stream
    })


    peer.on("signal", (data)=> {
        socket.current?.emit("callUser", {
            userToCall: selectedUser._id,
            signalData: data,
            from: user._id,
            name: user.name,
            avatar: user.avatarImage
    
        })
        
    })

    peer.on("stream", (stream)=> {
       console.log("userVid"+userVideo)
       console.log(stream)
        userVideo.current.srcObject = stream
        
    })

    peer.on("error", (err)=>
    {
        console.log(`There was an error: ${err}`)
    })
    socket.current?.on("callAccepted", (signal)=> {
        console.log(callAccepted)
        peer.signal(signal)
        dispatch(acceptCall())
       
    })

    connectionRef.current=peer
  
           socket.current.on("endCall",()=> {
                dispatch(endCall())
             })
                   
   


}

export const answerCall = ( userVideo, connectionRef, socket, caller, callerSignal, stream)=> {

    

   
    console.log("Call Accepted")
    console.log("This is the stream"+ stream)
    const peer = new Peer({
        initiator: false,
        trickle:false,
        stream: stream
    })
  
    peer.on("signal", (data)=> {
  
  
        socket.current?.emit("answerCall", {
            signal: data,
            to: caller,
          
        }) 
    })
    peer.on("stream", (stream)=> {
       
        userVideo.current.srcObject = stream
    })
    peer.on("error", (err)=>
    {
        console.log(`There was an error: ${err}`)
    })
  
    console.log(`Caller: ${caller} Caller Signal : ${callerSignal}`)
    peer.signal(callerSignal)
   
    connectionRef.current=peer
    console.log("This is the peer"+ connectionRef.current)
    
  }   
