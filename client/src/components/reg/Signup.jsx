import React from 'react'
import chat from "../../../src/assets/img/bubble.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link , Navigate, useNavigate} from 'react-router-dom'
import * as yup from "yup";
import swal from 'sweetalert2';
import "sweetalert2/dist/sweetalert2.css"
import { Formik, Form } from 'formik';
import { faUserTie, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
export default function Signup() {
const [formData, setFormData] = useState({
  nickname: "",
  email: "",
  password: "",
  confirmPassword: ""

})

let navigate = useNavigate();
let schema = yup.object().shape({
  nickname: yup.string().required("A nickname is required").min(3, "Too short"),
  email: yup.string().required("Email is required").email("Invalid email type"),
  password: yup.string().required("Password is required").min(6, "Too weak"),
  confirmPassword: yup.string().required("Password does not match").oneOf([yup.ref('password'), null], "Password does not match")


})





  return (
    <div className='w-full justify-center'>
         <div className='justify-center flex'><img src={chat} className="max-h-56"></img></div>
        <div className='h-full flex'>
            <div className='mt-20 w-[70%]  md:w-[50%] lg:w-[40%] mx-auto  relative '>
               
           <div className=' absolute blur-2xl w-full  justify-center -z-10 flex gap-2'>
            <div className='h-20 bg-blue w-20 animate-bounce'></div>
            <div className='h-20 bg-[#FAFA33] w-20 rounded-full '></div>
                        <div class="w-0 h-0  animate-bounce
                border-t-[50px] border-t-transparent
                border-r-[100px] border-r-blue
                border-b-[50px] border-b-transparent
                "></div>
           </div> 
        <div className='flex flex-col gap-2   bg-white  p-3 px-4 shadow-md rounded-md rounded-t-2xl'>
        
        <Formik
        initialValues={formData}
        validationSchema={schema}
        onSubmit={(values)=> {
          swal({type: 'success', text:"Success", confirmButtonText:"Login", showCancelButton:true})
          .then(function(){
              navigate("/sign-in")
          })
        }}
        
        >
          {({handleChange, handleSubmit, handleBlur, values, errors, touched})=> (

        <Form onSubmit={handleSubmit}>
           <div className='relative flex items-center'>< FontAwesomeIcon icon={faUserTie} className="absolute pointer-events-none" color="gray" />
        
        <input  onChange={handleChange} onBlur={handleBlur} autoComplete="off" className="w-full outline-0  border-b-2 border-gray-300 px-5 py-2" type="text" name="nickname" placeholder="Nickname"/>
        </div> 

        <div className='text-red-500 text-[10px]'>
                {touched && touched.nickname &&errors.nickname}
                </div> 

            <div className=' relative flex items-center'>
            < FontAwesomeIcon icon={faEnvelope} className="absolute pointer-events-none" color="gray" />
            <input onChange={handleChange} onBlur={handleBlur}  autoComplete='off' className="w-full outline-0 border-b-2 px-5 py-2" type="email" name="email" placeholder="Email"/>
            </div>
            <div className='text-red-500 text-[10px]'>
                {touched && touched.email &&errors.email}
                </div> 
            
            <div className=' relative flex items-center'>
            < FontAwesomeIcon icon={faLock} className="absolute pointer-events-none" color="gray" />
            <input onChange={handleChange}  onBlur={handleBlur}  autoComplete="off" className="w-full  outline-0 border-b-2 px-5 py-2" type="password" name="password" placeholder="Password"/>
            </div>
            <div className='text-red-500 text-[10px]'>
                {touched && touched.password &&errors.password}
                </div> 

            <div className=' relative flex items-center'>
            < FontAwesomeIcon icon={faLock} className="absolute pointer-events-none" color="gray" />
            <input onChange={handleChange} onBlur={handleBlur}  autoComplete="off"  className="w-full outline-0 border-b-2 px-5 py-2" type="password" name="confirmPassword" placeholder="Confirm Password"/>
            </div>
            <div className='text-red-500 text-[10px]'>
                {touched && touched.confirmPassword &&errors.confirmPassword}
                </div> 
           
            
                <div className="w-full flex justify-center"><button className='w-fit p-1 rounded-md px-2 font-medium cursor-pointer bg-blue text-white ' type='submit' name='submit' value="submit">Sign Up</button></div>
              <div className='flex text-sm justify-center gap-2'> <div>Already have an account?</div> <Link to="/sign-in"><div className='font-bold text-blue '>Log in</div></Link></div>  


            
            
            

        </Form>        

          )}


        </Formik>
       
            </div>
            </div>
           
        </div>
       

    </div>
  )
}
