import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from "../../shared/logo.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import AuthService from "../../service/authService";
import ReactCardFlip from "react-card-flip";

export function Auth(props) {
    const navigate = useNavigate();
    const [isFlipped, setIsFlipped] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");
    const [token, setToken] = useState("");
    const handleClick = (e) => {
        e.preventDefault();
        setIsFlipped(!isFlipped);
    };
    const registerHandler = async (event) => {
        event.preventDefault()
        try {
            await AuthService.signup(user, email, password).then(
                (response) => {
                    // check for token and user already exists with 200
                    //   console.log("Sign up successfully", response);
                    navigate("/dashboard");

                },
                (error) => {
                    console.log(error);
                }
            );
        } catch (err) {
            console.log(err);
        }
    };

    const loginHandler = async (event) => {
        event.preventDefault()
        try {
            await AuthService.login(email, password).then(
                () => {

                    navigate("/dashboard");
                },
                (error) => {
                    console.log(error);
                }
            );
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="bg-gray-50 dark:bg-zinc-900">
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">

            <div className="bg-gray-50 dark:bg-zinc-900">
                <section className="bg-gray-50 dark:bg-zinc-900">
                    <div className="dark flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <div
                            className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-zinc-800 dark:border-zinc-700">

                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <img src={logo}
                                     alt="Donut Logo"/>
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Login
                                </h1>

                                <form className="space-y-4 md:space-y-6" action="frontend/src/pages/auth/Login#" onSubmit={loginHandler}>
                                    <div>
                                        <label htmlFor="email"


                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                            email</label>
                                        <input type="email" name="email" id="email"
                                               onChange={(e) => setEmail(e.target.value)}
                                               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-purple-500"
                                               placeholder="name@company.com" required=""/>
                                    </div>
                                    <div>
                                        <label htmlFor="password"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input type="password" name="password" id="password" placeholder="••••••••"
                                               onChange={(e) => setPassword(e.target.value)}
                                               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-purple-500"
                                               required=""/>
                                    </div>
                                    <button type="submit"
                                            className="w-full text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Login
                                    </button>
                                    <div>
                                        <h1 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Not a donuter? <a onClick={handleClick} className="dark:text-pink-400">Sign up</a></h1>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div>
                <section className="bg-gray-50 dark:bg-zinc-900">
                    <div className="dark flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <div
                            className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-zinc-800 dark:border-zinc-700">

                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <img src={logo}
                                     alt="Flowbite Logo"/>
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Register
                                </h1>

                                <form className="space-y-4 md:space-y-6" action="frontend/src/pages/auth/Register#" onSubmit={registerHandler}>
                                    <div>
                                        <label htmlFor="email"


                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                            email</label>
                                        <input type="email" name="email" id="email"
                                               onChange={(e) => setEmail(e.target.value)}
                                               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-purple-500"
                                               placeholder="name@company.com" required=""/>
                                    </div>
                                    <div>
                                        <label htmlFor="username"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">UserName</label>
                                        <input type="username" name="username" id="username" placeholder=""
                                               onChange={(e) => setUser(e.target.value)}
                                               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-purple-500"
                                               required=""/>
                                    </div>
                                    <div>
                                        <label htmlFor="password"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input type="password" name="password" id="password" placeholder="••••••••"
                                               onChange={(e) => setPassword(e.target.value)}
                                               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-purple-500"
                                               required=""/>
                                    </div>
                                    <button type="submit"
                                            className="w-full text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Register
                                    </button>
                                    <div>
                                        <h1 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Already a donuter? <a onClick={handleClick} className="dark:text-pink-400">Sign in</a></h1>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
</ReactCardFlip>
        </div>
    );
}
