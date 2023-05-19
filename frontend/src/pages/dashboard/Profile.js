import React, { useState } from 'react';
import { Navbar } from "../../shared/Navbar";
import { useNavigate } from "react-router-dom";


export function Profile() {
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

    const navigate = useNavigate();
    const username = JSON.parse(localStorage.getItem("username"))
    const userData = JSON.parse(localStorage.getItem("userType"))
    const mail = JSON.parse(localStorage.getItem("mail"))



    return (


        <div>
            <section className="bg-gray-50 dark:bg-zinc-900">
                <div class="flex justify-center gap-16 mt-16">
                    <div class="flex-none w-full h-fit max-w-sm  bg-black dark:shadow-md border-4 border-gray-500/50 rounded-lg shadow dark:bg-gray-800">
                        <div class="flex justify-end px-4 pt-4">



                        </div>
                        <div class="flex flex-col items-center pb-10">
                            {userData === "moderator" ? (<img class="w-24 h-24 mb-3 rounded-full shadow-lg"
                                src="https://icons.iconarchive.com/icons/pictogrammers/material-alphabet/128/alpha-m-circle-icon.png" />)
                                : userData === "admin" ? (<img class="w-24 h-24 mb-3 rounded-full shadow-lg"
                                    src="https://icons.iconarchive.com/icons/pictogrammers/material-alphabet/128/alpha-a-circle-icon.png" />)
                                    : (<img class="w-24 h-24 mb-3 rounded-full shadow-lg"
                                        src="https://icons.iconarchive.com/icons/pictogrammers/material-alphabet/128/alpha-d-circle-icon.png" />
                                    )
                            }
                            <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{username}</h5>
                            <span class="text-sm text-gray-500 dark:text-gray-400 capitalize">{userData}</span>

                        </div>
                    </div>
                    <div class="flex-none w-full h-full max-w-sm md:max-w-3xl  b bg-gray dark:shadow-md border-4 border-gray-500/50 rounded-lg shadow dark:bg-gray-800">
                        <div class="flex justify-end px-4 pt-4">



                        </div>
                        <div class="flex flex-col items-center pb-10">

                            <h5 class="m-4 mb-8 text-xl font-medium text-gray-900 dark:text-white">PROFILE</h5>


                            <div class="mb-6">
                                <label for="base-input" class="w-52 block mb-2 text-sm font-medium text-gray-900 dark:text-white">USERNAME</label>
                                <input type="text" id="disabled-input" aria-label="disabled input" class="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={username} disabled />
                            </div>
                            <div class="mb-6">
                                <label for="base-input" class="w-52 block mb-2 text-sm font-medium text-gray-900 dark:text-white">MAIL</label>
                                <input type="text" id="disabled-input" aria-label="disabled input" class="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={mail} disabled />
                            </div>
                            <div class="mb-6 ">
                                <label for="base-input" class="w-52 block mb-2 text-sm font-medium text-gray-900 dark:text-white">PASSWORD</label>
                                <input type="text" id="disabled-input" aria-label="disabled input" class="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value="******" disabled />

                            </div>




                        </div>


                    </div>
                </div>
            </section>
        </div>

    );
}
