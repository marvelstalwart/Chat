import {React, useState} from 'react'
import { useEffect, useRef } from 'react';
import { useSelector,useDispatch } from 'react-redux'
import { getUsers, updateOnlineUsers } from '../../features/users/usersSlice';
import swal from 'sweetalert2';
import MyProfile from './profile/MyProfile';
import Peer from "simple-peer"

import { io } from 'socket.io-client';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faComments} from '@fortawesome/free-solid-svg-icons';
import defaultImg from "../../assets/img/default.png"
import { resetChat, changeChat } from '../../features/users/usersSlice';
import Chat from './Chat';
import GroupChat from './groups/groupchat/GroupChat';
import Users from './users/Users';
import Groups from './groups/Groups';
import Chats from "./chats/Chats"
import {BigHead} from "@bigheads/core"
import { setAvatarProps } from '../../features/avatar/avatarSlice';
import { getRandomOptions } from '../../utils/bighead';
import { acceptCall,endCall, setStream, callAccepted, callEnded } from '../../features/socket/socketSlice';
import { logout, reset } from '../../features/auth/authSlice';
import { getChats, searchMessage, updateChats } from '../../features/messages/messageSlice';
import { incomingCall } from '../../features/socket/socketSlice';
import CallNotification from './videoCall/CallNotification';
import UserVideo from './videoCall/UserVideo';
import MyVideo2 from './videoCall/MyVideo2';

export default function Home() {

  const socket = useRef()
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const avatar = useSelector(state=> state.avatar)
  const {user} = useSelector(state=> state.auth)
  const{selectedGroup} =useSelector(state=> state.groups)
  let { onlineUsers, selectedUser, isError, isLoading, isSuccess, message} = useSelector(state=> state.users)
  const [showProfile, setShowProfile] = useState(false)
  let {groupChats, chats} = useSelector((state)=> state.messages)
  const [searchValue, setSearchValue] = useState()
  //Users, Groups, and Messages Interface conditional rendering
 const [showUsers, setShowUsers] = useState(false)
 const [showGroups, setShowGroups] = useState(false)
 const [showMessages, setShowMessages] = useState(true)

  //Voice Call States
  const {calling, callAccepted, receivingCall, callVideo, callScreen, callEnded, caller, callerSignal, stream} = useSelector((state)=> state.socket)
   
  const myVideo = useRef()
  const userVideo = useRef() 
  const connectionRef = useRef()
  //Mobile View State
  const [mobile, setMobile] = useState(false)
 
  useEffect(()=> {
   
      if (user) {
        socket.current = io("http://localhost:5000")
          socket.current.emit("newUser", user._id)
         
       
       
      }

      else  {
        
      }
   
      if (isError) {
        swal({type:"error", text:message})

      }
      
      return ()=> {
        dispatch(reset())
      }
 
  },[isError, dispatch, user])
  
  
  const handleResize =()=> {
    if (window.innerWidth < 720 ) {
        
      setMobile(true)
    } else {
   
      setMobile(false)
    }
  }
    
  useEffect(()=> {

    if (window.innerWidth < 720 ) {
      
      setMobile(true)
    } else {
   
      setMobile(false)
    }
    window.addEventListener("resize", handleResize)
  },[mobile])

  useEffect(()=>{

    if (socket.current){
      socket.current.on("userOnline", (activeUsers)=> {
           
             dispatch(updateOnlineUsers(activeUsers))
             
           console.log(activeUsers)
        console.log(onlineUsers)
      })
      socket.current.on("userOffline", (activeUsers)=> {
        console.log("disconnecting")
        
       dispatch(updateOnlineUsers(activeUsers))
        console.log(onlineUsers)
      }) 
      
      socket.current.on("msg-received", (data)=> {
      
        
        chats = [...chats]
        
        //Update the home screen with new messages 
        console.log(chats)
        const newChats = chats.map((chat)=> {
          console.log(chat.totalUnread)
          if (chat.sender._id === data.from || chat.to._id === data.from ) {
            
            return {...chat, message: data.message, totalUnread: chat.totalUnread+1}
            
          } 
          return chat  
        })   
       
        dispatch(updateChats(newChats))
       
            
         
        
        }) 
      
     
      }

   return (()=> {
    socket.current?.off("msg-received")
   })
   },[socket, socket.current])

  useEffect(()=> {

    if (mobile) {
     
      socket.current?.on("callUser", (data)=> {
        console.log("Incoming call")
        navigator.mediaDevices.getUserMedia({video:true, audio: true}).then((stream)=>{
  
  
            dispatch(setStream(stream))
             
                myVideo.current.srcObject = stream
                
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
    
  },[])

  
 //Get specific chat from chats by filtering the id of each chat group from users
 
const handleLogout = ()=>{
  dispatch(logout())
  navigate("/sign-in")
}

const displayChats = ()=> {
  setShowMessages(true)
  setShowUsers(false)
  setShowGroups(false)
}

const displayUsers = ()=> {
  setShowUsers(true)
  setShowGroups(false)
  setShowMessages(false)
}
const displayGroups = ()=> {
  setShowGroups(true)
  setShowUsers(false)
  setShowMessages(false)
}

const leaveCall = ()=> {
  console.log(connectionRef.current)

  dispatch(endCall())

  connectionRef.current.destroy()

}
//Online state for currently logged in User
const online = (id)=> {
          
  const userOnline = onlineUsers.find((user)=> user.userId === id)
 
  return userOnline? true : false
}


  return (

    <>
         
             <div className='bg-[#F5F6FA] text-gray-800 flex w-full h-full gap-1'>
              {mobile && callAccepted && !callEnded ?<UserVideo userVideo={userVideo} leaveCall={leaveCall}/> :null }

              {callVideo && <MyVideo2 myVideo={myVideo} callAccepted={callAccepted} callEnded={callEnded}/> }


              {mobile && receivingCall && !callAccepted &&  <CallNotification socket={socket} userVideo={userVideo} connectionRef={connectionRef} stream={stream}/> }
              
              

              <div className={`${mobile && selectedUser || mobile && selectedGroup ? 'hidden' : mobile ? 'w-full flex flex-col': 'flex flex-col w-80 gap-1' }   `}>
              <section className='flex  justify-between items-center'>
              <h1 className='font-lily font-bold text-xl p-2'>Yarn</h1>
              <div className='flex relative justify-end max-w-[3rem] p-2 cursor-pointer' onClick={()=> setShowProfile(true)}>
              
                <BigHead className='w-[2rem]' {...user.avatarImage }/>
                <div className={ `absolute w-3 h-3 rounded-full ${online(user._id)? 'bg-blue' : 'bg-gray-200' } `}></div>
                  
               
              </div>
              {showProfile && <MyProfile user={user} setShowProfile={setShowProfile} socket={socket}/>}
              
             </section>
             <section title='search-bar' className='px-2 relative flex items-center'>
             < FontAwesomeIcon onClick={()=>handleLogout()} icon={faMagnifyingGlass} className="absolute px-2 pl-3 pointer-events-none" color="GRAY" />
               <input onChange={(e)=>setSearchValue(e.target.value)} className='bg-white w-full p-3 px-8 rounded-3xl outline-0' type="text" placeholder='SEARCH'/>
        
             </section>
            
             <div className='p-2 font-bold flex justify-around'>
              <div onClick={displayChats} className={` ${showMessages ? ' text-black cursor-pointer': 'text-sky-800 cursor-pointer'}`}>Messages</div> 
             <div onClick = {displayGroups} className={` ${showGroups ? ' text-black cursor-pointer': 'text-sky-800 cursor-pointer'}`}>Groups</div> 
             <div  onClick={displayUsers} className={` ${showUsers ? ' text-black cursor-pointer': 'text-sky-800 cursor-pointer'}`}>Users</div>
              </div>
             
             
             
           
        
             <hr ></hr>
             <section   className='p-2 flex-1  overflow-y-auto'>
              <div className='bg-white h-full rounded-lg '>

              {showMessages && <Chats changeChat={changeChat} mobile={mobile} setShowUsers={setShowUsers} setShowGroups={setShowGroups} setShowMessages={setShowMessages} searchValue={searchValue} socket={socket}/>}
              {showUsers && <Users setShowUsers={setShowUsers}  searchValue={searchValue} setShowGroups={setShowGroups} setShowMessages={setShowMessages} />}
              {showGroups && <Groups searchValue={searchValue} socket={socket}/>}      
               
              </div>
             
             </section>
            
              
              </div>
              
             <div className={`${!mobile && selectedUser ? 'flex-1' : mobile && selectedUser? 'block w-full' : 'hidden' } `}>
                   
                        <Chat selectedUser={selectedUser} socket={socket}  myVideo={myVideo} userVideo={userVideo} connectionRef={connectionRef} stream={stream} />
       
                  
                    </div>
                    <div className={`${!mobile && selectedGroup ? 'flex-1' : mobile && selectedGroup? 'block w-full' : 'hidden' } `}>
                        <GroupChat />
                    </div>

                    <div className={`${!mobile && !selectedUser && !selectedGroup? 'flex-1': 'hidden'}`}>
                    <div className='text-2xl z-50 w-full h-full flex items-center justify-center gap-2'>
                      
                   
                      <div>
                      <BigHead className='w-[20rem]' {...user.avatarImage }/>
                      <p className='text-center'>Hi {user.name}!</p>
                      
                      <div className='flex justify-center '>
                        <div onClick={displayUsers} className='bg-blue w-fit text-white  p-2 text-sm flex items-center gap-2'>
                         <p>Start chatting</p><FontAwesomeIcon icon={faComments}/>
                        </div>
                         
                        </div>
                        </div>
                      </div>
                        
                    </div>
            
            
             </div>
          
       
        
   
    </>
  
  )
}
