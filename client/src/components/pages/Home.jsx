import React from 'react'
import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux'
import { getUsers } from '../../features/users/usersSlice';
import swal from 'sweetalert2';
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
        <div key={index}>{`The user is ${user.nickname} 
        EMAIL : ${user.email}
        `}</div>

      )


      )
    
   
  )
}
