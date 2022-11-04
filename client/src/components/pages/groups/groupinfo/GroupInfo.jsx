import React from 'react'
import Avatar from 'react-avatar'
import { useState } from 'react'
import { getMembers } from '../../../../features/groups/groupSlice'
import {useSelector, useDispatch} from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleLeft, faEllipsisVertical, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { BigHead } from '@bigheads/core'

import { setAdmin, removeAdmin, removeMember, leaveGroup, resetGroup, getGroups } from '../../../../features/groups/groupSlice'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import AddMember from '../addMember/AddMember'

export default function GroupInfo({setShowGroupInfo, selectedGroup}) {
    const {group} = useSelector(state=> state.groups)
    const {user} = useSelector(state=>state.auth)
    const {isLoading, isError,members} = useSelector(state=>state.groups)
    const [selectedMember, setSelectedMember]= useState()
    const [showGroupOptions, setShowGroupOptions] = useState(false)
    const [showAddScreen, setShowAddScreen] = useState(false)
    let dispatch = useDispatch()

    

    useEffect(()=> {
        if (selectedGroup){
            let payload ={userId: user._id, groupId: selectedGroup._id}
            dispatch(getMembers(payload))
        }
    },[selectedGroup])

    const handleMembers = (member)=> {
        setSelectedMember(member)
     
        setShowGroupOptions(true)
    }

    const addAdmin = ()=> {

        dispatch(setAdmin({userId: user._id, 
            groupId: selectedGroup._id,
              admins:[selectedMember._id]}))
            

            }

    const dismissAdmin = ()=> {
        dispatch(removeAdmin({userId: user._id, 
            groupId: selectedGroup._id,
              admins:[selectedMember._id]}))


            

            }

           
            const removeHandler = ()=> {
                dispatch(removeMember({userId: user._id, 
                    groupId: selectedGroup._id,
                      members:[selectedMember._id]}))
                    
        
                    }

                    const leaveHandler =()=> {
                        
                        dispatch(leaveGroup({userId: user._id, groupId: selectedGroup._id}))
                        setShowGroupInfo(false)
                        dispatch(resetGroup())
                        dispatch(getGroups())
                    }

    return (
        <motion.div 
    initial={{x:-200}}
    animate={{x:0}}
    exit={{x:-600}}

    className="bg-white absolute z-40 h-full top-0 left-0  w-full lg:w-80 flex flex-col ">
        {selectedGroup &&
        
        <div className=' ' >
            {showAddScreen &&   <section title='add-members' className='absolute w-full z-10 h-full'>
                <AddMember setShowAddScreen={setShowAddScreen} selectedGroup={selectedGroup}/>
                </section>}

         {showGroupOptions && 
         
         <motion.div 
            initial={{opacity: 0}}
            animate={{opacity:1}}
            exit={{opacity: 0}}
            className='h-full flex items-center justify-center w-full bg-gray-700/70 absolute top-0 left-0 z-10'>
                 
                   <motion.div 
                   initial={{scale: 0}}
                   animate={{scale:1}}
                   exit={{scale: 0}}
                   className=' bg-white h-48 w-48 rounded-lg'>
                     <div className='w-full flex justify-end p-3 cursor-pointer'><FontAwesomeIcon onClick={()=>setShowGroupOptions(false)} icon={faTimesCircle}/></div>
                   <div className='flex flex-col items-center  h-full gap-3'>
                    {group && group.admins.includes(selectedMember._id) ? 
                    <button onClick={dismissAdmin} 
                    className='bg-green-500 w-fit p-3 rounded-lg text-white'>{isLoading?  <svg className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg> :"Dismiss Admin"
                    }
                    </button>
                    :
                    
                    <button onClick={addAdmin} 
                    className='bg-green-500 w-fit p-3 rounded-lg text-white'>{isLoading?  <svg className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg> :"Make Admin"
                }</button>
                    }
                   

                    <button onClick={removeHandler} className='bg-red-500 w-fit p-3 rounded-lg text-white'>
                    {isLoading?  <svg class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg> :`Remove ${selectedMember.nickname}`
                        }
                       
                        
                        </button>

                    </div> 
                    
                    </motion.div> 
            </motion.div>
        }
            <FontAwesomeIcon onClick={()=> setShowGroupInfo(false)} className='text-gray-600 cursor-pointer p-2' size='xl' icon={faArrowCircleLeft}/>
                <div className='w-full flex flex-col items-center pt-2 px-6'>
                <div className=''>

                <div className='flex justify-center'><Avatar  name={selectedGroup.name} round={true}/></div>
                <h2 className='text-2xl'>{selectedGroup.name}</h2>
                </div>
                <div className='flex  items-center gap-1 text-gray-400'>
                <p className='text-sm '>{group && group.members.length}</p>
                <h1 className='text-sm'>Members</h1>
                <p onClick={()=> setShowAddScreen(true)} className='font-bold text-xs cursor-pointer'>Add More</p>
                </div>

                </div>
                <section title='members' className='h-full w-full overflow-y-auto '>
                {group && group.members.map((member, index)=> {
                    return<div onClick={()=> handleMembers(member)}  className="relative cursor-pointer w-full flex items-center p-3  gap-2 " key={index}>
                    <div className='flex flex-1'>
                       
                        <BigHead className='w-[2rem]' {...member.avatarImage}/>
                  
                    <div>
                        <h1 className='font-medium text-sm  '>{user._id === member._id ? "You" : member.nickname}</h1>
                        <p className='text-xs'>{member.about}</p> 
                    </div>
      
                    </div>
                     {group && group.admins.includes(member._id) && <div className='font-light text-xs'> Admin</div>}
                    
                   
              </div>
                })}
                 
                </section>
                <div  onClick={leaveHandler} className='flex justify-center'><div className='p-3 bg-red-500 text-white rounded-lg'>Leave Group</div></div>
            </div>
            
            }
        
        </motion.div>
  )
}
