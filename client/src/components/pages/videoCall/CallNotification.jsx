import React from 'react'
import Peer from "simple-peer"
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { answerCall } from './socket'
import { answer } from '../../../features/socket/socketSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default function CallNotification ({stream, socket,  connectionRef, userVideo}) {
   const {callerPhoto, name, caller, callerSignal, callAccepted} = useSelector((state)=> state.socket)

   let dispatch = useDispatch()
   const accept = ( userVideo, connectionRef, socket, caller, callerSignal, stream)=> {

         dispatch(answer())
         
        
         answerCall(userVideo, connectionRef, socket, caller, callerSignal, stream);
  }


  return (
   <div className=' z-50  absolute w-screen h-screen'>
    <div className='flex  justify-center  items-center z-50 p-0 m-0 absolute w-screen h-screen bg-gray-700/70  top-0 left-0'>
       <div className='flex flex-col gap-20 '>
       <div>
       <img alt="Image"  className="h-40 " src={`data: image/svg+xml;base64, ${callerPhoto}`}/>
        <div className='text-center text-white text-4xl'>{name}</div>
        </div>
        
        <div className=' relative flex justify-center'>
            <FontAwesomeIcon onClick={()=>accept(userVideo, connectionRef, socket, caller, callerSignal, stream)} className='z-10 bg-blue text-white p-5 rounded-full cursor-pointer' icon={faPhone}/>
           <div className='animate-ping absolute w-14 bg-blue h-14 rounded-full'/>
        </div>
           </div>
        </div>
        </div>
  )
}
