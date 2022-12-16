
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faCheck, faPen, faImage } from '@fortawesome/free-solid-svg-icons'
import { updateUser, logout } from '../../../features/auth/authSlice'
import { BigHead } from '@bigheads/core'
import {motion} from "framer-motion"
import { useDispatch, useSelector } from 'react-redux'
     
export default function MyProfile({setShowProfile, socket}) {
  const {user, isLoading, isSuccess} = useSelector((state)=> state.auth)
  const {onlineUsers} = useSelector(state=> state.users)
  let navigate = useNavigate()
  const dispatch = useDispatch()
  let location = useLocation()
const [userDetails, setUserDetails] = useState({
  username:user.name,
  email:user.email,
  about:user.about

})

  const [disabledUsername, setDisabledUsername] = useState(true)
  
  const [disabledEmail, setDisabledEmail] = useState(true)
  const [disabledAbout, setDisabledAbout] = useState(true)

  const handleLogout = ()=> {
    socket.current?.emit("offline")
    dispatch(logout())

    navigate("/login")

  }

    const updateUsername = () => {
      dispatch(updateUser({_id: user._id, username: userDetails.username}))
      setDisabledUsername(true)
    }
    const updateEmail = () =>  {
      dispatch(updateUser({_id: user._id, email: userDetails.email}))
      setDisabledEmail(true)
    }
    const updateAbout = () =>  {
      dispatch(updateUser({_id: user._id, about: userDetails.about}))
      setDisabledAbout(true)
    }


  const handleChange = (e)=> {
    console.log(userDetails)
    const {name, value} = e.target
    setUserDetails({...userDetails, [name]: value})
  }


  console.log(location.state)
  return (
    <motion.div initial={{x:-200}} animate={{x:0}} className='absolute bg-white z-40 h-full top-0 left-0  w-full lg:w-80'>
      <div className='absolute flex items-center w-full h-20 top-0  left-0 bg-white'>
      <div className='flex items-center gap-2 px-2 font-bold'>
       <FontAwesomeIcon  className="cursor-pointer" onClick={()=> setShowProfile(false)} icon={faArrowLeft}/>
        PROFILE</div>
      </div>
        <div className='h-full'>
          <div className=' h-full pt-16'>
            <div className='flex flex-col items-center'>
            <div className=' w-48'><BigHead {...user.avatarImage}/>
              </div>
            {/* <img className='w-48' src={`data: image/svg+xml;base64, ${user.avatarImage}`}/> */}
            <div onClick={()=>navigate("/setAvatar", {state:{avatarProps:user.avatarImage}})} className=' cursor-pointer flex items-center gap-1'>Customize Avatar<FontAwesomeIcon icon={faImage}/></div>
            </div>
            
            <div className=' flex flex-col gap-4  w-full md:items-center  pt-10 px-8'>
            <div  className=' flex flex-col gap-3 '>

           
            <div className=' flex flex-col gap-3'> 
            <label  htmlFor='name' className='text-sm font-light'>Username</label>
            <div className='relative'>
                <input  onChange={handleChange}  disabled={disabledUsername} value={userDetails.username} type="text" name="username" className={`border-b-2 border-gray-900 outline-0 bg-transparent w-full ${disabledUsername? 'text-gray-600': 'text-gray-900'}`} placeholder='name' />
                
               {disabledUsername  &&  <FontAwesomeIcon onClick={()=> setDisabledUsername(false)} className='absolute' icon={faPen}/>} 
                {!disabledUsername  && !isLoading &&  <FontAwesomeIcon onClick={updateUsername} className='absolute' icon={faCheck}/>}
            </div>
                </div>
            <div className=' flex flex-col gap-3'> 
            <label  htmlFor='email' className='text-sm font-light'>Email</label>
           <div className="relative">
            <input onChange={handleChange} value={userDetails.email} disabled={disabledEmail}  type="text" name="email" className={`border-b-2 border-gray-900 outline-0  w-full  ${disabledEmail? 'text-gray-600': 'text-gray-900'} `} placeholder='email' />
            
               {disabledEmail && <FontAwesomeIcon onClick={()=> setDisabledEmail(false)} className='absolute' icon={faPen}/>} 
                {!disabledEmail  && !isLoading &&  <FontAwesomeIcon onClick={updateEmail} className='absolute' icon={faCheck}/>}
         
           </div>
            </div>

            <div className=' flex flex-col gap-3'> 
            <label  htmlFor='About' className='text-sm font-light'>About</label>
            <div className='relative'>
            <input  onChange={handleChange}  value={userDetails.about}  disabled={disabledAbout} type="text" name="about" className={`border-b-2 border-gray-900 outline-0  w-full ${disabledAbout? 'text-gray-600': 'text-gray-900'}`} placeholder='About you' />
         
               {disabledAbout &&  <FontAwesomeIcon onClick={()=> setDisabledAbout(false)} className='absolute' icon={faPen}/>} 
                {!disabledAbout  && !isLoading &&  <FontAwesomeIcon onClick={updateAbout} className='absolute' icon={faCheck}/>}
         
            </div>
            </div>


            <div className='flex justify-center'><button onClick={()=> handleLogout()} className='bg-red-500 p-3 text-white font-medium rounded-md'>Log out</button></div>
          </div>
          </div>
          </div>
          

        </div>

    </motion.div>
  )
}
