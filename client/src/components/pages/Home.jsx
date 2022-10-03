import React from 'react'
import { useEffect, useRef } from 'react';
import { useSelector,useDispatch } from 'react-redux'
import { getUsers } from '../../features/users/usersSlice';
import swal from 'sweetalert2';
import io from "socket.io-client"
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import defaultImg from "../../assets/img/default.png"
import { resetChat, changeChat } from '../../features/users/usersSlice';
import Chat from './Chat';
import { logout } from '../../features/auth/authSlice';
import { getChats } from '../../features/messages/messageSlice';
export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const socket=io.connect('http://localhost:5000')
  const {user} = useSelector(state=> state.auth)
  const { users, selectedUser, isError, isLoading, isSuccess, message} = useSelector(state=> state.users)
 
  const {messages, chats} = useSelector((state)=> state.messages)
  useEffect(()=> {
      if (user) {
       
              socket.emit("add-user", user._id)
        dispatch(getUsers())
       
      }
   
      if (isError) {
        swal({type:"error", text:message})

      }
      
 
  },[isError, dispatch, user])
  
  useEffect(()=> {
    dispatch(getChats())
    
  },[])

  
 //Get specific chat from chats by filtering the id of each chat group from users
 
const handleLogout = ()=>{
  dispatch(logout())
  navigate("/sign-in")
}
  return (
    <>
          {!selectedUser?
             <div className='text-gray-700 flex flex-col w-full h-full gap-1'>
     
             <section title='logo' className='flex justify-between items-center'>
              <h1 className='font-lily font-bold text-3xl p-2'>Yarn</h1>
              <div>{console.log(user)}
                  <img  src={`data: image/svg+xml;base64,${user.avatarImage}`} />
                 <FontAwesomeIcon icon={faRightFromBracket} className="p-2 cursor-pointer"/>

              </div>
                           </section>
             <section title='search-bar' className='px-2  relative flex items-center'>
             < FontAwesomeIcon onClick={()=>handleLogout()} icon={faMagnifyingGlass} className="absolute px-2 pl-3 pointer-events-none" color="gray" />
               <input className='bg-gray-200 w-full p-3 px-8 rounded-3xl' type="text" placeholder='Search'/>
        
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
             {console.log(chats)}
                  
                  {
                    chats && chats.length> 0? 
                    
                    chats.map((chat)=> {
                      
                        return  <div onClick={()=>dispatch(changeChat(chat.to._id === user._id? chat.sender : chat.to))} className='m-3 flex gap-2 items-center' key={chat._id}>
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
          :
       
         <Chat selectedUser={selectedUser} socket={socket}/>
        }
   
    </>
  
  )
}
