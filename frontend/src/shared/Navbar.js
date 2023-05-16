import React, { Fragment, useState } from 'react';
import logo from './logo.png'
import { useNavigate } from "react-router-dom";
import ModalContainer from './ModalContainer';
import SendModal from './SendModal';
import { Auth } from "../pages/auth/Auth";
import { motion } from "framer-motion";
import { SearchModal } from "../pages/dashboard/SearchModal";
import DropdownMenu from './DropdownMenu';

export function Navbar() {

  const options = [
    
  ];

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
          <motion.a initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01]
            }} href="/dashboard" className="flex items-center">
            <img src={logo} className="h-6 mr-3 sm:h-10"
              alt="Donut Share Logo" />



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

              <div>
                <DropdownMenu options={options} />
                
                

              </div>
              
              <div class="font-medium dark:text-white">
                <div>{username}</div>
                <div class="font-medium truncate">name@flowbite.com</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">{userData}</div>
              </div>

              

              

              {!username ? (<Auth></Auth>) : <motion.button initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0, 0.71, 0.2, 1.01]
                }}>

                  

                

              </motion.button>}

            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  )
}
