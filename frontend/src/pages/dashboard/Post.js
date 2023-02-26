import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from "../../shared/logo.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactCardFlip from 'react-card-flip';
import Upvote from "react-upvote/lib/ReactUpvote";
import {Rate} from "./Rate.js";
import axios from "axios";

export function Post() {

    const [post, setPost] = useState([]);
    const [upvote, setUpvote] = useState([]);
    const [downvote, setDownvote] = useState([]);
    const [text, setText] = useState([]);
    const [reason, setReason] = useState([]);

    useEffect(() => {
        axios.get('https://donutshare-api.onrender.com/api/post/').then((res) => {
            res.data.posts.map((item) => {
                if (item) {

                }
            });
            setPost(res.data.posts.map((post) => post.text));
            setReason(res.data.posts.map((post) => post));


        }).catch((error) => {
            console.error(error);
        });

    }, [])

    const handleClick = (e) => {
        e.preventDefault();
    };


    return (
        <div className="w-96">
            {reason.map((item) => <div key={item._id}>
                <a  href="#"
                   className="block max-w-sm p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-pink-800 dark:border-gray-700 dark:hover:bg-pink-700">
                    <p className="font-bold text-gray-700 dark:text-white">{item.text} {item.upvoteCount}
                    </p>
                    <hr className="dark:border-gray-900"></hr>
                    <Rate upvoteCount={item.upvoteCount} id={item._id}></Rate>
                </a>
            </div>)}
        </div>

    );
}
