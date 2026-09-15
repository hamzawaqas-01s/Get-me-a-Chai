import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='bg-black text-white'>
      <ul className='flex justify-between'>
        <Link href={"/"}><li>Home</li></Link>
        <Link href={"/about"}><li>About</li></Link>
        <Link href={"/signup"}><li>Sign Up</li></Link>
        <Link href={"/login"}><li>Log In</li></Link>
      </ul>
    </nav>
  )
}

export default Navbar
