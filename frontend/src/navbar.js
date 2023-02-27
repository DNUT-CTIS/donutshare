import React from 'react';
import logo from './logo.png'
export function Navbar() {

    return(
        <nav className="p-3 border-gray-200 bg-gray-50 dark:bg-zinc-800 dark:border-gray-700">
            <div className="container flex flex-wrap items-center justify-between mx-auto">
                <a href="dashboard" className="flex items-center">
                    <img src={logo} className="h-6 mr-3 sm:h-10"
                         alt="Flowbite Logo"/>
                </a>
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
                    <ul className="flex flex-col mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">

                        <li>
                        <a href="#" class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 mr-1 md:mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Login</a>
                        </li>
                        <li>
                        <a href="#" class="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 mr-1 md:mr-2 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800">Sign up</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}
