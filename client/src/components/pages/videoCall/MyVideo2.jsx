import React from 'react'

export default function MyVideo2({callAccepted ,callEnded, myVideo}) {
  return (
                <div className=' z-50  absolute w-screen h-screen'>
                            <video className={`${callAccepted && !callEnded? 'absolute bottom-0 right-0  h-24 border-2 border-blue' : 'top-0 left-0 w-full h-full' }`} playsInline autoPlay ref={myVideo}/>   
                               </div> 
  )
}
