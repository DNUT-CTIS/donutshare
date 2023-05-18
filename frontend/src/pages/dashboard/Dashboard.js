import React, {useState} from 'react';
import {Navbar} from "../../shared/Navbar";
import {Post} from "./Post";
import {Topic} from "./Topic";

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
          <a href="#" class=" p-4 mt-24 flex flex-col items-center justify-center  bg-black rounded-lg shadow dark:shadow-md border-4 border-pink-500/50 md:flex-row md:max-w-3xl  dark:bg-zinc-800 sticky top-0 md:h-full w-full">
            <Topic></Topic>
          </a>

            <Post></Post>
            <br></br>
        </div>

      </section>
    </div>

  );
}
