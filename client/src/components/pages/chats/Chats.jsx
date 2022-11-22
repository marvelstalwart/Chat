import { BigHead } from '@bigheads/core'
import React from 'react'
import { useEffect, useState } from 'react'
import {motion} from "framer-motion"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'

import { getChats } from '../../../features/messages/messageSlice'
import { resetGroup } from '../../../features/groups/groupSlice'

export default function Chats({ changeChat, socket, searchValue, setShowGroups, setShowMessages, setShowUsers, mobile}) {

    let dispatch = useDispatch()
    const {user} = useSelector((state)=> state.auth)
    const {onlineUsers} = useSelector(state=> state.users)
    let {chats, isLoading} = useSelector((state)=> state.messages)
    const {selectedGroup}  = useSelector(state=> state.groups)
     const [searchedMessage, setSearchedMessage] = useState() 
   


    useEffect(()=>{
     console.log(chats)
          if (searchValue) {
            setSearchedMessage(chats.filter(chat=> chat.messages.find(message=> {
              return message.toLowerCase().includes(searchValue.toLowerCase())
            })))
           
           
          }
        
        
        
      
    },[searchValue])

   
    useEffect(()=>{
         
 
            dispatch(getChats())
          // if (chats && chats.length) {
          //   let unreadCount = 0
          //   chats.map((chat)=> {
          //     chat.messages.map((msg)=> {
          //if (msg.isRead === false) {
          //         unreadCount += 1
          //       }
          //     })
          //   })
          //   console.log(unreadCount)
          // }    
        
        },[])

       

        const handleClick =(selectedUser)=> {
          //Hide Group View
          dispatch(resetGroup())
          
          
          
            dispatch(changeChat(selectedUser))
        }

        const displayUsers = ()=> {
          setShowUsers(true)
          setShowGroups(false)
          setShowMessages(false)
        } 

        const online = (id)=> {
          
          const userOnline = onlineUsers.find((user)=> user.userId === id)
         
          return userOnline? true : false
        }

    return (
    <div className='h-full w-full '>     
     
    {
      !isLoading && chats && chats.length> 0? 
      <motion.div initial={{x: -200}} animate={{x: 0}} className='flex w-full  '>
        <div className='w-full '>

      
         {searchValue ? searchedMessage && searchedMessage.length> 0 ? searchedMessage.map((chat)=> {

                  return  <div onClick={()=>handleClick(chat.to._id === user._id? chat.sender : chat.to)} className='m-3 flex gap-2 items-center cursor-pointer' key={chat._id}>
                  <div className='w-[3rem]'>
                    {chat.to._id ===user._id? 
                    <div>
                      <BigHead {...chat.sender.avatarImage}/>
                      
                    </div>
                    :
                    <div>
                      
                      <BigHead {...chat.to.avatarImage}/> 
                      
                    </div>
                  }
                  
                    
                    </div>
                  <div className='w-full'>
                  <div>{chat.to._id=== user._id? chat.sender.nickname : chat.to.nickname}</div>

                  <div className='text-sm font-light'>{chat.messages.find((message)=>message.toLowerCase().includes(searchValue.toLowerCase()))}</div>
                  <hr className='w-full'></hr>
                  </div>

                  </div>

 
                    

         })
         :
         <>
         <div className='w-full flex justify-center pt-2'>
          <div>
            Ugh! Nothing to see...

          </div>
          </div>
         </>
         
         : chats.map((chat)=> {
        
          return  <div onClick={()=>handleClick(chat.to._id === user._id? chat.sender : chat.to)} className='p-3 flex gap-2 items-center w-full cursor-pointer' key={chat._id}>
          <div className='w-[3rem]'>
            {chat.to._id ===user._id? 
           <div className='flex relative justify-end'>
               
              <BigHead {...chat.sender.avatarImage}/>
              <div className={ `absolute w-4 h-4 rounded-full ${online(chat.to._id)? 'bg-green-400' : 'bg-gray-200' } `}></div>
            </div>
            :
            <div className='flex relative justify-end'>
              <BigHead {...chat.to.avatarImage}/> 
             <div className={ `absolute w-4 h-4 rounded-full ${online(chat.to._id)? 'bg-green-400' : 'bg-gray-200' } `}></div>
            </div>
          }
            
            </div> 
          <div className='w-full'>
           <div>{chat.to._id=== user._id? chat.sender.nickname : chat.to.nickname}</div>
         
          <div className={` ${chat.totalUnread > 0  && chat.sender._id !== user._id ? 'font-bold text-sm' : 'font-light text-sm'}`}>{chat.message?.slice(0,35)}</div>
          <hr className='w-full'></hr>
          </div>
          {chat.totalUnread> 0 && chat.sender._id !== user._id &&
            <div className=' flex items-center  bg-blue text-white  rounded-full'>
            <div class= " text-xs text-center w-4 h-4 ">
            {chat.totalUnread}
        </div>
              </div>
          
          }
          </div>
        
        
         
       
    })

    }
      </div>
      
    </motion.div>  
        
      :
      isLoading  ?
      
        <div class="flex items-center h-full justify-center ">
      <div class="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
      </div>
        
      
      :

      <div className='p-2  h-full w-full flex flex-col items-center justify-center'>
      <p className=''>You do not have any Chats yet!
      </p>
      {

        mobile &&
        <div className='flex justify-center '>
        <div onClick={displayUsers} className='bg-blue w-fit text-white cursor-pointer  p-2 text-sm flex items-center gap-2'>
        <p>Start chatting</p><FontAwesomeIcon icon={faComments}/>
        </div>
        
        </div>
      }
      
      </div>
    }</div>
  )
}
