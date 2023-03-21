import React, {useEffect, useState} from 'react';
import {Link, Navigate, useNavigate} from "react-router-dom";
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
import {Post} from "./Post";

export function TempHome() {
    const handleClick = (e) => {
        e.preventDefault();
    };


    return (
        <div>
            <Navbar></Navbar>
            <div className="flex flex-col items-center justify-center h-screen dark:bg-zinc-900">

                <Post></Post>
                <br></br>
            </div>
        </div>

    );

}

