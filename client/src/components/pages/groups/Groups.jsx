import React from 'react'
import { useEffect, useState } from 'react'
import { resetChat } from '../../../features/users/usersSlice'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {AnimatePresence, motion} from "framer-motion"
import Avatar from "react-avatar"
import NewGroup from './newgroup/NewGroup'

import {useDispatch, useSelector} from "react-redux"
import { reset, changeGroup } from '../../../features/groups/groupSlice'
import { getGroups } from '../../../features/groups/groupSlice'
export default function Groups({searchValue}) {
    let dispatch = useDispatch()

    const [showGroupModal, setGroupModal] = useState(false)
    const {groups} = useSelector(state=> state.groups)
    useEffect(()=> {

      dispatch(getGroups())
      

    },[])
    
    useEffect(()=> {
    
      console.log(groups)
    },[groups])
    
    const handleClick = ()=> {
      dispatch(resetChat())
      dispatch(changeGroup())
     
  
  
     }
   
    return (
    <motion.div initial={{x:-200}} animate={{x:0}} className= "relative h-full" >
      {groups && groups.map((group, index)=> {
        return group.map((group)=> {
          return <div onClick={()=>dispatch(changeGroup(group))} className='p-3 flex gap-2 items-center cursor-pointer' key={index}>
            <div className='w-[3rem]'>
              <Avatar name={group.name} size='40' round={true}/>
              
              </div>
            <div className='w-full'>
            <div>{group.name}</div>

            <div className='text-sm font-light lg:text-xs'>{group.lastMessage ? group.lastMessage.slice(0, 35) + "..." : "No Messages yet"}</div>
            <hr className='w-full'></hr>
            </div>
            
            </div>
           })
      })}
      <div onClick={()=> setGroupModal(true)} className='absolute bottom-0 right-0 p-2 cursor-pointer'><FontAwesomeIcon className='text-blue' size='2xl' icon={ faCirclePlus}/></div>
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
