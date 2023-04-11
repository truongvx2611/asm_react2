import React from 'react'
import { Navigate } from 'react-router-dom';
import { isAuthenticate } from '../utils/localStorage';

type PriveAccountProps = {
  children: JSX.Element
}

const PriveAccount = (props: PriveAccountProps) => {
  
  if(!localStorage.getItem('user')) {
    return <Navigate to='/signin'/>
  }
  return props.children
}

export default PriveAccount