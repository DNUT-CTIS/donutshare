import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from "../shared/logo.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactCardFlip from 'react-card-flip';
import Upvote from "react-upvote/lib/ReactUpvote";
import {Rate} from "./Rate.js";
import {Reason} from "./Reason";
import {Navbar} from "../shared/Navbar";

export function Home() {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        setIsFlipped(!isFlipped);
    };



    return (
<div>
        <Navbar></Navbar>
        <div className="flex flex-col items-center justify-center h-screen dark:bg-zinc-900">

            <Reason></Reason>
            <br></br>
            <Reason></Reason>
        </div>
</div>

    );
}
