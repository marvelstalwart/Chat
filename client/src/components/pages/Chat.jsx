import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Picker from "emoji-picker-react"
import { faArrowLeft, faPaperPlane, faFaceSmile, faPhone, faVideo} from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { BigHead } from '@bigheads/core'
import Peer from 'simple-peer'
import { newMessage } from '../../features/messages/messageSlice'
import { useDispatch } from 'react-redux'
import { getChat } from '../../features/messages/messageSlice'
import { Navigate, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { resetChat } from '../../features/users/usersSlice'
import { reset, setId, addMessage } from '../../features/messages/messageSlice'
import CallScreen from './videoCall/CallScreen'

import {setCalling, endCall, incomingCall,  setStream, acceptCall} from '../../features/socket/socketSlice'
import { callUser } from './videoCall/socket'
import MyVideo1 from './videoCall/MyVideo1'
import MyVideo2 from './videoCall/MyVideo2'
import UserVideo from './videoCall/UserVideo'
import CallNotification from './videoCall/CallNotification'
export default function Chat({ userVideo, connectionRef, selectedUser, socket, myVideo}) {

    let navigate = useNavigate()
    let dispatch = useDispatch();
    
    const lastMessageRef = useRef(null)
  
  
    const [emojiPicker, setEmojiPicker] = useState(false)
    const [typing, setTyping] = useState(false)
    const {user} = useSelector((state)=> state.auth)
    let {messages, chat, chats} = useSelector((state)=> state.messages)
   
    const [message, setMessage] = useState("")
    const {calling, callAccepted, receivingCall, callVideo, callScreen, callEnded, caller, callerSignal, stream} = useSelector((state)=> state.socket)
    //Call states
    
    const handleEmoji = ()=> {
        setEmojiPicker(!emojiPicker)
    } 


    useEffect(()=> {
        if (selectedUser) {

            if (message && message.length) {
                
            socket.current?.emit("typing", selectedUser._id)
    
        }
        else {
            socket.current?.emit("stop-typing", selectedUser._id)
        }
        }
    },[message])
    useEffect(()=> {
       
          
        //position to buttom of the page  
        lastMessageRef.current?.scrollIntoView()
      
        //Emit the message received socket
        if (socket.current){
            socket.current.on("typing", ()=> {
                setTyping(true)

                
            })
            console.log(chat)
            socket.current.on("stop-typing", ()=> {
                setTyping(false)
                
            })
            socket.current?.on("msg-received", (message)=> {
           
           chat = [...chat];
           chat.push({fromSelf:false, message: message})
           
           dispatch(addMessage(chat)) 
               
            } )
            
        

            socket.current?.on("callUser", (data)=> {
                console.log("Incoming call")
                navigator.mediaDevices.getUserMedia({video:true, audio: true}).then((stream)=>{
         
        
                    dispatch(setStream(stream))
                     
                        myVideo.current.srcObject = stream
                        console.log("initial stream" + stream)
                        console.log(myVideo)
                    })

                    
                const payload = { caller: data.from,
                    name: data.name, callerPhoto: data.avatar,
                    callerSignal: data.signal }
                    
                    
                  dispatch(incomingCall (payload))

                  socket.current?.on("callAccepted", ()=> {
                        
                    dispatch(acceptCall())
                   
                })

                socket.current?.on("endCall", ()=> {
                   console.log("ending call")     
                    dispatch(endCall())
                   
                })
                
                
                
                })

               
               
        }
       
 
    },[chat])
    
    

    useEffect(()=> {
        
       if (selectedUser) {
           
           console.log("1-1 chat mounted")
            dispatch(getChat({from:user._id, to: selectedUser._id}))
    
       }
        },[messages, selectedUser])


    const addEmoji = ( emoji)=> {
       
        let msg = message
        msg+=emoji.emoji
        setMessage(msg)
    }
   
    
    

     

    const sendChat = (e)=> {
        
        e.preventDefault()
        if (message.length> 0){
            
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

    const makeCall = (user, selectedUser, socket, connectionRef, userVideo, myVideo, stream)=> {
        dispatch(setCalling())
        navigator.mediaDevices.getUserMedia({video:true, audio: true}).then((stream)=>{
         
        
            dispatch(setStream(stream))
             
                myVideo.current.srcObject = stream
                console.log(myVideo)
                
                callUser(callAccepted, user, selectedUser, socket, connectionRef, userVideo, myVideo, stream, dispatch);

            })
          
          
    }
    

    const leaveCall = ()=> {
        console.log("ending call")
        socket.current.emit("end-call", {
            userToCall: selectedUser._id
        })
        dispatch(endCall())
     
        connectionRef.current.destroy()
     
    }



    

  return (
                    <div className=" h-screen w-full lg:p-4">
                            <div className='h-full w-full flex flex-col lg:rounded-xl  bg-white relative'>
                        {selectedUser&& <>
                            {calling && <MyVideo1 myVideo={myVideo} callAccepted={callAccepted} callEnded={callEnded} leaveCall={leaveCall} /> }
                    
                    {callAccepted && !callEnded ?<UserVideo userVideo={userVideo} leaveCall={leaveCall}/> :null }

                    {callVideo && <MyVideo2 myVideo={myVideo} callAccepted={callAccepted} callEnded={callEnded}/> }


                    {receivingCall && !callAccepted &&  <CallNotification socket={socket} userVideo={userVideo} connectionRef={connectionRef} stream={stream}/> }

                <div className='header z-10 flex w-full items-center justify-between p-4  h-24 bg-white rounded-xl'>
                <div className='flex items-center gap-2'>
                <div className='lg:hidden' onClick={()=> dispatch(resetChat())}><FontAwesomeIcon icon={faArrowLeft}/></div>
                <div onClick={()=> navigate(`user/${selectedUser.nickname.toLowerCase()}`,{state:{selectedUser}})} className='flex items-center gap-2 font-medium w-full cursor-pointer'>
               
                <BigHead className='w-[2rem]' {...selectedUser.avatarImage}/>
                <div>
                <div className=''>{selectedUser && selectedUser.nickname}</div>
                {typing?<div className='text-xs font-light'>is typing...</div>:null}

                </div>
                </div>
                </div>


                <div className='flex gap-4 text-gray-500 cursor-pointer'>
                <FontAwesomeIcon onClick={ ()=> makeCall(user, selectedUser, socket, connectionRef, userVideo, myVideo, stream, dispatch) } icon={faPhone}/>

                <FontAwesomeIcon icon={faVideo}/>

                </div>

                </div>
                <div className='bg-white flex-1 relative w-full overflow-y-auto'>
                {chat && chat.map((chat, index)=> {
                    
                    
                    return <div key={index} className={`p-1 flex ${chat.fromSelf && `justify-end`} font-light`}>
                    <div className={`${chat.fromSelf ? '  bg-sky-400  text-white rounded-tl-xl' : 'bg-gray-100 rounded-tr-xl'} w-fit h-fit bg-white p-3 rounded-b-xl md:p-6`}>
                        {chat.message}
                    </div>
                    <div ref={lastMessageRef}/>
                </div> })}
                



                </div>
                <div className='bg-white w-full  px-5 pb-2 rounded-xl py-4'>
                <div className=' flex  items-center gap-2 p-2 rounded-full bg-gray-100'>
                <FontAwesomeIcon onClick={handleEmoji} icon={faFaceSmile} size="lg" className="text-gray-500  "/>
                <form className='relative flex justify-end items-center flex-1' onSubmit={sendChat}>



                <input  value={message} onChange={(e)=> setMessage(e.target.value)} className=' p-4 bg-gray-100  w-full overflow-y-auto outline-none' type="text" placeholder='Type here...'/>
                <FontAwesomeIcon onClick={sendChat} icon={faPaperPlane} size="lg" className="absolute pr-4 text-gray-500 cursor-pointer"/>




                </form> 
                </div>
                <div>
                {
                emojiPicker && 
                <div><Picker  onEmojiClick={addEmoji}/></div>
                }


                </div>

                </div>


                        </>
                        
                       
                       
                        }
                   </div>
                </div>
    
     
   
   
  )
}
