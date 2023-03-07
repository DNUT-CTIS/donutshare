import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from "../../shared/logo.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import AuthService from "../../service/authService";

export function Register(props) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault()

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      await AuthService.signup(user, email, password).then(
        (response) => {
          // check for token and user already exists with 200
          //   console.log("Sign up successfully", response);
          navigate("/dashboard");

        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div>
      <div className='fixed z-50 inset-0 dark:bg-black dark:bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
        <div className='w-[500px] flex flex-col'>
          <div className="dark:bg-zinc-800 p-2 rounded-lg dark:border dark:border-zinc-700 flex flex-col">
            <button type="button"
                    className="place-self-end top-3 right-2.5 place-self-end text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto dark:hover:bg-zinc-700 dark:hover:text-white"

            >
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                   xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <img src={logo}
                   alt="Flowbite Logo"/>
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Register
              </h1>

              <form className="space-y-4 md:space-y-6" action="frontend/src/pages/auth/Register#" onSubmit={submitHandler}>
                <div>
                  <label htmlFor="email"


                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                    email</label>
                  <input type="email" name="email" id="email"
                         onChange={(e) => setEmail(e.target.value)}
                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-purple-500"
                         placeholder="name@company.com" required=""/>
                </div>
                <div>
                  <label htmlFor="username"
                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">UserName</label>
                  <input type="username" name="username" id="username" placeholder=""
                         onChange={(e) => setUser(e.target.value)}
                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-purple-500"
                         required=""/>
                </div>
                <div>
                  <label htmlFor="password"
                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" name="password" id="password" placeholder="••••••••"
                         onChange={(e) => setPassword(e.target.value)}
                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-purple-500"
                         required=""/>
                </div>
                <div>
                  <label htmlFor="confirmPassword"
                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                  <input type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••"
                         onChange={(e) => setConfirmPassword(e.target.value)}
                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-purple-500"
                         required=""/>
                </div>
                <button type="submit"
                        className="w-full text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Register
                </button>
                <div>
                  <h1 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Already a donuter? <a href="/login" className="dark:text-pink-400">Sign in</a></h1>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>

  );

}
