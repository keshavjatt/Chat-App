import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Avatar from "./Avatar";
import { HiDotsVertical } from "react-icons/hi";
import { FaAngleLeft } from "react-icons/fa6";
import { FaPlus } from 'react-icons/fa6';
import { FaImage } from 'react-icons/fa6';
import { FaVideo } from 'react-icons/fa6';

const MessagePage = () => {
  const params = useParams();
  const socketConnection = useSelector(state => state?.user?.socketConnection);
  const user = useSelector(state => state?.user);
  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    profile_pic: "",
    online: false,
    _id: ""
  });

  console.log("params", params?.userId);

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit('message-page', params.userId);

      socketConnection.on('message-user', (data) => {
        setDataUser(data);
      });
    }
  }, [socketConnection, params?.userId, user]);

  return (
    <div>
      <header className='sticky top-0 h-16 bg-white flex items-center gap-4 px-4 justify-start'>
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <Link to={"/"} className='lg:hidden'>
              <FaAngleLeft size={25} />
          </Link>

          <Avatar
            width={50}
            height={50}
            imageUrl={dataUser?.profile_pic}
            name={dataUser?.name}
            userId={dataUser?._id}
          />
          <div className='-mt-2'>
            <h3 className='font-semibold text-lg my-0 text-ellipsis line-clamp-1'>{dataUser?.name}</h3>
            <p className='-my-2 text-sm'>
              {dataUser.online ? <span className='text-primary'>online</span> : <span className='text-slate-400'>offline</span>}
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="ml-auto">
            <button className='cursor-pointer hover:text-primary'>
              <HiDotsVertical />
            </button>
        </div>
      </header>

      {/** Show all message  **/}
      <section className='h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scrollbar'>
        Show all message
      </section>

      {/** Send message **/}
      <section className='h-16 bg-white flex items-center px-4'>
        <div className='relative'>
            <button className='flex justify-center items-center w-11 h-11 rounded-full hover:bg-primary hover:text-white'>
                <FaPlus size={20} />
            </button>

            {/** Video and Image **/}
            <div className='bg-white shadow rounded absolute bottom-14 w-36 p-2'>
                <form>
                    <label htmlFor='uploadImage' className='flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer'>
                        <div className='text-primary'>
                            <FaImage size={18} />
                        </div>
                        <p>Image</p>
                    </label>

                    <label htmlFor='uploadVideo' className='flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer'>
                        <div className='text-purple-500'>
                            <FaVideo size={18} />
                        </div>
                        <p>Video</p>
                    </label>
                </form>
            </div>
        </div>
      </section>
    </div>
  );
}

export default MessagePage;