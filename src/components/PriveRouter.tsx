import React from 'react'
import { Navigate } from 'react-router-dom';
import { isAuthenticate } from '../utils/localStorage';

type PriveRouterProps = {
  children: JSX.Element
}

const PriveRouter = (props: PriveRouterProps) => {
  
  if(!localStorage.getItem('user')) {
    return <Navigate to='/signin'/>
  } else {
    const { user } = isAuthenticate(); // lấy từ localstorage ra
    if (user?.role != 1) {
      return <Navigate to='/signin'/>
    }
  }
  return props.children
}

export default PriveRouter