import React, { useState } from 'react';
import { Navbar } from './Navbar';
function DebaterProfile() {

  const [selectedItem, setSelectedItem] = useState('general');


  return (
    <div className="flex flex-col h-screen dark:bg-zinc-900">
      <Navbar/>
      <div className="flex flex-row flex-1">
        <div className="w-1/6 bg-gray-200 h-full p-4">
          <ul>
            <li className={`mb-4 ${selectedItem === 'general' ? 'bg-gray-300' : ''}`}>
              <a href="#" className="text-gray-800 font-bold hover:text-gray-700 block py-2 px-4 rounded-md"
                onClick={() => setSelectedItem('general')}>Account Settings</a>
            </li>
          </ul>
        </div>

        
        <div className="flex-1 p-8 dark:bg-zinc-900">
          {selectedItem === 'security' ? (
            <div className="flex justify-center">
              <h2 className="text-xl font-bold">SECURITY PAGE</h2>
            </div>
          ) : selectedItem === 'privacy' ? (
            <div className="flex justify-center">
              <h2 className="text-xl font-bold">PRIVACY PAGE</h2>
            </div>
          ) : (
          <div className="flex flex-col items-center">
            <form className="w-full max-w-sm">
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                <input type="text" id="name" className="form-input w-full" placeholder="John Doe" />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                <input type="email" id="email" className="form-input w-full" placeholder="johndoe@example.com" />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                <input type="password" id="password" className="form-input w-full" />
              </div>

              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">Confirm Password</label>
                <input type="password" id="confirmPassword" className="form-input w-full" />
              </div>

              <div className="flex justify-center">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Save Changes
                  </button>
          </div>
        </form>
      </div>
          )}
    </div>
  </div>
</div>
);
}

export default DebaterProfile;