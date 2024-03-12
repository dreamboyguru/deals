import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate();
  const email = localStorage.getItem('email');
  const handleRemove = () => {
    localStorage.removeItem('email');
    window.location.reload();
  }
  const handleLogin = () => {
    navigate('/login')
  }
  return (
    <header class="fixed w-full bg-gray-800 py-4 shadow-md">
        <div class="container mx-auto flex justify-between items-center px-10">
            
            <Link to='/' class="text-white font-bold text-lg ml-10">LOGO</Link>
            
            <nav class="space-x-4">
                <Link to='/' className="text-white hover:text-gray-300">Home</Link>
                <Link to='/create' className="text-white hover:text-gray-300">Create Employee</Link>
                <Link  className="text-white hover:text-gray-300">
                    {email? <span onClick={()=>handleRemove()}>Logout</span> : 
                    <span onClick={()=>handleLogin()}>Login</span>}
                </Link>
                {/* <Link href="#" className="text-white hover:text-gray-300">Services</Link>
                <Link href="#" className="text-white hover:text-gray-300">Contact</Link> */}
            </nav>
        </div>
    </header>
  )
}

export default Navbar
