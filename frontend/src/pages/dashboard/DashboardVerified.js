import React, {Fragment, useState, useEffect} from 'react';
import '../../button.css';
import {Dashboard} from "../../Dashboard";


export function DashboardVerified(props) {
  const [showModal, setShowModal] = useState(true)

  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(25);
  const [users, setUsers] = useState([])



  return (

      <div>
        <Dashboard></Dashboard>
        {showModal ?  (
        <div
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
              <p className="dark:text-white place-self-center">Aferin iyi bok yedin</p>
              <br/>
              <p className="dark:text-white place-self-center">If there isn't any email click to <a className="text-pink-700" href="#">resend</a> another one</p>
            </div>
          </div>
        </div>
        ):null}
      </div>

  );
}
