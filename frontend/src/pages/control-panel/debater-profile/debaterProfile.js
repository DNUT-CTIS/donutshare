import React, { useState } from 'react';
import { Navbar } from '../../../shared/Navbar';
import authService from '../../../service/authService';
import {toast, ToastContainer} from 'react-toastify';
import ChangePassword from '../shared/changePassword';
import { Profile } from '../../dashboard/Profile';
function DebaterProfile() {

  const [selectedItem, setSelectedItem] = useState('profile');

  return (
    <div className="flex flex-col h-screen dark:bg-zinc-900">
      <Navbar />
      <div className="flex flex-row flex-1">
  <div className="w-1/6 bg-gray-200 h-full p-4">
    <ul>
    <li className={`mb-4 ${selectedItem === 'profile' ? 'bg-gray-300' : ''}`}>
              <a href="#" className="text-gray-800 font-bold hover:text-gray-700 block py-2 px-4 rounded-md"
                onClick={() => setSelectedItem('profile')}>Profile</a>
            </li>
      <li className={`mb-4 ${selectedItem === 'general' ? 'bg-gray-300' : ''}`}>
        <a href="#" className="text-gray-800 font-bold hover:text-gray-700 block py-2 px-4 rounded-md"
          onClick={() => setSelectedItem('general')}>Change Password</a>
      </li>
    </ul>
  </div>
  <div className="flex-1 p-8 dark:bg-zinc-900">
  {selectedItem === 'general' ? (
            <ChangePassword/>):(
            <Profile/>)}
  </div>
</div>
    </div>














  );
}

export default DebaterProfile;
