import React, {useEffect, useState} from 'react';
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

export function Home() {
    const [isFlipped, setIsFlipped] = useState(false);
    const [txt, setTxt] = useState("");
    const {state} = useLocation();
    const { user } = state; 
    console.log(user)

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
            <div>
                {user === "moderator"? (
                    <Navbar></Navbar>
                ):""}
                    <div className="flex flex-col items-center justify-center h-screen dark:bg-zinc-900">

                        <Reason></Reason>
                        <br></br>
                        <Reason></Reason>
                    </div>
            </div>
        

    );

}

