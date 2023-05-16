import React, { useState } from 'react';
import { Navbar } from '../../../shared/Navbar';
import authService from '../../../service/authService';
import {toast, ToastContainer} from 'react-toastify';
function ChangePassword() {

 
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showModal,setShowModal] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (e) => {

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    e.preventDefault();
    console.log(password)
    console.log(newPassword)
    authService.changePassword(password, newPassword)
      .then((response) => {
        console.log(response.data);
        setShowModal(false)
      })
      .catch((error) => {
        console.log(error);
      });

    setPassword('');
    setNewPassword('');
  };

  return (
    <div className="flex flex-col items-center">
    <form className="w-full max-w-sm" onSubmit={(e) => {e.preventDefault(); setShowModal(true);}}>
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 font-bold mb-2 dark:text-white">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="form-input w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="newPassword" className="block text-gray-700 font-bold mb-2 dark:text-white">
          New Password
        </label>
        <input
          type="password"
          id="newPassword"
          className="form-input w-full"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2 dark:text-white">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          className="form-input w-full"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Change Password
        </button>
      </div>
    </form>
    <ToastContainer />
    {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                      "Are you sure you want to change your password ?"
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {setShowModal(false)}}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={
                      handlePasswordChange
                     }
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
  </div>
  );
}

export default ChangePassword;
