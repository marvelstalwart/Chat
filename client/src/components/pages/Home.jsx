import {React, useState} from 'react'
import { useEffect, useRef } from 'react';
import { useSelector,useDispatch } from 'react-redux'
import { getUsers } from '../../features/users/usersSlice';
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
import { getChats, searchMessage } from '../../features/messages/messageSlice';
import { incomingCall } from '../../features/socket/socketSlice';
import CallNotification from './videoCall/CallNotification';
import UserVideo from './videoCall/UserVideo';
import MyVideo2 from './videoCall/MyVideo2';

export default function Home() {

  const socket = useRef()
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {faceMask, lipColor} = useSelector(state=> state.avatar)
  const {user} = useSelector(state=> state.auth)
  const{selectedGroup} =useSelector(state=> state.groups)
  const { users, selectedUser, isError, isLoading, isSuccess, message} = useSelector(state=> state.users)
  const [showProfile, setShowProfile] = useState(false)
  const {messages, chats} = useSelector((state)=> state.messages)
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
   
      if (isError) {
        swal({type:"error", text:message})

      }
      
      return ()=> {
        dispatch(reset())
      }
 
  },[isError, dispatch, user])
  
  console.log(lipColor)
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

console.log(user)

  useEffect(()=> {

    if (mobile) {
      console.log(mobile)
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


  return (

    <>
         
             <div className='bg-gray-100 text-gray-800 flex w-full h-full gap-1'>
              {mobile && callAccepted && !callEnded ?<UserVideo userVideo={userVideo} leaveCall={leaveCall}/> :null }

              {callVideo && <MyVideo2 myVideo={myVideo} callAccepted={callAccepted} callEnded={callEnded}/> }


              {mobile && receivingCall && !callAccepted &&  <CallNotification socket={socket} userVideo={userVideo} connectionRef={connectionRef} stream={stream}/> }
              
              

              <div className={`${mobile && selectedUser || mobile && selectedGroup ? 'hidden' : mobile ? 'w-full flex flex-col': 'flex flex-col w-80 gap-1' }   `}>
              <section title='logo' className='flex  justify-between items-center'>
              <h1 className='font-lily font-bold text-xl p-2'>Yarn</h1>
              <div className=' max-w-[3rem] p-2 cursor-pointer' onClick={()=> setShowProfile(true)}>
              
              <BigHead className='w-[2rem]' {...user.avatarImage}/>
              </div>
              {showProfile && <MyProfile user={user} setShowProfile={setShowProfile}/>}
              
             </section>
             <section title='search-bar' className='px-2 relative flex items-center'>
             < FontAwesomeIcon onClick={()=>handleLogout()} icon={faMagnifyingGlass} className="absolute px-2 pl-3 pointer-events-none" color="GRAY" />
               <input onChange={(e)=>setSearchValue(e.target.value)} className='bg-white w-full p-3 px-8 rounded-3xl outline-0' type="text" placeholder='SEARCH'/>
        
             </section>
             <div className='p-2 font-bold flex justify-around'>
              <div onClick={displayChats} className='cursor-pointer'>Messages</div> 
             <div onClick = {displayGroups} className='cursor-pointer'>Groups</div> 
             <div  onClick={displayUsers} className='cursor-pointer'>Users</div>
              </div>
             
             
             
           
        
             <hr ></hr>
             <section   className='p-2 flex-1  overflow-y-auto'>
              <div className='bg-white h-full rounded-lg '>

              {showMessages && <Chats changeChat={changeChat} searchValue={searchValue}/>}
              {showUsers && <Users setShowUsers={setShowUsers} searchValue={searchValue}/>}
              {showGroups && <Groups searchValue={searchValue}/>}      
               
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
                      
                   
                      <div><p>Hi {user.name}!</p><div><FontAwesomeIcon icon={faComments}/><p>Start chatting</p></div></div>
                      </div>
                        
                    </div>
            
            
             </div>
          
       
        
   
    </>
  
  )
}
