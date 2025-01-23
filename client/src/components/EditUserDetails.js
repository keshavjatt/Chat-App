import React, { useEffect, useState } from 'react'
import Avatar from './Avatar'

const EditUserDetails = ({onClose, user}) => {
    const [data, setData] = useState({
        name : user?.user,
        profile_pic : user?.profile_pic,
    })

    useEffect(()=>{
        setData((preve)=>{
            return{
                ...preve,
                ...user
            }
        })
    },[user])

    const handleOnChange = (e)=>{
        const { name, value } = e.target

        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center'>
        <div className='bg-white p-4 py-6 m-1 rounded w-full max-w-sm'>
            <h2 className='font-semibold'>Profile Details</h2>
            <p className='text-sm'>Edit user details</p>

            <form className='grid gap-3 mt-3'>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='name'>Name :</label>
                    <input
                        type='text'
                        name='name'
                        id='name'
                        value={data?.name} 
                        onChange={handleOnChange}
                        className='w-full py-1 px-2 focus:outline-primary border-0.5'
                    />
                </div>

                <div>
                    <label htmlFor='profile_pic'>Photo</label>
                    <div className='my-1 grid grid-cols-[40px,1fr] gap-3'>
                        <Avatar
                            width={40}
                            height={40}
                            imageUrl={data?.profile_pic}
                            name={data?.name} 
                        />
                    </div>
                    <button className='font-semibold'>Change Photo</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default React.memo(EditUserDetails)