import React from 'react'
import {motion} from "framer-motion"
export default function Groups({searchValue}) {
  return (
    <motion.div initial={{x:-200}} animate={{x:0}}>Groups</motion.div>
  )
}
