import React from 'react'
import { useEffect, useRef, useState } from 'react'
import Peer from "simple-peer"

import {faVideo, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { endCall, setStream } from '../../../features/socket/socketSlice'
import { incomingCall, acceptCall } from '../../../features/socket/socketSlice'
import { useSelector } from 'react-redux'
import CallNotification from './CallNotification'


export default function CallScreen({socket, selectedUser, user, dispatch, myVideo}) {

    const {callAccepted, receivingCall, callEnded, caller, callerSignal, stream} = useSelector((state)=> state.socket)
    
     
        const userVideo = useRef(null) 
        const connectionRef = useRef(null)
    useEffect(()=> {

       
        navigator.mediaDevices.getUserMedia({video:true, audio: true}).then((stream)=>{
         
        
        dispatch(setStream(stream))
          
            myVideo.current.srcObject = stream
            
        })

        // socket.current?.on("callUser", (data)=> {
        //   console.log("Calling")
        //     let payload = {caller: data.from, name: data.name, callerSignal: data.signal }
        //   console.log(payload)
        // })

    },[])

        const callUser =()=> {
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
               console.log(userVideo)
               console.log(stream)
                userVideo.current.srcObject = stream
                
            })
    
            peer.on("error", (err)=>
            {
                console.log(`There was an error: ${err}`)
            })
            socket.current?.on("callAccepted", (signal)=> {
                peer.signal(signal)
                dispatch(acceptCall())
               
            })
    
            connectionRef.current=peer
          
                   socket.current.on("endCall",()=> {
                        dispatch(endCall())
                     })
                           
           
        

        }
    
        // useEffect(()=> {
                
            
        //     if (callAccepted && stream) {
        //         console.log("Call Accepted")
        //     console.log("This is the stream"+ stream)
        //         const peer = new Peer({
        //             initiator: false,
        //             trickle:false,
        //             stream: stream
        //         })
              
        //         peer.on("signal", (data)=> {
        
    
        //             socket.current?.emit("answerCall", {
        //                 signal: data,
        //                 to: caller,
                      
        //             }) 
        //         })
        //         peer.on("stream", (stream)=> {
                   
        //             userVideo.current.srcObject = stream
        //         })
        //         peer.on("error", (err)=>
        //         {
        //             console.log(`There was an error: ${err}`)
        //         })
              
        //         console.log(`Caller: ${caller} Caller Signal : ${callerSignal}`)
        //         peer.signal(callerSignal)
               
        //         connectionRef.current=peer
        //         console.log("This is the peer"+ connectionRef.current)
                
    
        //     }
           
        // },[stream, callAccepted]) 
        
        const answerCall = ()=> {

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
        

        


    const leaveCall = ()=> {
        
     
        socket.current.emit("end-call", {
            userToCall: selectedUser._id
        })
                connectionRef.current.destroy()
        console.log("Ending"+connectionRef.current)
    
    }

  
  return (
    <div className='p-0 m-0  flex  flex-col justify-between  absolute w-screen h-screen bg-gray-100  top-0 left-0'>
         <div className='relative '>
            <div className='rounded-b-md  flex flex-col gap-2'>
           
           { callAccepted && !callEnded ? <video className='h-full' playsInline autoPlay ref={userVideo}/> 
           :null
       
           } 
              
              <video className={` ${callAccepted? `absolute bottom-0 right-0  h-24 border-2 border-blue` : `h-full`} `} playsInline autoPlay ref={myVideo}/>
                
             

            </div>
         
            </div>   
    <div className='flex justify-center h-48 items-center gap-2'>
    <div onClick={answerCall} className='bg-blue text-white p-2 rounded-md'> Answer call</div>
        
      <div onClick={callUser} className='bg-blue text-white p-2 rounded-md'>  Call {selectedUser.nickname}</div>
      <div onClick={leaveCall} className=' bg-red-600 text-white p-2 rounded-md'>End call</div>
    {/* <FontAwesomeIcon onClick={leaveCall} className=" cursor-pointer text-4xl w-20 h-20 text-white bg-red-600 p-2 rounded-full text-red" icon={faTimes}/>
    
     */}
    </div>
    </div>
  )
}
