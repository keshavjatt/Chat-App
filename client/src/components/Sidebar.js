import React from 'react';
import { IoChatbubbleEllipses } from "react-icons/io5"

const Sidebar = () => {
  return (
    <div className='w-full h-full'>
        <div className='bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5'>
            <div className='w-12 h-12 bg-red-500 flex justify-center items-center' title='Chat'>
                <IoChatbubbleEllipses 
                    size={25}                
                />
            </div>
        </div>
    </div>
  )
}

export default Sidebar