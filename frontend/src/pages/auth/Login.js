import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from "../../shared/logo.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import AuthService from "../../service/authService";




export function Login(props) {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [token, setToken] = useState("");
    const[userType,setUserType]=useState("")

    const submitHandler = async (event) => {
        event.preventDefault()
        try {
            await AuthService.login(email, password).then(
                (response) => {
                    
                   
                    localStorage.setItem("userType", JSON.stringify(response.userType))
                    localStorage.setItem("username", JSON.stringify(response.username))
                    const data=JSON.parse(localStorage.getItem("userType"))
                    
                    if(data==="debater"){
                    navigate("/dashboard");
                    }
                    else if(data === "moderator"){
                    navigate("/mod-profile");
                    }
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
        <div>
            <ToastContainer />
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

                            <form className="space-y-4 md:space-y-6" action="frontend/src/pages/auth/Login#" onSubmit={submitHandler}>
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
                                    <h1 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Not a donuter? <a href="/sign-up" className="dark:text-pink-400">Sign up</a></h1>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
}
