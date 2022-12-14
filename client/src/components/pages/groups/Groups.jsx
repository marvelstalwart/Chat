import React from 'react'
import { useEffect, useState } from 'react'
import { resetChat } from '../../../features/users/usersSlice'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {AnimatePresence, motion} from "framer-motion"
import Avatar from "react-avatar"
import NewGroup from './newgroup/NewGroup'

import {useDispatch, useSelector} from "react-redux"
import { reset, changeGroup, updateGroups } from '../../../features/groups/groupSlice'
import { getGroups } from '../../../features/groups/groupSlice'
export default function Groups({searchValue, socket}) {
    let dispatch = useDispatch()

    const [showGroupModal, setGroupModal] = useState(false)
    const {groups,chats} = useSelector(state=> state.groups)
    const [searchedMessage, setSearchedMessage] = useState() 
   
    console.log(groups)

    useEffect(()=> {
       //Listen to group message
       socket.current?.on("message", (data)=> {
        console.log("new group message")
    
        groups = [...groups];
        const newGroupMsg = groups.map((group)=> { 
         
          if (group.groupId === data.groupId  ) {
            
            return {...group, lastMessage: data.message, totalUnread: group.totalUnread+1}
          
          } 
          return group 
        })   
     dispatch(
      updateGroups(newGroupMsg)) 
     
    

 
    })

    },[socket])
    
    useEffect(()=>{
     
      console.log(groups)
          if (searchValue && groups.length) {
            console.log(searchValue)
            
            setSearchedMessage(groups.filter(group=> group.messages?.find(message=> {
              return message.toLowerCase().includes(searchValue.toLowerCase())
            })))
           
           
           
          }
         
        
        
        
      
    },[searchValue])
    
    
    useEffect(()=> {
 
      dispatch(getGroups())
      

    },[])
    

  
    
    const handleClick = (group)=> {
      dispatch(resetChat())
      dispatch(changeGroup(group))
     
  
  
     }
    
    return (
    <motion.div initial={{x:-200}} animate={{x:0}} className= "relative h-full" >
      {
      
      searchValue ? searchedMessage && searchedMessage.length> 0 ? 
      searchedMessage.map((group, index)=> {

        return  <div onClick={()=>handleClick(group)} className='p-3 flex gap-2 items-center cursor-pointer' key={index}>
        <div className='w-[3rem]'>
          <Avatar name={group.name} size='40' round={true}/>
          
          </div>
        <div className='w-full'>
        <div>{group.name}</div>

        <div className='text-sm font-light lg:text-xs'>{group.messages.find((message)=>message.toLowerCase().includes(searchValue.toLowerCase()))}</div>
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

      :
      
      
      groups && groups.length ? groups.map((group, index)=> {
       
          return <div onClick={()=>handleClick(group)} className='p-3 flex gap-2 items-center cursor-pointer' key={index}>
            <div className='w-[3rem]'>
              <Avatar name={group.name} size='40' round={true}/>
              
              </div>
            <div className='w-full'>
            <div>{group.name}</div>

            <div className='text-sm font-light lg:text-xs'>{group.lastMessage ? group.lastMessage.slice(0, 35)  : "No Messages yet"}</div>
            <hr className='w-full'></hr>
            </div>
            {/* {group.totalUnread> 0 &&
            <div className=' flex items-center  bg-blue text-white  rounded-full'>
            <div class= " text-xs text-center w-4 h-4 ">
            {group.totalUnread}
        </div>
              </div>
          
          } */}
            </div>
          
      })
    
    :
    <div className='w-full flex justify-center h-full items-center'><p>No groups yet</p></div>
    }
      <div onClick={()=> setGroupModal(true)} className='absolute bottom-0 right-0 p-2 py-10 cursor-pointer'><FontAwesomeIcon className='text-blue' size='2xl' icon={ faCirclePlus}/></div>
           <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={()=> null}
           >
      {showGroupModal ? <NewGroup setGroupModal={setGroupModal}/> : null}
            </AnimatePresence>  
      </motion.div>
  )
}
