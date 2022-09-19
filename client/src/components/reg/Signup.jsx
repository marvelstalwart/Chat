import React from 'react'
import chat from "../../../src/assets/img/bubble.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { faUserTie, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
export default function Signup() {
  return (
    <div className='w-full justify-center'>
         <div className='justify-center flex'><img src={chat} className="max-h-56"></img></div>
        <div className='h-full flex'>
            <div className='mt-20 w-[70%]  mx-auto  relative '>
               
           <div className=' absolute blur-2xl  -z-10 flex gap-2'>
            <div className='h-20 bg-blue w-20 animate-bounce'></div>
            <div className='h-20 bg-[#FAFA33] w-20 rounded-full '></div>
                        <div class="w-0 h-0  animate-bounce
                border-t-[50px] border-t-transparent
                border-r-[100px] border-r-blue
                border-b-[50px] border-b-transparent
                "></div>
           </div> 
        <div className='flex flex-col gap-2   bg-white  p-3 px-4 shadow-md rounded-md rounded-t-2xl'>
        <div className='relative flex items-center'>< FontAwesomeIcon icon={faUserTie} className="absolute pointer-events-none" color="gray" />
        
        <input  autoComplete="off" className="w-full outline-0  border-b-2 border-gray-300 px-5 py-2" type="text" name="name" placeholder="Nickname"/>
        </div> 


            <div className=' relative flex items-center'>
            < FontAwesomeIcon icon={faEnvelope} className="absolute pointer-events-none" color="gray" />
            <input autoComplete='off' className="w-full outline-0 border-b-2 px-5 py-2" type="email" name="email" placeholder="Email"/>
            </div>
            
            <div className=' relative flex items-center'>
            < FontAwesomeIcon icon={faLock} className="absolute pointer-events-none" color="gray" />
            <input   autoComplete="off" className="w-full  outline-0 border-b-2 px-5 py-2" type="password" name="password" placeholder="Password"/>
            </div>

            <div className=' relative flex items-center'>
            < FontAwesomeIcon icon={faLock} className="absolute pointer-events-none" color="gray" />
            <input  autoComplete="off"  className="w-full outline-0 border-b-2 px-5 py-2" type="password" name="confirm" placeholder="Confirm Password"/>
            </div>
           
            
                <div className="w-full flex justify-center"><button className='w-fit p-1 rounded-md px-2 font-medium cursor-pointer bg-blue text-white ' type='submit' name='submit' value="submit">Sign Up</button></div>
              <div className='flex text-sm justify-center gap-2'> <div>Already have an account?</div> <Link to="/sign-in"><div className='font-bold text-blue'>Log in</div></Link></div>  


            
            
            
            </div>
            </div>
           
        </div>
       

    </div>
  )
}
