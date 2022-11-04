import React from 'react'

export default function MyVideo1({callAccepted, callEnded, myVideo, leaveCall}) {
  return (
                <div className=' z-10 w-full h-full absolute ' > 
                            <video className={`${callAccepted && !callEnded? 'absolute bottom-0 right-0  h-24 border-2 border-blue' : 'top-0 left-0 w-full h-full' }`} ref={myVideo} playsInline autoPlay/>
                           
                            <div className='absolute bottom-0 flex w-full justify-center  h-fit ' >
                                 
                                 <div onClick={leaveCall} className='z-50 bg-red-600 w-fit text-white p-2 rounded-md cursor-pointer'>End call</div>
                     
                                </div>
                               </div>

  )
}
