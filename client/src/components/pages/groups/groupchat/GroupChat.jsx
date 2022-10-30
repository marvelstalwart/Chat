import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect,useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { io } from 'socket.io-client'
import { faArrowLeft, faPaperPlane, faFaceSmile} from '@fortawesome/free-solid-svg-icons'
import Avatar from 'react-avatar'
import Picker from "emoji-picker-react"
import { AnimatePresence } from 'framer-motion'
import GroupInfo from '../groupinfo/GroupInfo'
import { resetGroup, addChat } from '../../../../features/groups/groupSlice'
import { getMessages, sendMsg } from '../../../../features/groups/groupSlice'
import { BigHead } from '@bigheads/core'

export default function GroupChat() {
    
    const {user} = useSelector(state=> state.auth)
    let {selectedGroup, chats}  =useSelector((state)=> state.groups)
    const [message, setMessage] = useState("")
    let dispatch = useDispatch()
    const socket = useRef()
    const lastMessageRef = useRef(null)
    const [showGroupInfo, setShowGroupInfo] = useState(false)
    const [emojiPicker, setEmojiPicker] = useState(false)
   
    useEffect(()=> {
        lastMessageRef.current?.scrollIntoView()
            
       
    },[chats])

    useEffect(()=> {
       
        if(selectedGroup) {
            socket.current = io("http://localhost:5000")
            socket.current?.emit("join-chat", selectedGroup._id)
            
           
     
            const payload = {
                userId: user._id,
                groupId:selectedGroup && selectedGroup._id
              }
            dispatch(getMessages(payload))    

        }
        
    },[selectedGroup])
    
   
    useEffect(()=> {
       
        socket.current?.on("message", (data)=> {
                console.log("Incoming message")
                   chats = [...chats];
                        chats.push({fromSelf:false, message: data.message, details: {
                     avatarImage: data.avatarImage,
                     nickname: data.nickname,
                     _id: data.id
               }})
                dispatch(addChat(chats)) 
            console.log(chats)
             
            //Only for users that are not the current User
            // if (data.id !== user._id) {
                
                
            //     chats = [...chats];
               
            //     chats.push({fromSelf:false, message: data.message, details: {
            //         avatarImage: data.avatarImage,
            //         nickname: data.nickname,
            //         _id: data.id
            //     }})
                
            //     dispatch(addChat(chats)) 
            //    console.log(chats)
            // }
            
        })

    },[chats?.details])
 
    const handleEmoji = ()=> {
        setEmojiPicker(!emojiPicker)
    }

    const addEmoji = ( emoji)=> {
       
        let msg = message
        msg+=emoji.emoji
        setMessage(msg)
    } 
   
    const sendChat = (e)=> {
        
        e.preventDefault()
        if (message.length> 0){
            console.log(chats)

            //  dispatch(sendMsg({from:user._id, groupId: selectedGroup._id, message: message, userId: user._id}))
                
            
            
            
            
                let payload = {groupId:selectedGroup._id, data: {
                    message:message, avatarImage: user.avatarImage,
                    nickname: user.name, id: user._id
                    
                    }
                    }
                socket.current.emit("send-groupMsg", payload)
               chats = [...chats]
                chats.push({fromSelf:true, message: message})
                dispatch(addChat(chats)) 
                console.log(chats)
                setMessage("");
            }
            else { 
            setMessage("");
            
            
            
        }
    }

   


  return (
    <div className=" h-screen w-full lg:p-4">
         <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={()=> null}
           >
         {showGroupInfo ? <GroupInfo setShowGroupInfo={setShowGroupInfo} selectedGroup={selectedGroup} /> : null }
         </AnimatePresence>
        {selectedGroup && 
        
        <div className='h-full w-full flex flex-col lg:rounded-xl bg-white relative'>
   
    <div className='header z-10 flex w-full items-center justify-between p-4  h-24 bg-white rounded-xl'>
    <div className='flex items-center gap-2'>
    <div className='lg:hidden' onClick={()=> dispatch(resetGroup())}><FontAwesomeIcon icon={faArrowLeft}/></div>
    <div onClick={()=> setShowGroupInfo(true)}className='flex items-center gap-2 font-medium w-full cursor-pointer'>

    <Avatar name={selectedGroup.name} size='40' round={true}/>
    <div className=''>{selectedGroup && selectedGroup.name}</div>

    </div>
    
    </div>


    <div className='flex gap-4 text-gray-500 cursor-pointer'>
    

    </div>

    </div>
    <div className='bg-white flex-1 relative w-full overflow-y-auto'>
    {chats &&chats.length ? chats.map((chat, index)=> {

    return <div key={index} className={`p-1 flex ${chat.fromSelf && `justify-end`} font-light`}>
    
    <div className={`${chat.fromSelf ? '  bg-sky-400  text-white rounded-tl-xl' : 'bg-gray-100 rounded-tr-xl'} w-fit h-fit bg-white p-2 rounded-b-xl `}>
        {/* Display other Users messages with their display picture and name */}
    { !chat.fromSelf ? <div className=' flex items-center'>
        <div>
            <BigHead className="w-[2rem]" {...chat.details.avatarImage}/>
        </div>
        <div>
            <div className='font-medium'>{chat.details.nickname}</div>
            <div >{chat.message}</div>
            </div>

        </div> 
        :
       chat.message
       
       }
    
    </div>
    <div ref={lastMessageRef}/>
    </div> })
    :
    <div className='flex justify-center'>
        <div className='bg-blue text-white font-light p-2 rounded-lg'> Be the first to send a message</div>
    </div>
    }




    </div>
    <div className='bg-white w-full  px-5 pb-2 rounded-xl py-4'>
    <div className=' flex  items-center gap-2 p-2 rounded-full bg-gray-100'>
    <FontAwesomeIcon onClick={handleEmoji} icon={faFaceSmile} size="lg" className="text-gray-500  "/>
    <form className='relative flex justify-end items-center flex-1' onSubmit={sendChat}>



    <input  value={message} onChange={(e)=> setMessage(e.target.value)} className=' p-4 bg-gray-100  w-full overflow-y-visible outline-none' type="text" placeholder='Type here...'/>
    <FontAwesomeIcon icon={faPaperPlane} size="lg" className="absolute pr-4 text-gray-500" onClick={sendChat}/>




    </form> 
    </div>
    <div>
    {
    emojiPicker && 
    <div className=''><Picker  onEmojiClick={addEmoji}  /></div>
    }


    </div>

    </div>


    
    </div>
        }
       
</div>


  )
}
