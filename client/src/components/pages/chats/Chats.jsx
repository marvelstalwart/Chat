import { BigHead } from '@bigheads/core'
import React from 'react'
import { useEffect, useState } from 'react'
import {motion} from "framer-motion"
import { useSelector, useDispatch } from 'react-redux'
import { getChats } from '../../../features/messages/messageSlice'
import { resetGroup } from '../../../features/groups/groupSlice'
export default function Chats({ changeChat, searchValue}) {
    let dispatch = useDispatch()
    const {user} = useSelector((state)=> state.auth)

    const {chats, isLoading} = useSelector((state)=> state.messages)
    const {selectedGroup}  = useSelector(state=> state.groups)
     const [searchedMessage, setSearchedMessage] = useState() 
   
    useEffect(()=>{
     
          if (searchValue) {
            setSearchedMessage(chats.filter(chat=> chat.messages.find(message=> {
              return message.toLowerCase().includes(searchValue.toLowerCase())
            })))
           
          }
        
        
        
      
    },[searchValue])

   
    useEffect(()=>{
         

            dispatch(getChats())
            
        
        },[])
        const handleClick =(user)=> {
          dispatch(resetGroup())
          
            dispatch(changeChat(user))
        }

    return (
    <div>     
     
    {
      !isLoading && chats && chats.length> 0? 
      <motion.div initial={{x: -200}} animate={{x: 0}} className='flex w-full '>
        <div className='w-80'>

      
         {searchValue ? searchedMessage && searchedMessage.length> 0 ? searchedMessage.map((chat)=> {

                  return  <div onClick={()=>handleClick(chat.to._id === user._id? chat.sender : chat.to)} className='m-3 flex gap-2 items-center cursor-pointer' key={chat._id}>
                  <div className='w-[3rem]'>
                    {chat.to._id ===user._id? 
                    <BigHead {...chat.sender.avatarImage}/>
                    :
                    <BigHead {...chat.to.avatarImage}/> 
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
        
          return  <div onClick={()=>handleClick(chat.to._id === user._id? chat.sender : chat.to)} className='m-3 flex gap-2 items-center cursor-pointer' key={chat._id}>
          <div className='w-[3rem]'>
            {chat.to._id ===user._id? 
            <BigHead {...chat.sender.avatarImage}/>
            :
            <BigHead {...chat.to.avatarImage}/> 
          }
            
            </div> 
          <div className='w-full'>
           <div>{chat.to._id=== user._id? chat.sender.nickname : chat.to.nickname}</div>
         
          <div className='text-sm font-light'>{chat.message}</div>
          <hr className='w-full'></hr>
          </div>
          
          </div>
        
        
         
       
    })

    }
      </div>
      
    </motion.div>  
        
      :
      isLoading ?
      
        <div class="flex items-center h-full justify-center ">
      <div class="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
      </div>
        
      
      :

      <div className='p-2 font-bold  h-full flex items-center justify-center'>
      <div className=''>You do not have any Chats yet!
      </div>
      </div>
    }</div>
  )
}
