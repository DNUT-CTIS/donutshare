import React, {useState} from 'react';
import { Navbar } from '../../shared/Navbar';
import { ToastContainer,toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import authService from '../../service/authService';



export function ForgotPassword(props) {
  const [newPassword, setNewPassword] = useState("");
  const [showModal,setShowModal] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState("");
  const { id } = useParams();



  function handleForgotPassword(password,id) {

 

    if (newPassword.length < 6) {
      toast.error("Password should be at least 6 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    console.log(newPassword)
         authService.changePasswordWithoutToken(id, password)
       .then((response) => {
         console.log(response.data);
        setShowModal(false)
       })
       .catch((error) => {
        console.log(error);
      });
    setNewPassword('');
  };




  return (


    <div>
      <Navbar />
      <section className="bg-gray-50 dark:bg-zinc-900">
      <div className="flex flex-col items-center">
    <form className="w-full max-w-sm" onSubmit={(e) => {
      e.preventDefault();
       setShowModal(true);
}}>
      
      <div className="mb-4">
        <label htmlFor="newPassword" className="block text-gray-700 font-bold mb-2 dark:text-white">
          New Password
        </label>
        <input
          type="password"
          id="newPassword"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-purple-500"
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
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-purple-500"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="w-full text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
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
                    onClick={() => handleForgotPassword(newPassword, id)}
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
      </section>
    </div>
  );
}
