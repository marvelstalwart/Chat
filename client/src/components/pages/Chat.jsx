import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Picker from "emoji-picker-react"
import { faArrowLeft, faPaperPlane, faFaceSmile } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
export default function Chat() {
    let navigate = useNavigate()
    const [emojiPicker, setEmojiPicker] = useState(false)
    const {selectedUser} =useSelector((state)=> state.users)
    const [message, setMessage] = useState("")
    

    const handleEmoji = ()=> {
        setEmojiPicker(!emojiPicker)
    }
    const addEmoji = ( emoji)=> {
        console.log(message)
        console.log()
        let msg = message
        msg+=emoji.emoji
        setMessage(msg)
    }
  return (
    <div className=" h-full w-full">
             
        <div className='header z-10 flex w-full items-center p-4 gap-2 h-38 bg-white'>
            <div onClick={()=> navigate(-1)}><FontAwesomeIcon icon={faArrowLeft}/></div>
            <img  className='max-w-[3rem]' src={`data: image/svg+xml;base64,${selectedUser.avatarImage}`}/>
            <div className=''>{selectedUser.nickname}</div>
            
         </div>
             <div className='bg-gray-100 h-full relative w-full'>
                    <div className='p-2'>
                         <div className=' w-fit h-fit bg-white p-5 rounded-lg'>
                             Maguire today!
                         </div>
                    </div>
                

    <div className='absolute bottom-0 w-full px-5 pb-5'>
    <div className=' flex  items-center gap-2'>
            <FontAwesomeIcon onClick={handleEmoji} icon={faFaceSmile} size="2xl" className="text-gray-700  "/>
        
        <div className='relative flex justify-end items-center flex-1'>
            
        <input value={message} onChange={(e)=> setMessage(e.target.value)} className='rounded-xl p-5  w-full overflow-y-visible' type="text" placeholder='Type your message..'/>
            <FontAwesomeIcon icon={faPaperPlane} size="2xl" className="absolute pr-4 text-gray-700"/>
            
    </div>
    </div>
    <div>
        {
            emojiPicker && <Picker onEmojiClick={addEmoji}/>
        }
   
       
    </div>
       
        </div>
    </div>


    </div>
   
  )
}
