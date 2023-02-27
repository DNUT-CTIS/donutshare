import React, {useEffect, useState} from 'react';
import {Link, Navigate, useNavigate} from "react-router-dom";
import logo from "../../shared/logo.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactCardFlip from 'react-card-flip';
import Upvote from "react-upvote/lib/ReactUpvote";
import {Rate} from "../dashboard/Rate.js";
import {Reason} from "../dashboard/Reason";
import {Navbar} from "../../shared/Navbar";
import AuthService from "../../service/authService";
import PostService from "../../service/postService";

export function SendPost() {

    const [txt, setTxt] = useState("");


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
            <Navbar></Navbar>
        </div>

    );

}

