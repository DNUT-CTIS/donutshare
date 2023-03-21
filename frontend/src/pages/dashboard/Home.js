import React, {Fragment, useEffect, useState} from 'react';
import {Link, Navigate, useNavigate,useLocation} from "react-router-dom";
import logo from "../../shared/logo.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactCardFlip from 'react-card-flip';
import Upvote from "react-upvote/lib/ReactUpvote";
import {Rate} from "./Rate.js";
import {Reason} from "./Reason";
import {Navbar} from "../../shared/Navbar";
import AuthService from "../../service/authService";
import PostService from "../../service/postService";
import {Login} from "../auth/Login";

export function Home() {
    const [isFlipped, setIsFlipped] = useState(false);
    const [txt, setTxt] = useState("");

    const handleClick = (e) => {
        e.preventDefault();
        setIsFlipped(!isFlipped);
    };

    const submitPost = async (event) => {
        event.preventDefault()
        try {
            await PostService.sendPost("post", txt).then(
                (response) => {
                    // check for token and user already exists with 200
                    //   console.log("Sign up successfully", response);


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
      <Fragment>
            <div>

                    <Navbar></Navbar>

                    <div className="flex flex-col items-center justify-center h-screen dark:bg-zinc-900">

                        <Reason></Reason>
                        <br></br>
                        <Reason></Reason>
                    </div>

            </div>

      </Fragment>

    );

}

