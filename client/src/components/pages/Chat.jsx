import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Picker from "emoji-picker-react"
import { faArrowLeft, faPaperPlane, faFaceSmile, faPhone, faVideo } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import Peer from 'simple-peer'
import { newMessage } from '../../features/messages/messageSlice'
import { useDispatch } from 'react-redux'
import { getChat } from '../../features/messages/messageSlice'
import { Navigate, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import ReceivingCall from './videoCall/ReceivingCall'
import { resetChat } from '../../features/users/usersSlice'
import { reset, setId, addMessage } from '../../features/messages/messageSlice'
import CallScreen from './videoCall/CallScreen'
import {setCalling, endCall, incomingCall,  setStream, acceptCall} from '../../features/socket/socketSlice'
import { callUser } from './videoCall/socket'
export default function Chat({userVideo, connectionRef, selectedUser, socket, myVideo}) {

    let navigate = useNavigate()
    let dispatch = useDispatch();
    
    const lastMessageRef = useRef(null)
  
  
    const [emojiPicker, setEmojiPicker] = useState(false)
   
    const {user} = useSelector((state)=> state.auth)
    let {messages, chat, chats} = useSelector((state)=> state.messages)
   
    const [message, setMessage] = useState("")
    const {calling, callAccepted, receivingCall, callVideo, callScreen, callEnded, caller, callerSignal, stream} = useSelector((state)=> state.socket)
    //Call states
    
    const handleEmoji = ()=> {
        setEmojiPicker(!emojiPicker)
    } 

    useEffect(()=> {
       
          
        //position to buttom of the page  
        lastMessageRef.current?.scrollIntoView()
      
        //Emit the message received socket
        if (socket.current){
            socket.current?.on("msg-received", (message)=> {
           console.log("new Message")
                chat = [...chat]
                chat.push({fromSelf:false, message})
              
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
        
        socket.current.emit("end-call", {
            userToCall: selectedUser._id
        })
        dispatch(endCall())
     
        connectionRef.current.destroy()
     
    }


    const handleTyping =() => {
        socket.current.emit("typing", `${user._id} is typing`)
    }

  return (
    <div className=" h-screen w-full flex flex-col relative">
            {       calling && <div className=' z-50 w-screen h-screen absolute ' > 
                            <video className={`${callAccepted && !callEnded? 'absolute bottom-0 right-0  h-24 border-2 border-blue' : 'top-0 left-0 w-full h-full' }`} ref={myVideo} playsInline autoPlay/>
                           
                            <div className='absolute bottom-0 flex w-full justify-center  h-fit ' >
                                 
                                 <div onClick={leaveCall} className='z-50 bg-red-600 w-fit text-white p-2 rounded-md'>End call</div>
                     
                                </div>
                               </div>

                     }
                        
                     {callAccepted && !callEnded ?  <div className=' z-40 w-screen h-screen  absolute'>
                     
                        <video className='h-full w-full' playsInline autoPlay ref={userVideo}/> 
                        
                      </div>
                      :null
                        
                    }

                        { callVideo && <div className=' z-50  absolute w-screen h-screen'>
                            <video className={`${callAccepted && !callEnded? 'absolute bottom-0 right-0  h-24 border-2 border-blue' : 'top-0 left-0 w-full h-full' }`} playsInline autoPlay ref={myVideo}/>   
                               </div>  }

               
                 {  
                  receivingCall && !callAccepted && <div className=' z-50  absolute w-screen h-screen'>
                 
                  <ReceivingCall socket={socket} userVideo={userVideo} connectionRef={connectionRef} stream={stream}/>
                
                </div>
            }
        
        <div className='header z-10 flex w-full items-center justify-between p-4  h-38 bg-white'>
            <div className='flex items-center gap-2'>
            <div onClick={()=> dispatch(resetChat())}><FontAwesomeIcon icon={faArrowLeft}/></div>
           <div onClick={()=> navigate(`user/${selectedUser.nickname.toLowerCase()}`,{state:{selectedUser}})} className='flex items-center gap-2  w-full cursor-pointer'>
           <img  className='max-w-[3rem]' src={`data: image/svg+xml;base64,${ selectedUser && selectedUser.avatarImage}`}/>
            <div className=''>{selectedUser && selectedUser.nickname}</div>
           
           </div>
            </div>
           

            <div className='flex gap-4 text-gray-700 cursor-pointer'>
            <FontAwesomeIcon onClick={ ()=> makeCall(user, selectedUser, socket, connectionRef, userVideo, myVideo, stream, dispatch) } icon={faPhone}/>
                
                <FontAwesomeIcon icon={faVideo}/>
               {/* {callScreen && <CallScreen socket={socket}  selectedUser={selectedUser} user={user} dispatch={dispatch}
                connectionRef={connectionRef} userVideo={userVideo} myVideo={myVideo}
               />} */}
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
