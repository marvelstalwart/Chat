import React from 'react'
import { useState } from 'react'
import {Link} from "react-router-dom"
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
export default function Header() {
    const [expanded, setExpanded]  =useState(false)
  return (
    <section title='nav' className=' w-full  flex py-4 px-6 items-center justify-between'>
           

    <div className='font-lily font-bold text-2xl p-2'><p> Yarn</p></div>
    <ul className=' hidden lg:block list-none overflow-hidden m-0 p-0'>
        <Link to="/welcome" className='float-left px-8'>Chat</Link>
        <Link to="/features" className='float-left px-8'>Features</Link>
       
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

    <motion.div initial={{right:-200}} animate={{right: 0}} className=' z-10 absolute right-0 top-0 bg-[#F5F6FA]  w-40 h-full'>
    <motion.div  onClick={()=>setExpanded(false)} className='p-2 relative'>
    <FontAwesomeIcon icon={faTimes}/>
    {/* <motion.div initial={{rotate: 0 }} animate={{rotate: 45, translateY:2}} className='absolute border-b-2 w-6 h-2 border-black'></motion.div>
    <motion.div initial={{opacity: 1}} animate={{opacity:0}} className='border-b-2 w-6 h-2 border-black'></motion.div>
    <motion.div initial={{rotate: 0 }} animate={{rotate: -45, translateY: -2}} className='absolute border-b-2 w-6 h-2 border-black'></motion.div> */}
    </motion.div>

    <ul className='flex  flex-col list-none overflow-hidden m-0 p-0'>
        <Link to="/welcome" className='p-2 '>Chat</Link>
        <Link to="/features" className=' p-2'>Features</Link>
      
    </ul>
    </motion.div>

    }
    </AnimatePresence>

    <div className='hidden gap-2 lg:flex lg:items-center'>
        <Link to="/sign-in">
        <button >Login</button>
        </Link>
        <Link to="/sign-up">
        <button className='bg-blue p-4 rounded-lg text-white'>Get Started Free</button>
        </Link>
    </div>

</section>
  )
}
