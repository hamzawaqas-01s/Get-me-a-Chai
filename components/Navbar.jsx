import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-black text-white'>
      <ul className='flex justify-between'>
        <li>Home</li>
        <li>About</li>
        <li>Projects</li>
        <li>Sign Up</li>
        <li>Log In</li>
      </ul>
    </nav>
  )
}

export default Navbar
