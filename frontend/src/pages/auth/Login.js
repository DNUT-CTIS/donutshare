import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import logo from "../../shared/logo.png"
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import AuthService from "../../service/authService";
import ReactCardFlip from "react-card-flip";
import {Register} from "./Register";
import {RegisterSuccess} from "./RegisterSuccess";
import {AnimatePresence, motion} from "framer-motion";

export function Login() {

  const [showModal, setShowModal] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(true);
  const [signupSuccess, setSignupSuccess] = useState(false);


  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [userType, setUserType] = useState("")

  const handleClick = (e) => {
    e.preventDefault();
    setShowSignUpForm(!showSignUpForm);
  };

  const submitHandler = async (event) => {
    event.preventDefault()
    try {
      await AuthService.login(email, password).then(
        (response) => {

          localStorage.setItem("userType", JSON.stringify(response.userType))
          localStorage.setItem("username", JSON.stringify(response.username))
          const data = JSON.parse(localStorage.getItem("userType"))

          if (data === "debater") {
            window.location.reload(false);
          } else if (data === "moderator") {
            navigate("/mod-profile");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const resendHandler = async (event) => {
    event.preventDefault()

    try {
      await AuthService.resend(email).then(
        (response) => {
          // check for token and user already exists with 200
          //   console.log("Sign up successfully", response);

        },
      )
    } catch (err) {
      console.log(err);
    }
  }

  const registerHandler = async (event) => {
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
          console.log(response)
          if (response.status === 200) {
            setSignupSuccess(true);
          }


        },
      )
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <motion.button initial={{opacity: 0, scale: 0.5}}
                     animate={{opacity: 1, scale: 1}}
                     transition={{
                       duration: 0.8,
                       delay: 0.5,
                       ease: [0, 0.71, 0.2, 1.01]
                     }} className="bg-pink-600 text-white active:bg-pink-800
      font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="button" onClick={() => {
        setShowModal(true);
        setShowSignUpForm(true);
      }}>
        Login
      </motion.button>
      <ToastContainer autoClose={2000} theme={"dark"}/>
      <AnimatePresence>
      {showModal ? ( showSignUpForm ? (
          <div
            className='fixed z-50 inset-0 dark:bg-black dark:bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
            <motion.div
              initial={{ scale: 0 }}
              exit={{scale: 0 }}
              animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20
                        }} className='w-[500px] flex flex-col'>
              <div className="dark:bg-zinc-800 p-2  rounded-lg dark:border dark:border-zinc-700 flex flex-col">
                <button type="button"
                        className="place-self-end top-3 right-2.5 place-self-end text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto dark:hover:bg-zinc-700 dark:hover:text-white"
                        onClick={() => setShowModal(false)}
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
                       alt="Donut Logo"/>
                  <form className="space-y-4 md:space-y-6" action="frontend/src/pages/auth/Login#"
                        onSubmit={submitHandler}>
                    <div>
                      <label htmlFor="email"
                             className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                        email</label>
                      <input type="email" name="email" id="email"
                             onChange={(e) => setEmail(e.target.value)}
                             className="bg-gray-50 border border-gray-300  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-purple-500"
                             placeholder="name@company.com" required=""/>
                    </div>
                    <div>
                      <label htmlFor="password"
                             className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••"
                             onChange={(e) => setPassword(e.target.value)}
                             className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-purple-500"
                             required=""/>
                    </div>
                    <button type="submit"
                            className="w-full text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Login
                    </button>
                    <div>
                      <h1 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Not a donuter? <a
                        onClick={() => setShowSignUpForm(false)} className="dark:text-pink-400">Sign up</a></h1>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>) : (signupSuccess ? ( <div
          className='fixed z-50 inset-0 dark:bg-black dark:bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
          <div className='w-[500px] flex flex-col'>
            <div className="dark:bg-zinc-800 p-2  rounded-lg dark:border dark:border-zinc-700 flex flex-col">
              <button type="button"
                      className="place-self-end top-3 right-2.5 place-self-end text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto dark:hover:bg-zinc-700 dark:hover:text-white"
                      onClick={() => setShowModal(false)}
              >
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8 flex justify-center">
                <svg width="128" height="128" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M2 5a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3v5h-9a4 4 0 0 0-4 4v5c0 .345.044.68.126 1H5a3 3 0 0 1-3-3V5Zm3.75-1a.75.75 0 0 0 0 1.5h9.5a.75.75 0 0 0 0-1.5h-9.5Zm2 3a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5h-7.5Zm-.202 5.27A2.996 2.996 0 0 1 10 11h9c1.013 0 1.908.502 2.452 1.27L14.5 16.616l-6.952-4.344Zm-.534 1.436C7.004 13.803 7 13.9 7 14v5a3 3 0 0 0 3 3h9a3 3 0 0 0 3-3v-5c0-.1-.005-.197-.014-.294l-7.088 4.43a.75.75 0 0 1-.796 0l-7.088-4.43Z" fill="#BDC3C8"/></svg>

              </div>
              <p className="dark:text-white place-self-center">Check your mail to verify your account</p>
              <br/>
              <p className="dark:text-white place-self-center">If there isn't any email click to <a onClick={resendHandler} className="text-pink-700" >resend</a> another one</p>
            </div>
          </div>
        </div>) : <div>
          <div
            className='fixed z-50 inset-0 dark:bg-black dark:bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
            <motion.div initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20
                        }} className='w-[500px] flex flex-col'>
              <div className="dark:bg-zinc-800 p-2 rounded-lg dark:border dark:border-zinc-700 flex flex-col">
                <button type="button"
                        className="place-self-end top-3 right-2.5 place-self-end text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto dark:hover:bg-zinc-700 dark:hover:text-white"
                        onClick={() => setShowModal(false)}
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
                  <form className="space-y-4 md:space-y-6" action="frontend/src/pages/auth/Register#"
                        onSubmit={registerHandler}>
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
                             className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm
                        Password</label>
                      <input type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••"
                             onChange={(e) => setConfirmPassword(e.target.value)}
                             className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-purple-500"
                             required=""/>
                    </div>
                    <button type="submit"
                            className="w-full text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Register
                    </button>
                    <div>
                      <h1 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Already a donuter? <a
                        onClick={() => setShowSignUpForm(true)} className="dark:text-pink-400">Sign in</a></h1>
                    </div>
                  </form>
                </div>

              </div>
            </motion.div>
          </div>
        </div>)
          ) : null}
        </AnimatePresence>
    </div>
  );
}
