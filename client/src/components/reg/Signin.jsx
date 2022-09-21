import React from 'react'
import chat from "../../../src/assets/img/bubble.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link , Navigate, useNavigate} from 'react-router-dom'
import * as yup from "yup";
import { Formik, Form } from 'formik';
import { faUserTie, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { login, reset } from '../../features/auth/authSlice';
import swal from 'sweetalert2';
export default function Signup() {

  const {isError, isSuccess, message, isLoading} = useSelector(state=> state.auth)
  let navigate = useNavigate()
  let dispatch = useDispatch()
  let schema = yup.object().shape({
   
    email: yup.string().required("Email is required").email("Invalid email type"),
    password: yup.string().required("Password is required").min(6, "Too weak"),
   
  
  })

  useEffect(()=> {
    if (isError) {
      swal({text:message, type:'error'})
    }
    if (isSuccess) {

      navigate("/")

    }
    
    return()=> {
      dispatch(reset())
    }
  },[isSuccess, isError])

  return (
    <div className='w-full justify-center'>
         <div className='justify-center flex'><img src={chat} className="max-h-56"></img></div>
        <div className='h-full flex'>
            <div className='mt-20 w-[70%] md:w-[50%] lg:w-[40%] mx-auto  relative '>
               
           <div className=' absolute blur-2xl  w-full justify-center -z-10 flex  gap-2'>
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
              initialValues={{
                email: "",
                password: ""
              }}
              validationSchema={schema}
              onSubmit={(values)=> {
                    dispatch(login(values))

              }}
              
              >

                {({handleChange, handleSubmit, handleBlur, touched, errors})=> (
                    <Form onSubmit={handleSubmit}>
                         <div className=' relative flex items-center'>
                < FontAwesomeIcon icon={faEnvelope} className="absolute pointer-events-none" color="gray" />
                  <input onChange={handleChange} onBlur={handleBlur} autoComplete='off' className="w-full outline-0 border-b-2 px-5 py-2" type="email" name="email" placeholder="Email"/>
                  </div>
                  <div className='text-red-500 text-[10px]'>
                {touched && touched.email &&errors.email}
                </div> 
            
            <div className=' relative flex items-center'>
            < FontAwesomeIcon icon={faLock} className="absolute pointer-events-none" color="gray" />
            <input   onChange={handleChange} onBlur={handleBlur} autoComplete="off" className="w-full  outline-0 border-b-2 px-5 py-2" type="password" name="password" placeholder="Password"/>
            </div>
            <div className='text-red-500 text-[10px]'>
                {touched && touched.password &&errors.password}
                </div> 

           
                <div className="w-full flex justify-center"><button  className='w-fit p-1 rounded-md px-2 font-medium cursor-pointer bg-blue text-white ' type='submit' name='submit' value="submit">{isLoading?    <svg class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>  : <>Log in</>}</button></div>
              <div className='flex text-sm justify-center gap-2'> <div>Create an account</div> <Link to="/sign-up"><div className='font-bold text-blue'>Here</div></Link></div>  


            
            
            

                    </Form>

                )}
                  


              </Formik>

           
            </div>
            </div>
           
        </div>
       

    </div>
  )
}
