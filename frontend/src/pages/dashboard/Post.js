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

  const [reason, setReason] = useState([]);
  const [showModal,setShowModal] = useState(false)
  const [isClicked, setIsClicked] = useState(false);
  const [deletedPost,setdeletedPost]=useState("")
  const [loading, setLoading] = useState(false);
  const [response,setResponse]=useState([])


  useEffect(() => {
    setLoading(true);

    axios.get('https://donutshare-api.onrender.com/api/post/').then((res) => {
    console.log(res.data.posts)
      
    setResponse(res.data.posts)
      res.data.posts.map((item) => {
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
  {loading && <img className="py-16 mx-auto" src={donutImage}/>}
  
  <div className="mx-auto sm:w-[700px] w-[350px]">
    <motion.div initial={{opacity: 0, scale: 0.5}}
                animate={{opacity: 1, scale: 1}}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0, 0.71, 0.2, 1.01]
                }} className="">
      {response.length === 0 ? (
 
 <h1 class="text-center text-3xl font-extrabold text-white py-8">No debate for this proposition yet choose a side and be ready for first debate!</h1>
    
      ) : (
        reason.map((item) => (
          <div key={item._id} className="">
            <div className="flex flex-row border rounded-md shadow shadow-xl dark:bg-zinc-800 dark:border-zinc-700">
              <div className="w-12 sm:w-fit flex flex-col gap-4 mx-8 my-4 items-center">
                <Avatar className="rounded-full dark:bg-zinc-700 w-16 h-16 sm:w-32 sm:h-32"
                  {...generateRandomAvatarOptions(item._id)} />
                <RandomName seed={item._id} user={item.user} username={item.username}></RandomName>
                {token && <Rate upvoteCount={item.upvoteCount} votes={item.votes} id={item._id} post={item}
                      downvoteCount={item.downvoteCount} deleteFun={(id) => {setdeletedPost(id); setShowModal(true)}}
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
          </div>
        ))
      )}
    </motion.div>
  </div>
  {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                      "Are you sure you want to delete this post ?"
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {setShowModal(false)}}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {handleDelete(deletedPost);setShowModal(false);}}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
</div>
  );
}
