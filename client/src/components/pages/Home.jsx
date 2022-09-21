import React from 'react'
import { useSelector } from 'react-redux'
export default function Home() {
  const {user} = useSelector(state=> state.auth)
  return (
    <div>{`The user is ${user._id} and auth token is ${user.token}
    EMAIL : ${user.email}
    `}</div>
  )
}
