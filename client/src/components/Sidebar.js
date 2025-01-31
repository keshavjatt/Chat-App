import React, { useState } from 'react';
import { IoChatbubbleEllipses } from "react-icons/io5"
import { FaUserPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { BiLogOut } from "react-icons/bi"
import Avatar from "./Avatar";
import { useSelector } from 'react-redux'
import EditUserDetails from './EditUserDetails';
import Divider from './Divider';

const Sidebar = () => {
  const user = useSelector(state => state.user)
  const [editUserOpen, seteditUserOpen] = useState(false)
  return (
    <div className='w-full h-full grid grid-cols-[48px,1fr] bg-white'>
        <div className='bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-600 flex flex-col justify-between'>
            <div>
                <NavLink className={({isActive})=>`w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded ${isActive && "bg-slate-200"}`} title='Chat'>
                    <IoChatbubbleEllipses 
                        size={20}                
                    />
                </NavLink>

                <div className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded' title='add friend'>
                    <FaUserPlus 
                        size={20}
                    />
                </div>
            </div>

            <div className='flex flex-col items-center'>
                <button className='mx-auto' title={user?.name} onClick={()=>seteditUserOpen(true)}>
                    <Avatar 
                      width={40}
                      height={40}
                      name={user?.name}
                      imageUrl={user?.profile_pic}
                    />
                </button>
                <button className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded' title='logout'>
                    <span className='-ml-2'>
                        <BiLogOut 
                            size={20}
                        />
                    </span>
                </button>
            </div>
        </div>

        <div className='w-full'>
            <div className='h-16 flex items-center'>
                <h2 className='text-xl font-bold p-4 text-slat-800'>Message</h2>
            </div>
            <div className='bg-slate-200 p-[0.5px]'></div>
                
            <div className='bg-red-500 h-[calc(100vh-65px)]'>

            </div>
        </div>

        {/** Edit User Details **/}
        {
            editUserOpen && (
                <EditUserDetails onClose={()=>seteditUserOpen(false)} user={user} />
            )
        }
    </div>
  )
}

export default Sidebar