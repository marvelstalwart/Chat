import React from 'react'
import { useEffect, useState } from 'react'
import { changeChat } from '../../../features/users/usersSlice'
import { BigHead } from '@bigheads/core'
import { getUsers } from '../../../features/users/usersSlice'
import { useSelector, useDispatch } from 'react-redux'
import {motion} from "framer-motion"
export default function Users({setShowUsers, searchValue}) {
    const { user} = useSelector((state)=> state.auth)
    const {users} = useSelector ((state)=> state.users)
    let dispatch = useDispatch()
    console.log(users)
    const [filteredUsers, setFilteredUsers] = useState()
    useEffect(()=>{
     
      if (searchValue) {
      let filter = users.filter((user)=> user.nickname.toLowerCase().includes(searchValue.toLowerCase()))
       setFilteredUsers(filter)
      }
    
    
    
  
},[searchValue])

    useEffect(()=> {
        if (user){
            dispatch(getUsers(user))
        }
       
    },[user])
    

     return (  
            <motion.div initial={{x:-200}} animate={{x:0}}>
                    <section title='users' className=' h-15 w-full overflow-x-hidden '>
      {searchValue? filteredUsers && filteredUsers.length> 0 ?  filteredUsers.map((user, index)=> (

          <div  className=" flex items-center p-3  gap-2 " key={index} onClick={()=>dispatch(changeChat(user))}>
              
          <BigHead className='w-[3rem]' {...user.avatarImage}/>
          {/* <img className=' max-h-[2rem]  cursor-pointer hover:border-4 hover:border-sky-500/100 hover:rounded-full active:border-4 active:border-sky-500/100 active:rounded-full'  src={`data: image/svg+xml;base64,${user.avatarImage}`}  alt="user-photo"/> */}
          <div>
          <h1 className='font-lg text-base '>{user.nickname}</h1>
          <p className='text-xs'>{user.about}</p>
          </div>


          </div>

      ))
      :
      <>
      <div className='w-full flex justify-center pt-2'>
      <div>
        Oops! No such User...

      </div>
      </div>
     </>
      
      :
      
      
      
    users && users.map ((user, index)=> (
      <div  className=" flex items-center p-3  gap-2 " key={index} onClick={()=>dispatch(changeChat(user))}>
        
        <BigHead className='w-[3rem]' {...user.avatarImage}/>
        {/* <img className=' max-h-[2rem]  cursor-pointer hover:border-4 hover:border-sky-500/100 hover:rounded-full active:border-4 active:border-sky-500/100 active:rounded-full'  src={`data: image/svg+xml;base64,${user.avatarImage}`}  alt="user-photo"/> */}
        <div>
        <h1 className='font-lg text-base '>{user.nickname}</h1>
        <p className='text-xs'>{user.about}</p>
        </div>
        
        
        </div>

      )


    )
      }
          

</section>
  </motion.div>
    
  )
}
