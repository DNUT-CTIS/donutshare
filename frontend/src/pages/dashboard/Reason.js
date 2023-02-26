import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from "../../shared/logo.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactCardFlip from 'react-card-flip';
import Upvote from "react-upvote/lib/ReactUpvote";
import {Rate} from "./Rate.js";
import axios from "axios";

export function Reason() {
    const [isFlipped, setIsFlipped] = useState(false);
    const [post, setPost] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/post/').then((res) => {
            setPost(res.data.posts.map((post) => post.text));
        }).catch((error) => {
            console.error(error);
        });

    }, [])

    const handleClick = (e) => {
        e.preventDefault();
        setIsFlipped(!isFlipped);
    };


    return (

        <div className="w-96">

            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">

                <div>
                <a href="frontend/src/pages/dashboard/Reason#"
                   className="block max-w-sm p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-pink-800 dark:border-gray-700 dark:hover:bg-pink-700">
                    <p onClick={handleClick} className="font-bold text-gray-700 dark:text-white">Here are the biggest enterprise
                        </p>
                    <hr className="dark:border-gray-900"></hr>
                    <Rate></Rate>
                </a>
                </div>
                <div>
                    <a href="frontend/src/pages/dashboard/Reason#"
                       className="block max-w-sm p-6  border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-blue-800 dark:border-gray-700 dark:hover:bg-blue-700">
                        <p onClick={handleClick} className="font-bold text-gray-700 dark:text-white">Here are the biggest enterprise
                            technology acquisitions of 2021 so far, in reverse chronological order.
                            Here are the biggest enterprise
                            technology acquisitions of 2022 so far, in reverse chronological order
                            Here are the biggest enterprise
                            technology acquisitions of 2021 so far, in reverse chronological order
                            Here are the biggest enterprise
                            technology acquisitions of 2021 so far, in reverse chronological order</p>
                        <hr className="dark:border-gray-900"></hr>
                        <Rate></Rate>
                    </a>
                </div>
            </ReactCardFlip>
        </div>

    );
}
