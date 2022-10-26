
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faCheck, faPen, faImage } from '@fortawesome/free-solid-svg-icons'
import { updateUser, logout } from '../../../features/auth/authSlice'
import { BigHead } from '@bigheads/core'
import {motion} from "framer-motion"
import { useDispatch, useSelector } from 'react-redux'
     
export default function MyProfile({setShowProfile}) {
  const {user, isLoading, isSuccess} = useSelector((state)=> state.auth)
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
    dispatch(logout())
    navigate("/sign-in")

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
       <FontAwesomeIcon onClick={()=> setShowProfile(false)} icon={faArrowLeft}/>
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
            <div  className=' flex flex-col gap-3'>

           
            <div className=' flex flex-col gap-3'> 
            <label  htmlFor='name' className='text-sm font-light'>Username</label>
            <div className='relative'>
                <input  onChange={handleChange}  onClick={updateUsername} disabled={disabledUsername} value={userDetails.username} type="text" name="username" className={`border-b-2 border-gray-900 outline-0 bg-transparent w-full ${disabledUsername? 'text-gray-600': 'text-gray-900'}`} placeholder='name' />
                {isLoading && !disabledUsername && <svg class=" absolute inline mr-2 w-5 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>}
               {disabledUsername  &&  <FontAwesomeIcon onClick={()=> setDisabledUsername(false)} className='absolute' icon={faPen}/>} 
                {!disabledUsername  && !isLoading &&  <FontAwesomeIcon onClick={updateUsername} className='absolute' icon={faCheck}/>}
            </div>
                </div>
            <div className=' flex flex-col gap-3'> 
            <label  htmlFor='email' className='text-sm font-light'>Email</label>
           <div className="relative">
            <input onChange={handleChange} value={userDetails.email}   type="text" name="email" className={`border-b-2 border-gray-900 outline-0  w-full  ${disabledEmail? 'text-gray-600': 'text-gray-900'} `} placeholder='email' />
            {isLoading  && !disabledEmail && <svg class=" absolute inline mr-2 w-5 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                         </svg>}
               {disabledEmail && <FontAwesomeIcon onClick={()=> setDisabledEmail(false)} className='absolute' icon={faPen}/>} 
                {!disabledEmail  && !isLoading &&  <FontAwesomeIcon onClick={updateEmail} className='absolute' icon={faCheck}/>}
         
           </div>
            </div>

            <div className=' flex flex-col gap-3'> 
            <label  htmlFor='About' className='text-sm font-light'>About</label>
            <div className='relative'>
            <input  onChange={handleChange}  value={userDetails.about} type="text" name="about" className={`border-b-2 border-gray-900 outline-0  w-full ${disabledAbout? 'text-gray-600': 'text-gray-900'}`} placeholder='About you' />
            {isLoading  && !disabledAbout &&  <svg class=" absolute inline mr-2 w-5 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                         </svg>}
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
