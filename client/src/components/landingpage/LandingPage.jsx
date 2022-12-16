import React from 'react'
import { useState } from 'react'

import graphics from "../../assets/img/graphics.webp"
import linkedIn from "../../assets/img/linkedIn.png"
import github from "../../assets/img/github.png"
import Header from './Header'
import twitter from "../../assets/img/twitter.png"
import { faVideo, faUserGroup  } from '@fortawesome/free-solid-svg-icons'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
export default function LandingPage() {

  return (
    <div className=' h-full w-full flex flex-col'>
      <Header/>
        <section className=' h-full'>  
            <div className='flex flex-col gap-3  lg:flex-row w-full h-full'>
                    <img src={graphics} className=" lg:w-[50%] "/>
               <motion.div 
               initial={{opacity: 0, y: +10}}
               animate={{opacity:1, y:1}}
               exit={{opacity:0}}
               className=' w-full h-full '>
                <div className=' px-4 h-full w-full flex flex-col justify-center text-gray gap-2'>
                    <p className='font-bold text-xl sm:text-xl md:text-4xl xl:text-6xl'> Start Chatting with your Friends, Anywhere, Anytime</p>
                    <p className='text-gray-700 w-[18rem] md:w-[22rem] lg:[w-26rem] xl:w-[48rem] text-xs sm:text-bold md:text-xl lg:text-2xl xl:text-3xl'>Connect with people all over the world and initiate lively interactions</p>
                   <Link to="/login">
                   <button className='bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-sky-400 to-blue p-4 rounded-lg text-white w-fit'>Start Chatting</button>
                   </Link> 
                    </div>
                    
                      

                    

               
               </motion.div>
               </div>
                </section>
                        <div className='flex flex-col gap-3 items-center'>
                       
                          <div className='flex gap-2'><img className='w-[2rem] h-[2rem]' src={github}/><img className='w-[2rem] h-[2rem]' src={linkedIn}/><img className='w-[2rem] h-[2rem]' src={twitter}/> </div>
                          <div>
                          
                          </div>

                        </div>


    </div>
  )
}
