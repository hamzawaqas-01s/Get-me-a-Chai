import React from 'react'

const Username = ({ params }) => {
    return (
        <>
            <div className='cover w-full bg-red-200 relative'>
              <img className='object-cover w-full h-96' src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3IjoxMjAwLCJ3ZSI6MX0%3D/20.gif?token-hash=FI009V_MjzzBLglZfD3Wq4OGJi5o6JuUUYOOs_fjmfI%3D&token-time=1791072000" 
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
            </div>
        </>
    )
}

export default Username
