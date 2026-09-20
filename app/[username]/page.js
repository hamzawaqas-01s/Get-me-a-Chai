"use client";
import React from 'react'
import { useState } from 'react'

const Username = ({ params }) => {
    const [paymentform, setpaymentform] = useState({})

    const handleChange = () => {
        
    }

     const pay = () => {
        
    }

    return (
        <>
            <div className='cover w-full bg-red-200 relative'>
              <img className='object-fit w-full h-96' src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3IjoxMjAwLCJ3ZSI6MX0%3D/20.gif?token-hash=FI009V_MjzzBLglZfD3Wq4OGJi5o6JuUUYOOs_fjmfI%3D&token-time=1791072000" 
               alt="banner" />
              <div className='absolute -bottom-15 right-[45%] border-white border-2 rounded-full'>
                <img className='rounded-full' width={125} height={120} src="https://media.tenor.com/03bs_HzMok4AAAAe/cat-mog.png" alt="profilePic" />
              </div> 
            </div>
            <div className='info flex flex-col gap-2 justify-center items-center my-16'>
                <div className='font-bold'>
                 @{params.username}
                </div>
                 <div>
                    Creating Animated art for VTT's
                 </div>
                 <div>
                    26,977 members . 114 Posts . $16,510/release
                 </div>
                 <div className="payment flex gap-3 w-[80%] mt-11 flex-col md:flex-row">
                    <div className="supporters w-full md:w-1/2 bg-[#FBF8F1] border border-[#DDD2BE] rounded-lg px-2 md:p-10">
                        {/* Show list of all the supporters as a leaderboard  */}
                        <h2 className='text-2xl font-bold my-5'> Top 10 Supporters</h2>
                        <ul className='mx-5 text-lg'>
                            {/* {payments.length == 0 && <li>No payments yet</li>}
                            {payments.map((p, i) => {
                                return <li key={i} className='my-4 flex gap-2 items-center'>
                                    <img width={33} src="avatar.gif" alt="user avatar" />
                                    <span>
                                        {p.name} donated <span className='font-bold'>Rs.{p.amount}</span> with a message &quot;{p.message}&quot;
                                    </span>
                                </li>
                            })} */}
                            <li>Hamza donated Rs.100 and left a message "Keep learning and keep improving"</li>
                            <li>Hamza donated Rs.100 and left a message "Keep learning and keep improving"</li>
                            <li>Hamza donated Rs.100 and left a message "Keep learning and keep improving"</li>
                            <li>Hamza donated Rs.100 and left a message "Keep learning and keep improving"</li>
                        </ul>
                    </div>

                    <div className="makePayment w-full md:w-1/2 bg-[#FBF8F1] border border-[#DDD2BE] rounded-lg px-2 md:p-10">
                        <h2 className='text-2xl font-bold my-5'>Make a Payment</h2>
                        <div className='flex gap-2 flex-col'>
                            {/* input for name and message   */}
                            <div>

                                <input onChange={handleChange} value={paymentform.name} name='name' type="text" className='w-full p-3 rounded-lg bg-[#FBF8F1] border border-[#DDD2BE]' placeholder='Enter Name' />
                            </div>
                            <input onChange={handleChange} value={paymentform.message} name='message' type="text" className='w-full p-3 rounded-lg bg-[#FBF8F1] border border-[#DDD2BE]' placeholder='Enter Message' />


                            <input onChange={handleChange} value={paymentform.amount} name="amount" type="text" className='w-full p-3 rounded-lg bg-[#FBF8F1] border border-[#DDD2BE]' placeholder='Enter Amount' />


                            <button onClick={() => pay(Number.parseInt(paymentform.amount) * 100)} type="button" className="text-white bg-linear-to-br from-purple-900 to-blue-900 hover:bg-linear-to-bl focus:ring-2 focus:outline-none focus:ring-black dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:bg-slate-600 disabled:from-purple-100" disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4 || paymentform.amount?.length<1}>Pay</button>

                        </div>
                        {/* Or choose from these amounts  */}
                        <div className='flex flex-col md:flex-row gap-2 mt-5'>
                            <button className='bg-[#FBF8F1] border border-[#DDD2BE] p-3 rounded-lg' onClick={() => pay(1000)}>Pay Rs.10</button>
                            <button className='bg-[#FBF8F1] border border-[#DDD2BE] p-3 rounded-lg' onClick={() => pay(2000)}>Pay Rs.20</button>
                            <button className='bg-[#FBF8F1] border border-[#DDD2BE] p-3 rounded-lg' onClick={() => pay(3000)}>Pay Rs.30</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Username
