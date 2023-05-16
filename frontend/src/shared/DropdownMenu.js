import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";

const DropdownMenu = ({ options }) => {
  const username = JSON.parse(localStorage.getItem("username"))
  const userData = JSON.parse(localStorage.getItem("userType"))
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
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

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {username ? (<div className="">

        <div
          className="mx-auto w-12 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
          data-dropdown-toggle="userDropdown"
          data-dropdown-placement="bottom-start"
          alt="User dropdown"
          onClick={toggleDropdown}>
          {userData === "moderator" ? (<img
            src="https://icons.iconarchive.com/icons/pictogrammers/material-alphabet/128/alpha-m-circle-icon.png" />)
            : userData === "admin" ? (<img
              src="https://icons.iconarchive.com/icons/pictogrammers/material-alphabet/128/alpha-a-circle-icon.png" />)
              : (<img className="w-12"
                src="https://icons.iconarchive.com/icons/pictogrammers/material-alphabet/128/alpha-d-circle-icon.png" />
              )
          }
        </div>

      </div>) : null}
      {isOpen && (
        <div
          id="userDropdown"
          className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute"
        >

          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
            {options.map((option) => (
              <li key={option.value}>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => selectOption(option)}
                >
                  {option.label}
                </a>
              </li>
            ))}
             <li>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={handleProfile}
              >
                Profile
              </button>
            </li>
          </ul>
          <div className="py-1">
            <div class="py-1"
              onClick={handleLogout}>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out
                <path
                  d="M12 4.354v6.651l7.442-.001L17.72 9.28a.75.75 0 0 1-.073-.976l.073-.084a.75.75 0 0 1 .976-.073l.084.073 2.997 2.997a.75.75 0 0 1 .073.976l-.073.084-2.996 3.004a.75.75 0 0 1-1.134-.975l.072-.085 1.713-1.717-7.431.001L12 19.25a.75.75 0 0 1-.88.739l-8.5-1.502A.75.75 0 0 1 2 17.75V5.75a.75.75 0 0 1 .628-.74l8.5-1.396a.75.75 0 0 1 .872.74ZM8.502 11.5a1.002 1.002 0 1 0 0 2.004 1.002 1.002 0 0 0 0-2.004Z"
                  fill="#ffffff" />
                <path
                  d="M13 18.501h.765l.102-.006a.75.75 0 0 0 .648-.745l-.007-4.25H13v5.001ZM13.002 10 13 8.725V5h.745a.75.75 0 0 1 .743.647l.007.102.007 4.251h-1.5Z"
                  fill="#ffffff" />
              </a>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
