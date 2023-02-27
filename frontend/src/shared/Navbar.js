import React from 'react';
import logo from './logo.png'
import {Modal} from "flowbite";
import SendModal from "./SendModal";

export function Navbar() {

    return(
        <nav className="p-3 border-gray-200 bg-gray-50 dark:bg-zinc-800 dark:border-gray-700">
            <div className="container flex flex-wrap items-center justify-between mx-auto">
                <a href="dashboard" className="flex items-center">
                    <img src={logo} className="h-6 mr-3 sm:h-10"
                         alt="Donut Share Logo"/>
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
                            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6.25 2.75a1.5 1.5 0 0 0-1.5 1.5v15.5a1.5 1.5 0 0 0 1.5 1.5h5.94a6.5 6.5 0 0 1 7.06-10.012V4.25a1.5 1.5 0 0 0-1.5-1.5H6.25Zm2.25 10.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm9 9.75a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Zm3.5-5.5a.5.5 0 0 1-.5.5h-4.793l1.647 1.646a.5.5 0 0 1-.708.708l-2.5-2.5a.5.5 0 0 1 0-.708l2.5-2.5a.5.5 0 0 1 .708.708L15.707 17H20.5a.5.5 0 0 1 .5.5Z" fill="#ffffff"/></svg>
                        </li>
                        <li>
                            <SendModal></SendModal>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}
