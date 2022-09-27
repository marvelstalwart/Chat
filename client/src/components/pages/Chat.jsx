import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Picker from "emoji-picker-react"
import { faArrowLeft, faPaperPlane, faFaceSmile } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { newMessage } from '../../features/messages/messageSlice'
import { useDispatch } from 'react-redux'
import { getChats } from '../../features/messages/messageSlice'
import { Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
export default function Chat() {
    let navigate = useNavigate()
    let dispatch = useDispatch();
    const [emojiPicker, setEmojiPicker] = useState(false)
    const {selectedUser} =useSelector((state)=> state.users)
    const {user} = useSelector((state)=> state.auth)
    const {messages} = useSelector((state)=> state.messages)
    const [message, setMessage] = useState("")
    
 
    const handleEmoji = ()=> {
        setEmojiPicker(!emojiPicker)
    }

    useEffect(()=> {
            dispatch(getChats({from:user._id, to: selectedUser._id}))
            
    },[messages])
    const addEmoji = ( emoji)=> {
       
        let msg = message
        msg+=emoji.emoji
        setMessage(msg)
    }

    const sendChat = (e)=> {
        e.preventDefault()
        if (message.length> 0){
             console.log(selectedUser._id, user._id, message)

                 dispatch(newMessage({from:user._id, to: selectedUser._id, message: message}))
                setMessage("");
        }
        else {
            setMessage("");
            

        }
    }

  return (
    <div className=" h-screen w-full flex flex-col">
             
        <div className='header z-10 flex w-full items-center p-4 gap-2 h-38 bg-white'>
            <div onClick={()=> navigate(-1)}><FontAwesomeIcon icon={faArrowLeft}/></div>
            <img  className='max-w-[3rem]' src={`data: image/svg+xml;base64,${ selectedUser && selectedUser.avatarImage}`}/>
            <div className=''>{selectedUser && selectedUser.nickname}</div>
            
         </div>
             <div className='bg-gray-100 flex-1 relative w-full'>
                    <div className='p-2'>
                         <div className=' w-fit h-fit bg-white p-5 rounded-lg'>
                             Maguire today!
                         </div>
                    </div>
                

    <div className='absolute bottom-0 w-full px-5 pb-5'>
    <div className=' flex  items-center gap-2'>
            <FontAwesomeIcon onClick={handleEmoji} icon={faFaceSmile} size="2xl" className="text-gray-700  "/>
            <form className='relative flex justify-end items-center flex-1' onSubmit={sendChat}>
        

    
     <input value={message} onChange={(e)=> setMessage(e.target.value)} className='rounded-xl p-5  w-full overflow-y-visible' type="text" placeholder='Type your message..'/>
            <FontAwesomeIcon icon={faPaperPlane} size="2xl" className="absolute pr-4 text-gray-700"/>
          
           
         
  
    </form> 
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
