import React, { useState } from 'react';
import { Navbar } from '../../../shared/Navbar';
import authService from '../../../service/authService';
import { toast, ToastContainer } from 'react-toastify';
import ChangePassword from '../shared/changePassword';
import { Profile } from '../../dashboard/Profile';
function DebaterProfile() {

  const [selectedItem, setSelectedItem] = useState('profile');

  return (
    <div className="flex flex-col h-screen dark:bg-zinc-900">
      <Navbar />
      <div className="dark flex flex-row flex-1">
        <div className="w-1/6  h-full p-4  bg-black  shadow dark:shadow-md border-2 border-gray-700 dark:bg-zinc-800">
          <ul>
            <li className={`mb-4 ${selectedItem === 'profile' ? 'bg-pink-500 rounded-md' : ''}`}>
              <a href="#" className="dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 font-bold hover:text-pink-700 block py-2 px-4 rounded-md"
                onClick={() => setSelectedItem('profile')}>Profile</a>
            </li>
            <li className={`mb-4 ${selectedItem === 'general' ? 'bg-pink-500 rounded-md' : ''}`}>
              <a href="#" className="dark:text-white hover:bg-pink-100 dark:hover:bg-gray-700 hover:text-pink-700 block py-2 px-4 rounded-md"
                onClick={() => setSelectedItem('general')}>Change Password</a>
            </li>
          </ul>
        </div>
        <div className="flex-1 p-8 dark:bg-zinc-900">
          {selectedItem === 'general' ? (
            <ChangePassword />) : (
            <Profile />)}
        </div>
      </div>
    </div>














  );
}

export default DebaterProfile;
