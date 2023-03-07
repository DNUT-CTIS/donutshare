import React, {Fragment, useState, useEffect} from 'react';
import logo from './logo.png'
import {Navbar} from "./shared/loginavbar";
import './button.css';
import {Post} from "./pages/dashboard/Post";
import {Topic} from "./pages/dashboard/Topic";
import {Login} from "./pages/auth/Login";
import axios from "axios";
import {RegisterSuccess} from "./pages/auth/RegisterSuccess";
import {Outlet} from "react-router-dom";


export function Dashboard(props) {
  const [showModal, setShowModal] = useState(false)

  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(25);
  const [users, setUsers] = useState([])

  const [verified, setVerified] = useState(false);


  return (

    <Fragment>
      {verified ? (<RegisterSuccess/>) : (
      <div>
        <Navbar/>
        <section className="bg-gray-50 dark:bg-zinc-900">
          <div
            className="dark flex flex-col gap-24 items-center justify-center px-6 py-8 mx-auto lg:py-0">
            <a href="#"
               class="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 sticky top-0 md:h-fit">
              <Topic></Topic>
            </a>
            <div>
              <Post></Post>
              <br></br>
            </div>
          </div>
        </section>
      </div>) }
    </Fragment>

  );
}
