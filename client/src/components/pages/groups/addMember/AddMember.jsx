import React from 'react'
import { useState } from 'react'
import { BigHead } from '@bigheads/core'
import { motion } from 'framer-motion'
import { addMembers, getMembers } from '../../../../features/groups/groupSlice'
import { getUsers } from '../../../../features/users/usersSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
export default function AddMember({setShowAddScreen, selectedGroup}) {
    let dispatch  = useDispatch()
    const {users} = useSelector(state=> state.users)
    const {user} = useSelector(state=> state.auth)
    const {isLoading, isSuccess, group}  = useSelector(state=> state.groups)
    const [members, setMembers] = useState([])
    const [disabled, setDisabled] = useState(true)
    const [currentMembers, setCurrentMembers] = useState([])
   
    console.log(group.members)
    useEffect(()=> {
       
    if (!users){
            dispatch(getUsers(user))
        }
    
            
            setCurrentMembers(group.members.map((member)=> {return member._id}))     
        if (members && members.length){
            setDisabled(false)
        }
        else {
            setDisabled(true)
        }
            
   },[members])
   
   
    const handleSubmit=()=> {
        const payload = { groupId: selectedGroup._id, userId: user._id, members: members}
        dispatch(addMembers(payload))
        if (isSuccess) {
          let payload ={userId: user._id, groupId: selectedGroup._id}
          dispatch(getMembers(payload))
          setShowAddScreen(false)
        }
      }
    

    const handleChange=(e)=> {
        const {value, checked} = e.target;
      if (checked) {
        setMembers([...members, value])
      }
      else{
        setMembers(members.filter(member=> member !== value))
      }
      console.log(members)
    }

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

  return (
    <motion.div 
    variants={dropIn}
    initial="hidden"
    animate="visible"
    exit="exit"
    className='p-3 w-full h-full top-0 shadow-md bg-white'
    >
     <div className=' p-2 rounded-md h-full  relative '>
        <div className=' h-full flex flex-col gap-2'>
          <FontAwesomeIcon onClick={()=> setShowAddScreen(false)} className="absolute top-0 right-0 cursor-pointer" icon={faTimesCircle} size="xl" />
          
          <div className='font-bold text-xs text-center'>Add new participants</div>

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
            <input name="users" type="checkbox" value={user._id} onChange={handleChange} disabled={currentMembers && currentMembers.includes(user._id)}/>
          </div>

        
        </div>
              )
            )
            }
          </div>
          <button onClick={handleSubmit} className={`${disabled && 'text-gray-400'} font-bold`} disabled={disabled} >{isLoading? "loading...": "Add"}</button>
        </div>

      </div> 
      
      </motion.div>
  )
}
