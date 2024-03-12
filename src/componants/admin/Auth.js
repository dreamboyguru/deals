import React from 'react'
import { useNavigate } from 'react-router-dom'


function Auth() {
    const navigate = useNavigate();
    const email = localStorage.getItem('email')
    // console.log(email);
    if(!email) {
        navigate('/login')
    }
  return (
    <div>
      
    </div>
  )
}

export default Auth
