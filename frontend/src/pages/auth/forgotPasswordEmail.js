import React, {useState,useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import logo from "../../shared/logo.png"
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthService from "../../service/authService";
import { Dashboard } from '../dashboard/Dashboard';



export function ForgotPasswordEmail(props) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [user, setUser] = useState("");
  const registerHandler = async (event) => {

    event.preventDefault()


    try {
      await AuthService.forgotpassword(email).then(
        (response) => {
          console.log(response.status);
          if (response.status === 200 ) {
            setSignupSuccess(true);
            toast.success("Change password mail has sent to the e-mail");
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <ToastContainer autoClose={2000} theme={"dark"}/>
      <section className="bg-gray-50 dark:bg-zinc-900">
        <div className="dark flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div
            className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-zinc-800 dark:border-zinc-700">

            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <img src={logo}
                   alt="Flowbite Logo"/>
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Forgot Password
              </h1>

              <form className="space-y-4 md:space-y-6" action="frontend/src/pages/auth/Register#"
                onSubmit={registerHandler}>
            <div>
              <label htmlFor="email"
                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter your e-mail
              </label>
              <input type="email" name="email" id="email"
                     onChange={(e) => setEmail(e.target.value)}
                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-purple-500"
                     placeholder="name@company.com" required=""/>
            </div>
            <button type="submit"
                    className="w-full text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Send change password e-mail
            </button>
          </form>
            </div>
          </div>
        </div>
      </section>
    </div>

  );

} 
