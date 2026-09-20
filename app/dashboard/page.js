"use client";
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useState } from 'react';

const Dashboard = () => {
  const [form, setform] = useState({})
  const { data: session } = useSession()


  if (!session) {
    const router = useRouter()
    router.push("/login")
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    
  }

  return (
    <div>
      <div className="min-h-screen w-full bg-[#F4EDE0] flex flex-col items-center justify-center px-4 py-10">
        <p className="text-2xl font-bold text-[#2B2118] tracking-tight">
          Welcome to your dashboard
        </p>
        <div className="bg-[#FBF8F1] w-1/2 border border-[#DDD2BE] rounded-2xl px-8 py-9 mt-5 shadow-[0_1px_2px_rgba(43,33,24,0.04)]">
          <form className="max-w-2xl mx-auto" action={handleSubmit}>

            <div className='my-2'>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
              <input value={form.name ? form.name : ""} onChange={handleChange} type="text" name='name' id="name" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            {/* input for email */}
            <div className="my-2">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input value={form.email ? form.email : ""} onChange={handleChange} type="email" name='email' id="email" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            {/* input forusername */}
            <div className='my-2'>
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
              <input value={form.username ? form.username : ""} onChange={handleChange} type="text" name='username' id="username" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            {/* input for profile picture of input type text */}
            <div className="my-2">
              <label htmlFor="profilepic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Picture</label>
              <input value={form.profilepic ? form.profilepic : ""} onChange={handleChange} type="text" name='profilepic' id="profilepic" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>

            {/* input for cover pic  */}
            <div className="my-2">
              <label htmlFor="coverpic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cover Picture</label>
              <input value={form.coverpic ? form.coverpic : ""} onChange={handleChange} type="text" name='coverpic' id="coverpic" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            {/* input razorpay id */}
            <div className="my-2">
              <label htmlFor="stripeid" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stripe Id</label>
              <input value={form.stripeid ? form.stripeid : ""} onChange={handleChange} type="text" name='stripeid' id="stripeid" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            {/* input razorpay secret */}
            <div className="my-2">
              <label htmlFor="stripesecret" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stripe Secret</label>
              <input value={form.stripesecret ? form.stripesecret : ""} onChange={handleChange} type="text" name='stripesecret' id="stripesecret" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>

            {/* Submit Button  */}
            <div className="my-6">
              <button type="submit" className="block w-full p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-blue-500 focus:ring-4 focus:outline-none   dark:focus:ring-blue-800 font-medium text-sm">Save</button>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}

export default Dashboard
