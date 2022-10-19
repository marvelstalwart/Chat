import { BigHead } from '@bigheads/core'
import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getChats } from '../../../features/messages/messageSlice'
export default function Chats({ changeChat, searchValue}) {
    let dispatch = useDispatch()
    const {user} = useSelector((state)=> state.auth)
    const {chats} = useSelector((state)=> state.messages)
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
  

    return (
    <div>     
     
    {
      chats && chats.length> 0? 
      <div className='flex w-full '>
        <div className='w-80'>

      
         {searchValue ? searchedMessage && searchedMessage.length> 0 ? searchedMessage.map((chat)=> {

                  return  <div onClick={()=>dispatch(changeChat(chat.to._id === user._id? chat.sender : chat.to))} className='m-3 flex gap-2 items-center cursor-pointer' key={chat._id}>
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
        
          return  <div onClick={()=>dispatch(changeChat(chat.to._id === user._id? chat.sender : chat.to))} className='m-3 flex gap-2 items-center cursor-pointer' key={chat._id}>
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
      
    </div>  
        
      :
      
      <div className='p-2 font-bold  h-full flex items-center justify-center'>
      <div className=''>You do not have any Chats yet!
      </div>
      </div>
    }</div>
  )
}
