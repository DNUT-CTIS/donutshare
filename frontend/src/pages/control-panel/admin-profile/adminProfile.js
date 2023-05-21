import React, { useState } from 'react';
import DebaterList from '../shared/debaterList';
import AddTopic from '../shared/addTopic';
import ModeratorList from './moderatorList';
import { Navbar } from '../../../shared/Navbar';
import ReportedPosts from '../shared/ReportedPosts';
import ChangePassword from '../shared/changePassword';
import ReportedUsers from '../shared/reportedUsers';
import { Profile } from '../../dashboard/Profile';
function AdminProfile() {
  
  const [selectedItem, setSelectedItem] = useState('profile');

  return (
    <div className="flex flex-col h-screen dark:bg-zinc-900">
      <Navbar/>
      <div className="dark flex flex-row flex-1">
        <div className="w-1/6 h-full p-4  bg-black  shadow dark:shadow-md border-2 border-gray-700 dark:bg-zinc-800">
        <ul>
            <li className={`mb-4 ${selectedItem === 'profile' ? 'bg-yellow-300 rounded-md' : ''}`}>
              <a href="#" className="dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 font-bold hover:text-pink-700 block py-2 px-4 rounded-md"
                onClick={() => setSelectedItem('profile')}>Profile</a>
            </li>
            <li className={`mb-4 ${selectedItem === 'general' ? 'bg-yellow-300 rounded-md' : ''}`}>
              <a href="#" className="dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 font-bold hover:text-pink-700 block py-2 px-4 rounded-md"
                onClick={() => setSelectedItem('general')}>Change Password</a>
            </li>
            <li className={`mb-4 ${selectedItem === 'dblist' ? 'bg-yellow-300 rounded-md' : ''}`}>
              <a href="#" className="dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 font-bold hover:text-pink-700 block py-2 px-4 rounded-md"
                onClick={() => setSelectedItem('dblist')}>Debater List</a>
            </li>
            <li className={`mb-4 ${selectedItem === 'add' ? 'bg-yellow-300 rounded-md' : ''}`}>
              <a href="#" className="dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 font-bold hover:text-pink-700 block py-2 px-4 rounded-md"
                onClick={() => setSelectedItem('add')}>Add Topic</a>
            </li>
            <li className={`mb-4 ${selectedItem === 'modlist' ? 'bg-yellow-300 rounded-md' : ''}`}>
              <a href="#" className="dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 font-bold hover:text-pink-700 block py-2 px-4 rounded-md"
                onClick={() => setSelectedItem('modlist')}>Moderator List</a>
            </li>
            <li className={`mb-4 ${selectedItem === 'reportedReason' ? 'bg-yellow-300 rounded-md' : ''}`}>
              <a href="#" className="dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 font-bold hover:text-pink-700 block py-2 px-4 rounded-md"
                onClick={() => setSelectedItem('reportedReason')}>Reported Reasons</a>
            </li>
            <li className={`mb-4 ${selectedItem === 'reportedUser' ? 'bg-gray-300' : ''}`}>
              <a href="#" className="dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 font-bold hover:text-pink-700 block py-2 px-4 rounded-md"
                onClick={() => setSelectedItem('reportedUser')}>Reported Users</a>

            </li>
          </ul>
        </div>

        
        <div className="flex-1 p-8 dark:bg-zinc-900">
        {selectedItem === 'modlist' ? (
            <ModeratorList/>
          ) : selectedItem === 'dblist' ? (
           <DebaterList/>
          ) : selectedItem === 'reportedReason' ? (
            <ReportedPosts/>
           )
          : selectedItem === 'add' ? (
            <AddTopic/>
          ): selectedItem === 'profile' ? (
            <Profile/>
          ): selectedItem === 'reportedUser' ? (
            <ReportedUsers/>
          ) :(
          <ChangePassword/>
          )}
    </div>
  </div>
</div>
);
}

export default AdminProfile;
