import React, {useState} from 'react'
import Header from './Header'
import avatar from "../../assets/img/avatar.webp"
import group from "../../assets/img/Group.webp"
import chat2 from "../../assets/img/chat2.webp"
import {  useAnimation } from 'framer-motion'
import { Link } from 'react-router-dom'
import {useInView} from "react-intersection-observer"
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideo, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'
export default function Features() {
    const control = useAnimation();
    const [ref, inView] = useInView();
    useEffect(()=> {
        if (inView) {
            control.start({
                opacity:1,
                y:1
            })
            
        }
        else{
            control.stop({
                opacity:0,
                y:10
            })
        }
     
    },[control, inView])
  return (

        <div>

      <Header/>
      <section className=''>  
            <div className='flex flex-col gap-3   '>
             
                <motion.div
                ref={ref}
                initial={{opacity: 0, y: +10}}
                animate={{y:1, opacity:1}}
                className=' w-full p-4 '>
                    <h2 className='font-bold text-2xl md:text-4xl  lg:text-5xl pb-6 text-center'>Exciting Features For Beautiful a Experience</h2>
                        <div className='flex flex-col  lg:flex-row lg:justify-center'>

                    <div className='flex flex-col items-center gap-2'>
                        <div className=''>
                            <div className=' flex justify-center '>
                                
                                <FontAwesomeIcon  className="bg-orange-100 w-8 h-8 p-6 rounded-full  text-orange-500"  size='xs' icon={faVideo}/>
                                
                                </div>
                            <h3 className='text-xl md:text-3xl font-semibold'>Video Messaging</h3>
                            
                            </div>
                        <div className='text-gray-600 max-w-4 '>
                            <p className='w-[22rem] md:w-[36rem] text-xl md:text-2xl text-center'>
                            Enjoy seamless real time Video Interactions with Simple Peer's Web Real time communication
                                </p>
                            </div>


                    </div>
                    <div className='flex flex-col items-center gap-2'>
                        <div className=''>
                            <div className=' flex justify-center'>
                                
                                <FontAwesomeIcon  className="bg-emerald-100 w-8 h-8 p-6 rounded-full  text-emerald-500"  size='xs' icon={faUserGroup}/>
                                
                                </div>
                            <h3 className='text-xl md:text-3xl  font-semibold'>Group Chat</h3>
                            
                            </div>

                        <div className='text-gray-600 w-[22rem] md:w-[36rem] text-center text-xl md:text-2xl'>Create or join an existing Circle and enjoy endless discussions. </div>




                </div>
                
                
                        </div>
                    </motion.div>

             </div>
                    <div className='flex flex-col gap-2 bg-[#F5F6FA] px-6 '>
                        <div className='flex flex-col items-center gap-2'>
                        <motion.div 
                        initial={{opacity: 0, y: +10}}
                        animate={control}
                        className='w-full'>
                            <div className=' w-full flex justify-center'>
                                
                                
                            <h3 className='text-xl pt-2 md:text-3xl lg:text-5xl font-semibold'>Customize</h3>
                                </div>
                            <div className='w-full flex flex-col lg:flex-row lg:justify-center  items-center'>
                                <img  src={avatar} className="lg:w-[50%] "/>
                             
                        <div className='text-gray-600 w-[22rem] md:w-[36rem] text-center text-xl md:text-2xl lg:text-4xl'>Choose randomly from High quality Big Head Avatars for your online presence or customize your Avatar to the detail</div>
                            </div>
                            </motion.div>
                            <motion.div
                            ref={ref}
                            initial={{opacity: 0, y: +10}}
                            animate={control}
                            className='w-full'>
                            <div className=' w-full flex justify-center'>
                                
                                
                            <h3 className='text-xl md:text-3xl lg:text-5xl font-semibold'>About</h3>
                                </div>
                            <div className='w-full flex flex-col lg:flex-row lg:justify-center  items-center'>
                                <img src={group} className="lg:w-[50%] "/>
                             

                        <div className='text-gray-600 w-[22rem] md:w-[36rem] text-center text-xl md:text-2xl lg:text-4xl'>
                           Give other users an insight into your personality in a quick and concise write up about yourself
                            </div>

                            </div>
                            
                            </motion.div>

                            <motion.div
                            ref={ref}
                            initial={{opacity: 0, y: +10}}
                            animate={control}
                            className='w-full'>
                            <div className=' w-full flex justify-center'>
                                
                                
                            <h3 className='text-xl md:text-3xl lg:text-5xl font-semibold'>Group Roles</h3>
                                </div>
                            <div className='w-full flex flex-col lg:flex-row lg:justify-center  items-center'>
                                <img src={group} className="lg:w-[50%] "/>
                             
                        <div className='text-gray-600 w-[22rem] md:w-[36rem] text-center text-xl md:text-2xl lg:text-4xl'>
                            From Group creators to admins, to participants, you get your role and power as you participate in group discussions
                            </div>

                            </div>
                            
                            </motion.div>

                            <motion.div
                            ref={ref}
                            initial={{opacity: 0, y: +10}}
                            animate={control}
                            className='w-full'>
                            <div className=' w-full flex justify-center'>
                                
                                
                            <h3 className='text-xl md:text-3xl lg:text-5xl font-semibold'>Instant Messaging</h3>
                                </div>
                            <div className='w-full flex flex-col lg:flex-row lg:justify-center  items-center'>
                                <img src={chat2} className=" lg:w-[50%]"/>
                             
                        <div className='text-gray-600 w-[22rem] md:w-[36rem] text-center text-xl md:text-2xl lg:text-4xl'>
                           Send and receive messages in an instant, keep the discussion lively
                            </div>

                            </div>
                            <div className='w-full py-2 flex justify-center'>
                            <Link to="/register">
                                <button className='bg-blue p-4 rounded-lg text-white'>Get Started Free</button>
                                </Link>

                            </div>
                            </motion.div>

                        </div>



                    </div>

        </section>

  </div>
  )
}
