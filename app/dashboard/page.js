"use client";
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useState } from 'react';

const Dashboard = () => {
  const [form, setform] = useState({})
  const [stripeLoading, setStripeLoading] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()

  if (!session) {
    router.push("/login")
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch("/api/user/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    console.log("Profile saved:", data)
  }

  const handleConnectStripe = async () => {
    setStripeLoading(true)
    try {
      const res = await fetch("/api/stripe/connect")
      const data = await res.json()
      console.log("Stripe connect response:", data)
      if (data.url) {
        window.location.href = data.url
      } else {
        console.error("No URL returned:", data)
      }
    } catch (err) {
      console.error("Stripe connect failed:", err)
    } finally {
      setStripeLoading(false)
    }
  }

  return (
    <div>
      <div className="min-h-screen w-full bg-[#F4EDE0] flex flex-col items-center justify-center px-4 py-10">
        <p className="text-2xl font-bold text-[#2B2118] tracking-tight">
          Welcome to your dashboard
        </p>
        <div className="bg-[#FBF8F1] w-1/2 border border-[#DDD2BE] rounded-2xl px-8 py-9 mt-5 shadow-[0_1px_2px_rgba(43,33,24,0.04)]">
          <form className="max-w-2xl mx-auto" onSubmit={handleSubmit}>

            <div className='my-2'>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
              <input value={form.name ? form.name : ""} onChange={handleChange} type="text" name='name' id="name" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>

            <div className="my-2">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input value={form.email ? form.email : ""} onChange={handleChange} type="email" name='email' id="email" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>

            <div className='my-2'>
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
              <input value={form.username ? form.username : ""} onChange={handleChange} type="text" name='username' id="username" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>

            <div className="my-2">
              <label htmlFor="profilepic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Picture</label>
              <input value={form.profilepic ? form.profilepic : ""} onChange={handleChange} type="text" name='profilepic' id="profilepic" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>

            <div className="my-2">
              <label htmlFor="coverpic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cover Picture</label>
              <input value={form.coverpic ? form.coverpic : ""} onChange={handleChange} type="text" name='coverpic' id="coverpic" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>

            <div className="my-6">
              <button type="submit" className="block w-full p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-blue-500 focus:ring-4 focus:outline-none dark:focus:ring-blue-800 font-medium text-sm">Save</button>
            </div>
          </form>

          <div className="mt-4 border-t border-[#DDD2BE] pt-6">
            <button
              type="button"
              onClick={handleConnectStripe}
              disabled={stripeLoading}
              className="block w-full p-2 text-white bg-[#635BFF] rounded-lg hover:bg-[#524ae0] font-medium text-sm disabled:opacity-50"
            >
              {stripeLoading ? "Connecting..." : "Connect Stripe Account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard