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
import { getRandomOptions } from '../../utils/bighead'
import swal from 'sweetalert2'
export default function SetAvatar() { 
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const location = useLocation()
    

    const [avatarProps, setAvatarProps] = useState(location && location.state? location.state.avatarProps:getRandomOptions)
    const [selectedAvatar, setSelectedAvatar] = useState(undefined)
    const {avatars, isSuccess, isLoading, message, isError} = useSelector(state=> state.auth)
   
 
    useEffect(()=> {
        if (isSuccess) {
          return navigate("/")
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
        <option   value={"leftTwitch"}>Left Twitch</option>
        <option   value={"content"}>Content</option>
        <option   value={"squint"}>Squint</option>
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
         <button className='p-2 rounded-lg text-white font-medium  w-fit bg-sky-500/100 hover:bg-sky-500/80 cursor-pointer' onClick={setProfilePicture}>SAVE</button>
     
   
      </div>    
       
     
    </div>
    
    
</div>
    </div>
     

  )
}
