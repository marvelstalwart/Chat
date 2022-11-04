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
import  {useDispatch, useSelector} from "react-redux"
import { register } from '../../features/auth/authSlice';
import { useEffect } from 'react';
import { reset } from '../../features/auth/authSlice';
export default function Signup() {
  
const [formData, setFormData] = useState({
  nickname: "",
  email: "",
  password: "",
  confirmPassword: ""

})
const dispatch = useDispatch()
const {isError, isLoading, isSuccess, message} = useSelector(state=> state.auth)
let navigate = useNavigate();
//Yup validation Logic
let schema = yup.object().shape({
  nickname: yup.string().required("A nickname is required").min(3, "Too short"),
  email: yup.string().required("Email is required").email("Invalid email type"),
  password: yup.string().required("Password is required").min(6, "Too weak"),
  confirmPassword: yup.string().required("").oneOf([yup.ref('password'), null], "Password does not match")


})

//Navigate go set Avatar page after successful registration
    useEffect(()=> {
      if (isError) {
        swal({type: 'warning', text:`${message}`})
         
      }
      if (isSuccess) {
        swal({type: 'success', text:"Success", confirmButtonText:"Proceed", showCancelButton:true})
          .then(function(){
              
              navigate("/setAvatar")
          })
      }
     
     return ()=> {
      dispatch(reset())
     } 


    },[isError, isSuccess])



  return (
    <div className='w-full justify-center'>
         <div className='justify-center flex'>
          <div className='font-lily font-bold text-8xl p-2 text-gray-700'>Yarn</div>
          
         
         </div>
        <div className='h-full flex'>
            <div className='mt-20 w-[70%]  md:w-[50%] lg:w-[40%] mx-auto  relative '>
               
           <div className=' absolute blur-3xl w-full  justify-center -z-10 flex gap-2'>
            <div className='h-20 bg-blue duration-75 w-48 animate-bounce'></div>
            <div className='h-20 bg-[#FAFA33] w-48 rounded-full '></div>
                        <div className="w-0 h-0  animate-bounce
                    border-t-[100px] border-t-transparent
                    border-r-[150px] border-r-blue
                    border-b-[100px] border-b-transparent
                "></div>
           </div> 
        <div className='flex flex-col gap-2   bg-white  p-3 px-4 shadow-md rounded-md rounded-t-2xl'>
        
        <Formik
        initialValues={formData}
        validationSchema={schema}
        onSubmit={(values)=> {
          dispatch(register(values))
          
        }}
        
        >
          {({handleChange, handleSubmit, handleBlur, values, errors, touched})=> (

        <Form onSubmit={handleSubmit}>
           <div className='relative flex items-center'>< FontAwesomeIcon icon={faUserTie} className="absolute pointer-events-none" color="gray" />
        
        <input  onChange={handleChange} onBlur={handleBlur} autoComplete="off" className="w-full outline-0  border-b-2 border-gray-300 px-5 py-2 autofill:bg-transparent" type="text" name="nickname" placeholder="Nickname"/>
        </div> 

        <div className='text-red-500 text-[10px]'>
                {touched && touched.nickname && errors.nickname}
                </div> 

            <div className=' relative flex items-center'>
            < FontAwesomeIcon icon={faEnvelope} className="absolute pointer-events-none" color="gray" />
            <input onChange={handleChange} onBlur={handleBlur}  autoComplete='off' className="w-full outline-0 border-b-2 px-5 py-2 autofill:bg-transparent" type="email" name="email" placeholder="Email"/>
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
           
            
                <div className=" pt-2 w-full flex justify-center"><button className='w-fit p-1 rounded-md px-2 font-medium cursor-pointer bg-blue text-white ' type='submit' name='submit' value="submit">{isLoading?    <svg className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg> : <>Sign Up</>}</button></div>
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
