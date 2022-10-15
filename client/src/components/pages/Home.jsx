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
import { faMagnifyingGlass, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import defaultImg from "../../assets/img/default.png"
import { resetChat, changeChat } from '../../features/users/usersSlice';
import Chat from './Chat';
import { acceptCall,endCall, setStream, callAccepted, callEnded } from '../../features/socket/socketSlice';
import { logout, reset } from '../../features/auth/authSlice';
import { getChats } from '../../features/messages/messageSlice';
import { incomingCall } from '../../features/socket/socketSlice';
import CallNotification from './videoCall/CallNotification';
import UserVideo from './videoCall/UserVideo';
import MyVideo2 from './videoCall/MyVideo2';
export default function Home() {

  const socket = useRef()
  const dispatch = useDispatch();
  const navigate = useNavigate()
 
  const {user} = useSelector(state=> state.auth)
  const { users, selectedUser, isError, isLoading, isSuccess, message} = useSelector(state=> state.users)
  const [showProfile, setShowProfile] = useState(false)
  const {messages, chats} = useSelector((state)=> state.messages)
  const [searchValue, setSearchValue] = useState()
  //Voice Call States
  const {calling, callAccepted, receivingCall, callVideo, callScreen, callEnded, caller, callerSignal, stream} = useSelector((state)=> state.socket)
   
  const myVideo = useRef()
  const userVideo = useRef() 
  const connectionRef = useRef()
 

 

  useEffect(()=> {

      if (user) {
        socket.current = io("http://localhost:5000")
          socket.current.emit("newUser", user._id)
             
        dispatch(getUsers(user))
       
      }
   
      if (isError) {
        swal({type:"error", text:message})

      }
      
      return ()=> {
        dispatch(reset())
      }
 
  },[isError, dispatch, user])
  
  useEffect(()=> {

    dispatch(getChats())
    
  },[])

  // useEffect(()=> {
  //   if (window.innerWidth < 720) {
  //     setExpanded(false)
  //     setMobile(true)
  //   } else {
  //     setExpanded(true)
  //     setMobile(false)
  //   }
  // },[])

  useEffect(()=> {
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
  },[])

  
 //Get specific chat from chats by filtering the id of each chat group from users
 
const handleLogout = ()=>{
  dispatch(logout())
  navigate("/sign-in")
}

const leaveCall = ()=> {
  console.log(connectionRef.current)

  dispatch(endCall())

  connectionRef.current.destroy()

}

const handleSearch =(e)=> {
  setSearchValue(e.target.value)
  
}
  return (
    <>
         
             <div className='text-gray-700 flex flex-col w-full h-full gap-1'>
              {callAccepted && !callEnded ?<UserVideo userVideo={userVideo} leaveCall={leaveCall}/> :null }

              {callVideo && <MyVideo2 myVideo={myVideo} callAccepted={callAccepted} callEnded={callEnded}/> }


              {receivingCall && !callAccepted &&  <CallNotification socket={socket} userVideo={userVideo} connectionRef={connectionRef} stream={stream}/> }

             <section title='logo' className='flex  justify-between items-center'>
              <h1 className='font-lily font-bold text-3xl p-2'>Yarn</h1>
              <div className=' max-w-[3rem] p-2 cursor-pointer' onClick={()=> navigate("/my-profile", {state:{user}})}>
              <img className='w-[2rem] ' src={`data: image/svg+xml;base64,${user.avatarImage}`} />
               
              </div>
              
                           </section>
             <section title='search-bar' className='px-2 relative flex items-center'>
             < FontAwesomeIcon onClick={()=>handleLogout()} icon={faMagnifyingGlass} className="absolute px-2 pl-3 pointer-events-none" color="gray" />
               <input onChange={handleSearch} className='bg-gray-200 w-full p-3 px-8 rounded-3xl outline-0' type="text" placeholder='Search'/>
        
             </section>
             <div className='p-2 font-bold'>Users</div>
             <hr ></hr>
             
             
           <section title='users' className='flex h-15 w-full overflow-x-hidden '>
        
          
             {users && users.map ((user, index)=> (
               <div  className="flex flex-col p-3 items-center " key={index} onClick={()=>dispatch(changeChat(user))}>
                 
                 
                 <img className=' max-h-[2rem]  cursor-pointer hover:border-4 hover:border-sky-500/100 hover:rounded-full active:border-4 active:border-sky-500/100 active:rounded-full'  src={`data: image/svg+xml;base64,${user.avatarImage}`}  alt="Avatar"/>
                 <h1 className='font-lgtext-xs'>{user.nickname}</h1>
                 
                 </div>
        
             )
        
        
             )}
             </section>
        
             <hr ></hr>
             <section title='chats' >
             
                  {
                    chats && chats.length> 0? 
                    
                    chats.map((chat)=> {
                      
                        return  <div onClick={()=>dispatch(changeChat(chat.to._id === user._id? chat.sender : chat.to))} className='m-3 flex gap-2 items-center cursor-pointer' key={chat._id}>
                        <div className='w-[3rem]'><img  className='max-w-[3rem]' src={`data: image/svg+xml;base64, ${chat.to._id=== user._id? chat.sender.avatarImage : chat.to.avatarImage}`} /></div> 
                        <div>
                         <div>{chat.to._id=== user._id? chat.sender.nickname : chat.to.nickname}</div>
                        <div className=''>{chat.message}</div>
 
                        </div>
                        
                        </div>
                      
                      
                       
                     
                  })
                        
                      
                    :
                    <div className='p-2 font-bold  h-full flex items-center justify-center'>
                    <div className=''>You do not have any Chats yet!
                    </div>
                    </div>
                  }
                      
               
             
             </section>
            
              
            
             </div>
          
        { selectedUser &&
           <Chat selectedUser={selectedUser} socket={socket}  myVideo={myVideo} userVideo={userVideo} connectionRef={connectionRef} stream={stream} />
       
        }
        
   
    </>
  
  )
}
