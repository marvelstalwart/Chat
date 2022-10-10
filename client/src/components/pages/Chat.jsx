import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Picker from "emoji-picker-react"
import { faArrowLeft, faPaperPlane, faFaceSmile } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { newMessage } from '../../features/messages/messageSlice'
import { useDispatch } from 'react-redux'
import { getChat } from '../../features/messages/messageSlice'
import { Navigate, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { socket } from '../../features/users/usersSlice'
import { resetChat } from '../../features/users/usersSlice'
import { reset, setId, addMessage } from '../../features/messages/messageSlice'
export default function Chat({ selectedUser, socket}) {
    let navigate = useNavigate()
    let dispatch = useDispatch();

    const lastMessageRef = useRef(null)
   let location = useLocation();
  
    const [emojiPicker, setEmojiPicker] = useState(false)
   
    const {user} = useSelector((state)=> state.auth)
    let {messages, chat, chats} = useSelector((state)=> state.messages)
    const [message, setMessage] = useState("")
    
  console.log(chats[0].messages)
    const handleEmoji = ()=> {
        setEmojiPicker(!emojiPicker)
    } 

    useEffect(()=> {
        //position to buttom of the page  
        lastMessageRef.current?.scrollIntoView()

        //Emit the message received socket
        if (socket.current){
            socket.current.on("msg-received", (message)=> {
            
                chat = [...chat]
                chat.push({fromSelf:false, message})
              
                dispatch(addMessage(chat)) 
               
            } )

        }
       
 
    },[chat])
    

    useEffect(()=> {
           
            dispatch(getChat({from:user._id, to: selectedUser._id}))
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
                socket.current.emit("send-msg", {
                    to: selectedUser._id,
                    from: user._id,
                    message: message
                    // id: `${user._id}${Math.random()}`,
                    // socketID: user._id
                })
                chat = [...chat];
                chat.push({fromSelf:true, message: message})
                dispatch(addMessage(chat)) 
               
                setMessage("");
        }
        else {
            setMessage("");
            

        }
    }

    const handleTyping =() => {
        socket.current.emit("typing", `${user._id} is typing`)
    }
  return (
    <div className=" h-screen w-full flex flex-col">
             
        <div className='header z-10 flex w-full items-center p-4 gap-2 h-38 bg-white'>
    <div onClick={()=> dispatch(resetChat())}><FontAwesomeIcon icon={faArrowLeft}/></div>
           <div onClick={()=> navigate(`user/${selectedUser.nickname.toLowerCase()}`,{state:{selectedUser}})} className='flex items-center gap-2  w-full cursor-pointer'>
           <img  className='max-w-[3rem]' src={`data: image/svg+xml;base64,${ selectedUser && selectedUser.avatarImage}`}/>
            <div className=''>{selectedUser && selectedUser.nickname}</div>
           
           </div>
            
         </div>
             <div className='bg-gray-100 flex-1 relative w-full overflow-y-scroll'>
                    {chat && chat.map((chat, index)=> {
                      
                      
                        return <div key={index} className={`p-1 flex ${chat.fromSelf && `justify-end`} w-full`}>
                        <div className=' w-fit h-fit bg-white p-3 rounded-lg'>
                            {chat.message}
                        </div>
                        <div ref={lastMessageRef}/>
                   </div> })}
                    
                

    
    </div>
    <div className='bg-gray-100 w-full  px-5 pb-2'>
    <div className=' flex  items-center gap-2'>
            <FontAwesomeIcon onClick={handleEmoji} icon={faFaceSmile} size="2xl" className="text-gray-700  "/>
            <form className='relative flex justify-end items-center flex-1' onSubmit={sendChat}>
        

    
     <input onKeyDown={handleTyping} value={message} onChange={(e)=> setMessage(e.target.value)} className='rounded-xl p-5  w-full overflow-y-visible' type="text" placeholder='Type your message..'/>
            <FontAwesomeIcon icon={faPaperPlane} size="2xl" className="absolute pr-4 text-gray-700"/>
          
           
         
  
    </form> 
    </div>
    <div>
        {
            emojiPicker && 
            <div className=' '><Picker  onEmojiClick={addEmoji}/></div>
        }
   
       
    </div>
       
        </div>


    </div>
   
  )
}
