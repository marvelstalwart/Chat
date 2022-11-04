import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAvatarProps } from '../../features/avatar/avatarSlice'
import { setAvatar, getAvatars, reset } from '../../features/auth/authSlice'
import {useNavigate, useLocation} from "react-router-dom"
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRefresh } from '@fortawesome/free-solid-svg-icons'
import { BigHead } from '@bigheads/core'
import { getUser } from '../../features/users/usersSlice'
import { getRandomOptions } from '../../utils/bighead'


export default function SetAvatar() { 
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const location = useLocation()

   //State coming from users slice
     const {userLoading, userSuccess} = useSelector(state=> state.users)
  //State for the Random avatar
     const [avatarProps, setAvatarProps] = useState(location && location.state? location.state.avatarProps:getRandomOptions)
  //States coming from authentication
    const {avatars, isSuccess, isLoading} = useSelector(state=> state.auth)
   
 
    useEffect(()=> {
        if (isSuccess) {
          
          navigate("/")
        
        }
       

        return ()=> {
          dispatch(reset())
        }
       
    }, [isSuccess])


    
      const updateAvatar=(e)=> {
       const {name, value} = e.target
        setAvatarProps({...avatarProps, [name]:value})
      }

    const setProfilePicture =()=> {
      dispatch(setAvatar(avatarProps)) 

 
    }

  return ( 
  <div className='w-screen h-screen flex flex-col gap-2 bg-blue-100 lg:items-center  '>
<div className="lg:w-96 ">


    <div className='font-bold text-2xl text-center'>
      Customize Your Avatar
    </div>
    <div className=''>

     
    
          
      
   <div className="flex flex-col wrap items-center gap-2">
  
   <BigHead {...avatarProps}/>   
   
   <div className='bg-sky-400 flex gap-1 p-3 text-white rounded-lg items-center cursor-pointer' onClick={()=> setAvatarProps(getRandomOptions)}><FontAwesomeIcon icon={faRefresh}/>RANDOM</div>
    </div> 
    <div className='p-2  flex flex-col gap-2  h-72 overflow-y-scroll'>
      <div className='flex items-center gap-2 '>
      <label className='w-24'>Mask</label>
     <select  name="mask" value={avatarProps.mask} onChange={updateAvatar} className='p-3 w-full border-2 rounded-md flex-1' >
        <option value={true} className=''>True</option>
        <option value={false} className=' border-white'>False</option>
      </select>
      </div>
      <div className='flex items-center gap-2 '>
      <label className='w-24'> Face Mask</label>
     <select  name="faceMask" value={avatarProps.faceMask} onChange={updateAvatar} className='p-3 w-full border-2 rounded-md flex-1 ' >
        <option className='' value={true}>True</option>
        <option value={false} className=''>False</option>
      </select>

      </div>
      <div className='flex items-center gap-2  '>
      <label className='w-24'> Face Mask Color</label>
     <select  name="faceMaskColor" value={avatarProps.faceMaskColor} onChange={updateAvatar} className='p-3  w-full border-2 rounded-md flex-1 ' >
        <option value={"white"}>White</option>
        <option value={"blue"} className=''>Blue</option>
        <option value={"black"}>Black</option>
        <option value={"green"} className=''>Green</option>
        <option value={"red"}>Red</option>
        
      </select>
      
      </div>
      <div className='flex items-center gap-2 '>
      <label className='w-24'> Body</label>
     <select  name="body" value={avatarProps.body} onChange={updateAvatar} className='p-3 w-full border-2 rounded-md flex-1 ' >
        <option value={"chest"}>Chest</option>
        <option   value={"breasts"}>Breasts</option>
      </select>

      </div>
      <div className='flex items-center gap-2 '>
      <label className='w-24'> Lip Color</label>
     <select  name="lipColor" value={avatarProps.lipColor} onChange={updateAvatar} className='p-3 w-full border-2 rounded-md flex-1 ' >
        <option  value={"red"}>Red</option>
        <option   value={"purple"}>Purple</option>
        <option   value={"pink"}>Pink</option>
        <option   value={"turqoise"}>Turqoise</option>
        <option   value={"green"}>Green</option>
      </select>

      </div>
      <div className='flex items-center gap-2 '>
      <label className='w-24'> Skin Tone</label>
     <select  name="skinTone" value={avatarProps.skinTone} onChange={updateAvatar} className='p-3 w-full border-2 rounded-md flex-1 ' >
        <option value={"red"}>Red</option>
        <option  value={"yellow"}>Yellow</option>
        <option   value={"dark"}>Dark</option>
        <option   value={"brown"}>Brown</option>
        <option   value={"black"}>Black</option>
        <option   value={"light"}>Light</option>
      </select>

      </div>
      <div className='flex items-center gap-2 '>
      <label className='w-24'> Hair</label>
     <select  name="hair" value={avatarProps.hair} onChange={updateAvatar} className='p-3 w-full border-2 rounded-md flex-1 ' >
        <option value={"none"}>None</option>
        <option  value={"bun"}>Long</option>
        <option   value={"short"}>Short</option>
        <option   value={"pixie"}>Pixie</option>
        <option   value={"balding"}>Balding</option>
        <option   value={"buzz"}>Buzz</option>
        <option   value={"afro"}>Afro</option>
        <option   value={"bob"}>Bob</option>

      </select>

      </div>
      <div className='flex items-center gap-2 '>
      <label className='w-24'> Hair Color</label>
       <select  name="hairColor" value={avatarProps.hairColor} onChange={updateAvatar} className='p-3 w-full border-2 rounded-md flex-1 ' >
        <option value={"blonde"}>Blonde</option>
        <option  value={"orange"}>Orange</option>
        <option   value={"black"}>Black</option>
        <option   value={"white"}>White</option>
        <option   value={"brown"}>Brown</option>
        <option   value={"blue"}>Blue</option>
        <option   value={"pink"}>Pink</option>
   

      </select>

      </div>
      <div className='flex items-center gap-2 '>
      <label className='w-24'> Clothing</label>
       <select  name="clothing" value={avatarProps.clothing} onChange={updateAvatar} className='p-3 w-full border-2 rounded-md flex-1 ' >
        <option value={"shirt"}>Shirt</option>
        <option  value={"naked"}>Naked</option>
        <option   value={"dressShirt"}>Dress Shirt</option>
        <option   value={"vneck"}>V Neck</option>
        <option   value={"tankTop"}>Tank Top</option>
        <option   value={"dress"}>Dress</option>
        
   

      </select>

      </div>
      <div className='flex items-center gap-2 '>
      <label className='w-24'> Clothing Color</label>
       <select  name="clothingColor" value={avatarProps.clothingColor} onChange={updateAvatar} className='p-3 w-full border-2 rounded-md flex-1 ' >
        <option value={"white"}>White</option>
        <option  value={"blue"}>Blue</option>
        <option   value={"black"}>Black</option>
        <option   value={"green"}>Green</option>
        <option   value={"red"}>Red</option>
       
        
   

      </select>

      </div>
      <div className='flex items-center gap-2 '>
      <label className='w-24'> Graphic</label>
       <select  name="graphic" value={avatarProps.graphic} onChange={updateAvatar} className='p-3 w-full border-2 rounded-md flex-1 ' >
        <option value={"none"}>none</option>
        <option  value={"react"}>React</option>
        <option   value={"Vue"}>Vue</option>
        <option   value={"graphQL"}>Graph QL</option>
        <option   value={"gatsby"}>Gatsby</option>
        <option   value={"redwood"}>Redwood</option>
       
        
   

      </select>

      </div>

      <div className='flex items-center gap-2 '>
      <label className='w-24'> Eyes</label>
       <select  name="eyes" value={avatarProps.eyes} onChange={updateAvatar} className='p-3 w-full border-2 rounded-md flex-1 ' >
        <option value={"normal"}>Normal</option>
        <option  value={"happy"}>Happy</option>
        <option  value={"leftTwitch"}>Left Twitch</option>
        <option  value={"content"}>Content</option>
        <option  value={"squint"}>Squint</option>
        <option   value={"simple"}>Simple</option>
        <option   value={"dizzy"}>Dizzy</option>
        <option   value={"wink"}>Wink</option>
        <option   value={"heart"}>Heart</option>
       
        
   

      </select>

      </div>
      <div className='flex items-center gap-2 '>
      <label className='w-24'> Eyebrows</label>
       <select  name="eyebrows" value={avatarProps.eyebrows} onChange={updateAvatar} className='p-3 w-full border-2 rounded-md flex-1 ' >
        <option value={"raised"}>Raised</option>
        <option  value={"leftLowered"}>Left Lowered</option>
        <option   value={"serious"}>Serious</option>
        <option   value={"angry"}>Angry</option>
        <option   value={"concerned"}>Concerned</option>
      </select>

      </div>

      <div className='flex items-center gap-2 '>
      <label className='w-24'> Mouth</label>
       <select  name="mouth" value={avatarProps.mouth} onChange={updateAvatar} className='p-3 w-full border-2 rounded-md flex-1 ' >
        <option value={"grin"}>Grin</option>
        <option  value={"sad"}>Sad</option>
        <option   value={"openSmile"}>Open Smile</option>
        <option   value={"lips"}>Lips</option>
        <option   value={"open"}>Open</option>
        <option   value={"serious"}>Serious</option>
        <option   value={"tongue"}>Tongue</option>

      </select>

      </div>
      <div className='flex items-center gap-2 '>
      <label className='w-24'> Facial Hair</label>
       <select  name="facialHair" value={avatarProps.facialHair} onChange={updateAvatar} className='p-3 w-full border-2 rounded-md flex-1 ' >
        <option value={"none"}>None</option>
        <option  value={"none2"}>None 2</option>
        <option   value={"none3"}>None 3</option>
        <option   value={"stubble"}>Stubble</option>
        <option   value={"mediumBeard"}>Medium Beard</option>
      
      </select>

      </div>
      <div className='flex items-center gap-2 '>
      <label className='w-24'>Accessory</label>
       <select  name="accessory" value={avatarProps.accessory} onChange={updateAvatar} className='p-3 w-full border-2 rounded-md flex-1 ' >
        <option value={"none"}>None</option>
        <option  value={"roundGlasses"}>Round Glasses</option>
        <option   value={"tinyGlasses"}>TIny Glasses</option>
        <option   value={"shades"}>Shades</option>
      </select>

      </div>
      <div className='flex items-center gap-2 '>
      <label className='w-24'>Hat</label>
       <select  name="hat" value={avatarProps.hat} onChange={updateAvatar} className='p-3 w-full border-2 rounded-md flex-1 ' >
        <option value={"none"}>None</option>
        <option  value={"beanie"}>Beanie</option>
        <option   value={"turban"}>Turban</option>
       
      </select>

      </div>
      <div className='flex items-center gap-2 '>
      <label className='w-24'> Hat Color</label>
       <select  name="hatColor" value={avatarProps.hatColor} onChange={updateAvatar} className='p-3 w-full border-2 rounded-md flex-1 ' >
        <option value={"white"}>White</option>
        <option  value={"blue"}>Blue</option>
        <option   value={"black"}>Black</option>
        <option   value={"green"}>Green</option>
        <option   value={"red"}>Red</option>
       
        
   

      </select>

      </div>
      <div className='flex items-center gap-2 '>
      <label className='w-24'>Lashes</label>
       <select  name="lashes" value={avatarProps.lashes} onChange={updateAvatar} className='p-3 w-full border-2 rounded-md flex-1 ' >
        <option value={"true"}>True</option>
        <option value={"false"}>False</option>
   

      </select>

      </div>
    </div>

      <div className=' flex flex-wrap justify-center mt-2 gap-1'>
         <button className='p-2 rounded-lg text-white font-medium  w-fit bg-sky-500/100 hover:bg-sky-500/80 cursor-pointer' onClick={setProfilePicture}>
          {isLoading? 
          <svg className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>  :
                    `SAVE`
                    }
         </button>
     
   
      </div>    
       
     
    </div>
    
    
</div>
    </div>
     

  )
}
