import React from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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

            <motion.div initial={{right:-200}} animate={{right: 0}} className='absolute  right-0 top-0 bg-[#F5F6FA]  w-40 h-full'>
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
            <div className='flex flex-col gap-3  px-6 '>
                <p className='font-bold text-2xl'> Start Chatting with your Friends, Anywhere, Anytime</p>
                <p className='text-gray-600'>Connect with people all over the world and initiate lively interactions</p>
                <button className='bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-sky-400 to-blue p-4 rounded-lg text-white w-fit'>Start Chatting</button>
                <div className=' w-full p-4 '>
                    <h2 className='font-bold text-2xl pb-6 text-center'>Exciting Features For Beautiful a Experience</h2>

                    <div className='flex flex-col items-center gap-2'>
                        <div className=''>
                            <div className=' flex justify-center'>
                                
                                <FontAwesomeIcon  className="bg-orange-100 w-8 h-8 p-6 rounded-full  text-orange-500"  size='xs' icon={faVideo}/>
                                
                                </div>
                            <h3 className='text-xl font-medium'>Video Messaging</h3>
                            
                            </div>

                        <div className='text-gray-600'>Enjoy seamless real time Video Interactions with your Friend with just a simple click</div>

                    </div>
                    <div className='flex flex-col items-center gap-2'>
                        <div className=''>
                            <div className=' flex justify-center'>
                                
                                <FontAwesomeIcon  className="bg-emerald-100 w-8 h-8 p-6 rounded-full  text-emerald-500"  size='xs' icon={faUserGroup}/>
                                
                                </div>
                            <h3 className='text-xl font-medium'>Group Chat</h3>
                            
                            </div>

                        <div className='text-gray-600'>Create or join an existing Circle and enjoy endless discussions. </div>




                </div>
                    </div>

             </div>
                    <div className='flex flex-col gap-2 bg-[#F5F6FA] px-6 '>
                        <div className='flex flex-col items-center gap-2'>
                        <div>
                            <div className=' flex justify-center'>
                                
                                
                                </div>
                            <h3 className='text-xl font-medium'>Customize</h3>
                            
                            </div>
                        <div className='text-gray-600 text-center'>Choose random from Avatars or customize your Avatar to the detail</div>

                        </div>
                        <div className='flex flex-col items-center'>
                        <h2 className='bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))]
                         from-sky-400 to-blue bg-clip-text  text-transparent text
                          font-lily font-bold text-6xl p-2 '>Yarn</h2>
                          
                          <div>
                          <FontAwesomeIcon icon="fa-brands fa-twitter" />
                          <FontAwesomeIcon icon="fa-brands fa-github" />

                          </div>

                        </div>



                    </div>

        </section>



    </div>
  )
}
