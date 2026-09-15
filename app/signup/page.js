import React from 'react'

const Signup = () => {
    return (
        <div className='flex flex-col justify-center items-center gap-14'>
            <h1 className="text-center text-4xl mt-10">Start Earning now as a creator</h1>
            <div className='w-1/3 flex flex-col justify-center items-start p-3 rounded-xl bg-gray-400'>
                <p>Enter your name:</p>
                <input id='name' type='text' className='w-full border border-black' />
                <p>Enter your email:</p>
                <input id='name' type='email' className='w-full border border-black' />
                <p>Enter your username:</p>
                <input id='name' type='text' className='w-full border border-black' />
                <p>Enter your password:</p>
                <input id='name' type='password' className='w-full border border-black' />
                <buttton className='bg-black text-center mt-2 rounded-4xl p-2 py-1 text-white'>Sign up</buttton>
            </div>
        </div>
    )
}

export default Signup
