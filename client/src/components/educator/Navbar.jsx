import React from 'react';
import { Link } from 'react-router-dom';
import { assets, dummyEducatorData } from '../../assets/assets';
import { UserButton, useUser } from '@clerk/clerk-react';

const Navbar = () => {
  const educatorData = dummyEducatorData;
  const { user } = useUser();

  return (
    <div className='flex items-center justify-between px-4 md:px-8 border-b border-gray-500 py-3'>
      <Link to='/'>
        <h1 className='md:text-home-heading-large text-blue-700 cursor-pointer'>LearnEase</h1>
      </Link>

      <div className='flex items-center gap-5 text-gray-500'>
        <p>Hi ! {user ? user.fullName : 'Developers'}</p>
        {user ? <UserButton /> : <img src={assets.profile_img} alt="Profile" className="w-8 h-8 rounded-full" />}
      </div>
    </div>
  );
};

export default Navbar;
