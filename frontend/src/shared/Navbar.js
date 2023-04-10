import React, {Fragment, useState} from 'react';
import logo from './logo.png'
import {useNavigate} from "react-router-dom";
import ModalContainer from './ModalContainer';
import SendModal from './SendModal';
import {Auth} from "../pages/auth/Auth";
import {motion} from "framer-motion";
import {SearchModal} from "../pages/dashboard/SearchModal";

export function Navbar() {

  const [showModal, setShowModal] = useState()

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const navigate = useNavigate();
  const username = JSON.parse(localStorage.getItem("username"))
  const userData = JSON.parse(localStorage.getItem("userType"))
  console.log(userData)
  console.log(username)

  const handleLogout = async (event) => {
    event.preventDefault()
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("id");
    localStorage.removeItem("userType");

    navigate("/dashboard");
    window.location.reload(false);
  };

  const handleProfile = async (event) => {
    event.preventDefault()
    if (userData === "debater") {
      navigate("/control-panel/profile");
    }

    if (userData === 'moderator') {
      navigate("/control-panel/mod-profile");
    }

    if (userData === 'admin') {
      navigate("/control-panel/admin-profile");
    }

  };

  return (
    <Fragment>
      <nav className="p-3 border-gray-200 bg-gray-50 dark:bg-zinc-800 dark:border-gray-700">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <motion.a initial={{opacity: 0, scale: 0.5}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{
                      duration: 0.8,
                      delay: 0.5,
                      ease: [0, 0.71, 0.2, 1.01]
                    }} href="/dashboard" className="flex items-center">
            <img src={logo} className="h-6 mr-3 sm:h-10"
                 alt="Donut Share Logo"/>
          </motion.a>
          <button data-collapse-toggle="navbar-solid-bg" type="button"
                  className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  aria-controls="navbar-solid-bg" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"></path>
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
            <div class="flex flex-row items-center gap-4">
              {username ? (<div className="">
                <button onClick={handleProfile}>
                  <div
                    className="mx-auto w-12 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    {userData === "moderator" ? (<img
                        src="https://icons.iconarchive.com/icons/pictogrammers/material-alphabet/128/alpha-m-circle-icon.png"/>)
                      : userData === "admin" ? (<img
                          src="https://icons.iconarchive.com/icons/pictogrammers/material-alphabet/128/alpha-a-circle-icon.png"/>)
                        : (<img className="w-12"
                                src="https://icons.iconarchive.com/icons/pictogrammers/material-alphabet/128/alpha-d-circle-icon.png"/>
                        )
                    }
                  </div>
                  <div className="font-medium dark:text-white">
                    <div>{username}</div>
                  </div>
                </button>
              </div>) : null}
            {!username ? (<Auth></Auth>) : <motion.button initial={{opacity: 0, scale: 0.5}}
                                                          animate={{opacity: 1, scale: 1}}
                                                          transition={{
                                                                duration: 0.8,
                                                                delay: 0.5,
                                                                ease: [0, 0.71, 0.2, 1.01]
                                                              }}>
                <button className="bg-pink-600 text-black active:bg-pink-800
        font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        onClick={handleLogout}>
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 4.354v6.651l7.442-.001L17.72 9.28a.75.75 0 0 1-.073-.976l.073-.084a.75.75 0 0 1 .976-.073l.084.073 2.997 2.997a.75.75 0 0 1 .073.976l-.073.084-2.996 3.004a.75.75 0 0 1-1.134-.975l.072-.085 1.713-1.717-7.431.001L12 19.25a.75.75 0 0 1-.88.739l-8.5-1.502A.75.75 0 0 1 2 17.75V5.75a.75.75 0 0 1 .628-.74l8.5-1.396a.75.75 0 0 1 .872.74ZM8.502 11.5a1.002 1.002 0 1 0 0 2.004 1.002 1.002 0 0 0 0-2.004Z"
                      fill="#ffffff"/>
                    <path
                      d="M13 18.501h.765l.102-.006a.75.75 0 0 0 .648-.745l-.007-4.25H13v5.001ZM13.002 10 13 8.725V5h.745a.75.75 0 0 1 .743.647l.007.102.007 4.251h-1.5Z"
                      fill="#ffffff"/>
                  </svg>
                </button>

              </motion.button>}

            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  )
}
