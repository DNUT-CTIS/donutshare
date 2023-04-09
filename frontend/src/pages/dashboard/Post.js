import React, {useEffect, useState} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {Rate} from "./Rate.js";
import axios from "axios";
import PostService from '../../service/postService';
import {motion} from "framer-motion";
import Avatar from 'avataaars';
import {generateRandomAvatarOptions} from './randomAvatar';
import {RandomName} from "./RandomName";
import donutImage from "./donut.png";


export function Post() {

  const [post, setPost] = useState([]);
  const [agreePost, setAgreePost] = useState([]);
  const [disagreePost, setDisagreePost] = useState([]);
  const [upvote, setUpvote] = useState([]);
  const [downvote, setDownvote] = useState([]);
  const [text, setText] = useState([]);
  const [reason, setReason] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showRate, setShowRate] = useState(true);


  useEffect(() => {
    setLoading(true);

    axios.get('https://donutshare-api.onrender.com/api/post/').then((res) => {
      res.data.posts.map((item) => {
        if (item) {

        }
      });
      setPost(res.data.posts.map((post) => post.text));
      setReason(res.data.posts.map((post) => post));

      setLoading(false);

    }).catch((error) => {
      console.error(error);
    });

  }, [isClicked])

  const token = localStorage.getItem("token");

  const handleDelete = async (id) => {

    try {
      await PostService.deletePost(id).then(
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
    <div>
      {loading && <img className="py-16 mx-auto" src={donutImage}/>
      }
      <div className="mx-auto sm:w-[700px] w-[350px]">
      <motion.div initial={{opacity: 0, scale: 0.5}}
                  animate={{opacity: 1, scale: 1}}
                  transition={{
                    duration: 0.8,
                    delay: 0.5,
                    ease: [0, 0.71, 0.2, 1.01]
                  }} className="">
        {reason.map((item) => <div key={item._id} className="">
          <div className="flex flex-row border rounded-md shadow shadow-xl dark:bg-zinc-800 dark:border-zinc-700">
            <div className="w-12 sm:w-fit flex flex-col gap-4 mx-8 my-4 items-center">
              <Avatar className="rounded-full dark:bg-zinc-700 w-16 h-16 sm:w-32 sm:h-32"
                {...generateRandomAvatarOptions(item._id)} />
              <RandomName seed={item._id} user={item.user} username={item.username}></RandomName>
              {token && <Rate upvoteCount={item.upvoteCount} votes={item.votes} id={item._id} post={item}
                     downvoteCount={item.downvoteCount} deleteFun={(id) => handleDelete(id)}
              ></Rate>}
            </div>
            <div className="gap-4 mx-4 my-5">
              <span
                className={`inline-block px-2 py-1 leading-none rounded-full font-semibold uppercase tracking-wide text-xs ${item.opinion === 'Agree' ? 'bg-blue-500 ' : 'bg-pink-500 '}`}>
                {item.opinion}
              </span>
              <p className="max-h-60 overflow-y-scroll my-2 dark:text-white">{item.text}</p>
            </div>
          </div>
          <br/>
        </div>)}
      </motion.div>
    </div>
    </div>
  );
}
