"use client";
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'

const Dashboard = () => {
  const { data:session } = useSession() 

  if (!session) {
    const router = useRouter()
    router.push("/login")
  }

  return (
    <div>
      dashboard
    </div>
  )
}

export default Dashboard
