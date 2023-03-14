import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import logo from "../../shared/logo.png"
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactCardFlip from 'react-card-flip';

import Upvote from "react-upvote/lib/ReactUpvote";
import {Rate} from "./Rate.js";
import axios from "axios";
import postService from '../../service/postService';
import {motion} from "framer-motion";
import PostService from "../../service/postService";

export function Post() {

  const [post, setPost] = useState([]);
  const [agreePost, setAgreePost] = useState([]);
  const [disagreePost, setDisagreePost] = useState([]);
  const [upvote, setUpvote] = useState([]);
  const [downvote, setDownvote] = useState([]);
  const [text, setText] = useState([]);
  const [reason, setReason] = useState([]);
  const [isClicked,setIsClicked] = useState(false);


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

  }, [isClicked])

  const handleDelete = async (id) => {

    try {
      await PostService.DeletePost(id).then(
        (response) => {
          setIsClicked(!isClicked)
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
  };


  return (
    <motion.div initial={{opacity: 0, scale: 0.5}}
                animate={{opacity: 1, scale: 1}}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0, 0.71, 0.2, 1.01]
                }} className="w-96 pb-8 ">

      {reason.map((item) => <div key={item._id}
                                 className={`hover:scale-110 border-2 border-gray-200 rounded-md mb-8 ${item.opinion === "agree" ? "dark:bg-zinc-800 dark:border-zinc-700 dark:shadow-md dark:shadow-pink-800/80" : "dark:bg-zinc-800 dark:border-zinc-700 dark:shadow-2xl dark:shadow-blue-800/80"}`}>
        <a href="#"
           className="block max-w-sm p-6 b h-64  ">
          <p className="font-bold text-gray-700 dark:text-white">{item.text} {item.upvoteCount}
          </p>
        </a>
        <div className="inset-x-0 bottom-1 ">
          <hr className="dark:border-gray-900 pt-2"></hr>
          <Rate upvoteCount={item.upvoteCount} votes={item.votes} id={item._id} post={item}
                downvoteCount={item.downvoteCount}   deleteFun={(id) => handleDelete(id)}
          ></Rate>


        </div>


      </div>)}
    </motion.div>

  );
}
