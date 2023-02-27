import React, { useState, useEffect } from 'react';
import logo from './logo.png'
import { Navbar } from "./navbar";
import './button.css';




export function Dashboard(props) {
    const [loading, setLoading] = useState(false);
    const [counter, setCounter] = useState(25);
    const [users, setUsers] = useState([])



    return (


        <div>
            <Navbar />
            <section className="bg-gray-50 dark:bg-zinc-900">
                <div
                    className="dark flex flex-row gap-48 items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">


                        <div class="flex flex-col text-center p-4 leading-normal">
                            <h1 class="mb-3 text-3xl font-bold text-gray-900 dark:text-white">Abortion Should be Legal or Illegal in Whole Country</h1>
                            

                            <div class="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">

                                <div class="buttons">
                                    <button>Agree</button>
                                    <button>Disagree</button>
                                </div>

                            </div>
                        </div>
                    </a>




                </div>
            </section>
        </div>

    );
}
