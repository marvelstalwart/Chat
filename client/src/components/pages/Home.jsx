import React from 'react'
import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux'
import { getUsers } from '../../features/users/usersSlice';
import swal from 'sweetalert2';
import defaultImg from "../../assets/img/default.png"
export default function Home() {
  const dispatch = useDispatch();
  const {user} = useSelector(state=> state.auth)
  const {users, isError, isLoading, isSuccess, message} = useSelector(state=> state.users)

  useEffect(()=> {
      if (user) {
        dispatch(getUsers())
      }
   
      if (isError) {
        swal({type:"error", text:message})

      }
      
 
  },[isError, isSuccess, dispatch, user])
  return (
      users && users.map ((user, index)=> (
        <div key={index}>
           <img className='max-w-[4rem] cursor-pointer hover:border-4 hover:border-sky-500/100 hover:rounded-full active:border-4 active:border-sky-500/100 active:rounded-full'  src={user.avatarImage? `data: image/svg+xml;base64,${user.avatarImage}`: defaultImg}  alt="Avatar"/>
          {`USER: ${user.nickname} 
       

        `}</div>

      )


      )
    
   
  )
}
