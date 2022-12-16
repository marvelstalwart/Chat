import React from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import avatar from "../../assets/img/avatar.png"
import group from "../../assets/img/laptop2.png"
import chat from "../../assets/img/chat2.png"
import linkedIn from "../../assets/img/linkedIn.png"
import github from "../../assets/img/github.png"
import chatting from "../../assets/img/Chatting.jpg"
import twitter from "../../assets/img/twitter.png"
import { faVideo, faUserGroup  } from '@fortawesome/free-solid-svg-icons'
import { motion, AnimatePresence } from 'framer-motion'
export default function LandingPage() {
const [expanded, setExpanded]  =useState(false)
  return (
    <div className=''>
        <section title='nav' className='flex py-4 px-6 items-center justify-between'>
           

            <div className='font-lily font-bold text-2xl p-2'><p> Yarn</p></div>
            <ul className=' hidden lg:block list-none overflow-hidden m-0 p-0'>
                <li className='float-left '><a className='p-8' href=''>Chat</a></li>
                <li className='float-left '><a className='p-8'  href=''>About</a></li>
                <li className='float-left '><a  className='p-8' href=''>Contact</a></li>
            </ul>

            <div onClick={()=>setExpanded(true)} className='lg:hidden'>
            <div className='border-b-2 w-6 h-2 border-black'></div>
            <div className='border-b-2 w-6 h-2 border-black'></div>
            <div className='border-b-2 w-6 h-2 border-black'></div>
            </div>
            {/* Expanded Nav */}
            <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={()=> null}
           >
            { expanded&&

            <motion.div initial={{right:-200}} animate={{right: 0}} className='absolute right-0 top-0 bg-[#F5F6FA]  w-40 h-full'>
            <motion.div  onClick={()=>setExpanded(false)} className='p-2 relative'>
            <motion.div initial={{rotate: 0 }} animate={{rotate: 45, translateY:2}} className='absolute border-b-2 w-6 h-2 border-black'></motion.div>
            <motion.div initial={{opacity: 1}} animate={{opacity:0}} className='border-b-2 w-6 h-2 border-black'></motion.div>
            <motion.div initial={{rotate: 0 }} animate={{rotate: -45, translateY: -2}} className='absolute border-b-2 w-6 h-2 border-black'></motion.div>
            </motion.div>

            <ul className='list-none overflow-hidden m-0 p-0'>
                <li className=' py-3'><a className='p-2' href=''>Chat</a></li>
                <li className='py-3 '><a className='p-2'  href=''>About</a></li>
                <li className=' py-3'><a  className='p-2' href=''>Contact</a></li>
            </ul>
            </motion.div>

            }
            </AnimatePresence>

            <div className='hidden gap-2 lg:flex'>
                <button >Login</button>
                <button className='bg-blue p-4 rounded-lg text-white'>Get Started Free</button>
            </div>

        </section>
        <section className=''>  
            <div className='flex flex-col gap-3   '>
               <div className='relative w-full h-full '>
                <div className='absolute px-4 h-full bg-black bg-opacity-60 w-full flex flex-col justify-center text-white gap-2'>
                    <p className='font-bold text-xl sm:text-xl md:text-4xl xl:text-6xl'> Start Chatting with your Friends, Anywhere, Anytime</p>
                    <p className='text-gray-200 w-[18rem] md:w-[22rem] lg:[w-26rem] xl:w-[48rem] text-xs sm:text-bold md:text-xl lg:text-2xl xl:text-3xl'>Connect with people all over the world and initiate lively interactions</p>
                    <button className='bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-sky-400 to-blue p-4 rounded-lg text-white w-fit'>Start Chatting</button>
                    </div>
                    
                      
                    <img src={chatting} className=" "/>

                    

               
               </div>
                <div className=' w-full p-4 '>
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
                    </div>

             </div>
                    <div className='flex flex-col gap-2 bg-[#F5F6FA] px-6 '>
                        <div className='flex flex-col items-center gap-2'>
                        <div className='w-full'>
                            <div className=' w-full flex justify-center'>
                                
                                
                            <h3 className='text-xl md:text-3xl lg:text-5xl font-semibold'>Customize</h3>
                                </div>
                            <div className='w-full flex flex-col  items-center'>
                                <img src={avatar} className=" "/>
                             
                        <div className='text-gray-600 w-[22rem] md:w-[36rem] text-center text-xl md:text-2xl'>Choose randomly from High quality Big Head Avatars for your online presence or customize your Avatar to the detail</div>
                            </div>
                            </div>
 
                            <div className='w-full'>
                            <div className=' w-full flex justify-center'>
                                
                                
                            <h3 className='text-xl md:text-3xl lg:text-5xl font-semibold'>Group Roles</h3>
                                </div>
                            <div className='w-full flex flex-col  items-center'>
                                <img src={group} className=" "/>
                             
                        <div className='text-gray-600 w-[22rem] md:w-[36rem] text-center text-xl md:text-2xl'>
                            You could be an 
                            </div>
                            </div>
                            </div>

                        </div>



                    </div>

        </section>

                            <div className='w-full'>
                            <div className=' w-full flex justify-center'>
                                
                                
                            <h3 className='text-xl md:text-3xl lg:text-5xl font-semibold'>Instant Messaging</h3>
                                </div>
                            <div className='w-full flex flex-col  items-center'>
                                <img src={chat} className=" "/>
                             
                        <div className='text-gray-600 w-[22rem] md:w-[36rem] text-center text-xl md:text-2xl'>
                            Send and receive messages from other users instantly with web socket.
                            </div>
                            </div> 
                            </div>
                        <div className='flex flex-col gap-3 items-center'>
                        <h2 className='bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))]
                         from-sky-400 to-blue bg-clip-text  text-transparent text
                          font-bold text-5xl p-2 '>Contact</h2>
                          <div className='flex gap-2'><img className='w-[2rem] h-[2rem]' src={github}/><img className='w-[2rem] h-[2rem]' src={linkedIn}/><img className='w-[2rem] h-[2rem]' src={twitter}/> </div>
                          <div>
                          
                          </div>

                        </div>


    </div>
  )
}
