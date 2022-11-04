import React from 'react'
import {useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BigHead } from '@bigheads/core'
import { reset } from '../../../../features/groups/groupSlice'
import { createGroup, getGroups } from '../../../../features/groups/groupSlice'
import { getUsers } from '../../../../features/users/usersSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
export default function NewGroup({setGroupModal}) {
  let dispatch = useDispatch()
  const {user} = useSelector((state)=> state.auth)
  const {users} = useSelector((state)=> state.users)
  const {isLoading, isSuccess, isError} = useSelector(state=> state.groups)
  const [groupName, setGroupName]= useState("")
  const [members, setMembers] =useState([]);
  const [disabled, setDisabled] = useState(true)

  
  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };

    useEffect(()=>{
      
      if (!users) {
        dispatch(getUsers(user))
      } 
      if ((members && members.length === 0) ||( groupName && groupName.length < 2)){
        setDisabled(true)
      }
      else {setDisabled(false)}
      console.log(isSuccess)
      // return(()=> {
      //   dispatch(reset())
      // })
    },[groupName, disabled, members])


    const handleChange=(e)=> {
      const {value, checked} = e.target;
      if (checked) {
        setMembers([...members, value])
      }

      else{
        setMembers(members.filter(member=> member !== value))
      }
      
    }
    const handleSubmit = ()=> {
      const payload = {name: groupName, creator: user._id, members: members}
      dispatch(createGroup(payload))
      if (isSuccess) {
        dispatch(getGroups())
        setGroupModal(false)
      }
    }
  return (
    <motion.div 
    variants={dropIn}
    initial="hidden"
    animate="visible"
    exit="exit"
    className='p-3 w-full h-full absolute top-0 shadow-md bg-white'
    >
     <div className=' p-2 rounded-md h-full  relative '>
        <div className=' h-full flex flex-col gap-2'>
          <FontAwesomeIcon onClick={()=> setGroupModal(false)} className="absolute top-0 right-0 cursor-pointer" icon={faTimesCircle} size="xl" />
          <div className='font-bold text-xs text-center'>Create a group</div>
          <input onChange={(e)=> setGroupName(e.target.value)} type="text" placeholder='Group name' className='outline-0 border-2 bg-gray-100 border-gray-200 p-3 rounded-lg w-full' />
          <div className='font-bold text-xs text-center'>Add participants</div>

          <div className='h-full   overflow-y-auto'>
          {users && users.map ((user, index)=> (
           <div  className=" w-full flex items-center p-3  gap-2 " key={index}>
              <div className='flex flex-1'>
                  <BigHead className='w-[2rem]' {...user.avatarImage}/>
            
              <div>
                  <h1 className='font-medium text-sm  '>{user.nickname}</h1>
                  <p className='text-xs'>{user.about}</p>
              </div>

              </div>
          <div>
            <input name="users" type="checkbox" value={user._id} onChange={handleChange}/>
          </div>

        
        </div>
              )
            )
            }
          </div>
          <button onClick={handleSubmit} className={`${disabled && 'text-gray-400'} font-bold`} disabled={disabled} >{isLoading? "loading...": "Create"}</button>
        </div>

      </div> 
      
      </motion.div>
  )
}
