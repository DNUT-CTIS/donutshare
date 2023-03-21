import React, { useState, useEffect } from 'react';
import { Navbar } from "../../shared/loginavbar";
import { Post } from "./Post";
import { Topic } from "./Topic";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'




export function Dashboard(props) {
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(25);
  const [users, setUsers] = useState([])



  return (


    <div>
      <Navbar />
      <section className="bg-gray-50 dark:bg-zinc-900">
        <div
          className="dark flex flex-col gap-24 items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <a href="#" class="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 sticky top-0 md:h-fit">
            <Topic></Topic>
          </a>

            <Post></Post>
            <br></br>
        </div>
      </section>
    </div>

  );
}
