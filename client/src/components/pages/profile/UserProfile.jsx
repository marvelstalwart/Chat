import React from 'react'
import { getUser } from '../../../features/users/usersSlice'
import { useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft,faEnvelope} from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'
import { BigHead } from '@bigheads/core'
import { useDispatch, useSelector } from 'react-redux'


export default function UserProfile() {
  const {user, isSuccess, isError, isLoading} = useSelector((state)=>state.users)
  let dispatch= useDispatch()
  let navigate = useNavigate()
  let location= useLocation()
  const selectedUser = location.state.selectedUser

  useEffect(()=> {
    console.log(selectedUser._id)
      dispatch(getUser({_id: selectedUser._id}))
     
  },[])


  return (
    <div>
      <div className='absolute flex items-center w-full h-20 top-0 '>
      
    </div>
    <div>
    <div className=' pt-20 flex flex-col items-center gap-2'>
       <BigHead  {...selectedUser.avatarImage}/>
           
        <div className='font-medium text-4xl'>{selectedUser.nickname}</div>  
        <div className='text-xs p-2 flex items-center gap-1'><FontAwesomeIcon icon={faEnvelope}/>{user && user[0].email}</div>
        <div>
        
        <div className='p-2 '>{user && user[0].about}</div>
        </div>
        <div onClick={()=> navigate(-1)} className='flex items-center  gap-2 px-2 bg-sky-500 text-white rounded-xl p-3'>
     <FontAwesomeIcon  icon={faArrowLeft}/>
      <div>Back to Chat</div>
      </div>

    </div>
    <div className='p-3 '>
        <div>
        
        </div>
       
       
       
      </div>
    </div>
    </div>
  )
}
