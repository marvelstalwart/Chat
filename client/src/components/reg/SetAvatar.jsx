import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAvatar, getAvatars } from '../../features/auth/authSlice'
export default function SetAvatar() {
    const dispatch = useDispatch();

    const {avatars, isSuccess, isLoading, message} = useSelector(state=> state.auth)
    useEffect(()=> {
       dispatch( getAvatars())
       console.log(avatars)
    }, [isSuccess])
  return (
    <div> {avatars && avatars.map((avatar, index)=> {

        return <img key={index} src={`data: image/svg+xml;base64,${avatar}`} alt="Avatar"/>
    })}</div>

  )
}
