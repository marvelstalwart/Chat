import React from 'react'
import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux'
import { getUsers } from '../../features/users/usersSlice';
import swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import defaultImg from "../../assets/img/default.png"
import { reset, changeChat } from '../../features/users/usersSlice';
export default function Home() {
  const dispatch = useDispatch();
  let navigate = useNavigate()

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
  const selectedChat = (user)=> {
    dispatch(changeChat(user))
    navigate("/chat")



  }
 
  return (
    <div className='text-gray-700 flex flex-col w-full h-full gap-1'>
     
      <section title='logo'><h1 className='font-lily font-bold text-3xl p-2'>Yarn</h1></section>
      <section title='search-bar' className='px-2  relative flex items-center'>
      < FontAwesomeIcon icon={faMagnifyingGlass} className="absolute px-2 pl-3 pointer-events-none" color="gray" />
        <input className='bg-gray-200 w-full p-3 px-8 rounded-3xl' type="text" placeholder='Search'/>

      </section>
      <div className='p-2 font-bold'>Users</div>
      <hr ></hr>
      
      
    <section title='users' className='flex h-32 w-full overflow-x-hidden '>

   
      {users && users.map ((user, index)=> (
        <div  className="flex flex-col p-3 items-center " key={index} onClick={()=>selectedChat(user)}>
          
          
          <img className='max-w-[4rem]  cursor-pointer hover:border-4 hover:border-sky-500/100 hover:rounded-full active:border-4 active:border-sky-500/100 active:rounded-full'  src={`data: image/svg+xml;base64,${user.avatarImage}`}  alt="Avatar"/>
          <h1 className='font-lgtext-xs'>{user.nickname}</h1>
          
          </div>

      )


      )}
      </section>

      <hr ></hr>
      <div className='p-2 font-bold  h-full flex items-center justify-center'>
       <div className=''>You do not have any Chats yet!
        
       </div>
      </div>
      </div>
  )
}
