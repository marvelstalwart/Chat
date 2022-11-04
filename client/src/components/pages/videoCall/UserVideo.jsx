import React from 'react'

export default function UserVideo({userVideo, leaveCall}) {
  return (
    <div className=' z-50 w-full h-full  absolute'>
                     
    <video className='h-full w-full' playsInline autoPlay ref={userVideo}/> 
    <div className='absolute bottom-0 flex w-full justify-center  h-fit z-50 ' >
             
             <div onClick={leaveCall} className=' bg-red-600 w-fit cursor-pointer text-white p-2 rounded-md'>End this call</div>
 
            </div>
  </div>
  )
}
