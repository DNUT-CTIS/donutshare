import React, {useEffect, useState} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import PostService from "../../service/postService";
import ReportModal from "../../shared/ReportModal";
import {toast} from "react-toastify";
import {motion} from "framer-motion";


export function Rate(props) {

  const [likeCount, setLikeCount] = useState(props.upvoteCount);
  const userData = JSON.parse(localStorage.getItem("userType"))
  const username = JSON.parse(localStorage.getItem("username"))
  const [dislikeCount, setDislikeCount] = useState(props.downvoteCount);
  const [id, setId] = useState(props.id);
  const [activeBtn, setActiveBtn] = useState("none");

  //const [upvotes, setUpvotes] = useState(post.upvotes);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  useEffect(() => {
    console.log(props.votes)
    if (username) {
      const vote = Object.values(props.votes).find(
        (vote) => vote.username === username
      );
      console.log(vote)
      if (vote && vote.rate === "upvote") {
        setActiveBtn("like");
      } else if (vote && vote.rate === "downvote") {
        setActiveBtn("dislike");
      }
    }

    //const userHasUpvoted = post.upvoters.includes(userId);
    //setHasUpvoted(userHasUpvoted);
  }, [props.post]);

  /* const handleDelete = async (event) => {
       event.preventDefault()
       console.log(event)
       try {
          await PostService.deletePost(id).then(
               (response) => {

               },
               (error) => {
                   console.log(error);
               }
           );
       } catch (err) {
           console.log(err);
       }
   };*/
  const handleDelete = () => {
    // call the delete function passed as prop
    console.log(props.id)
    props.deleteFun(props.id);
  };

  const upvotePost = async (event) => {
    event.preventDefault()
    try {
      await PostService.upvotePost(id).then(
        (response) => {
          // check for token and user already exists with 200
          //   console.log("Sign up successfully", response);


        },
        (error) => {
          toast.error(error.response.data.message)
          console.log(error);
        }
      );
    } catch (err) {
      return;
      console.log(err);
    }
    if (activeBtn === "none") {

      setLikeCount(likeCount + 1);
      setActiveBtn("like");
      return;
    }

    if (activeBtn === 'like') {
      setLikeCount(likeCount - 1);
      setActiveBtn("none");
      return;
    }

    if (activeBtn === "dislike") {
      setLikeCount(likeCount + 1);
      setDislikeCount(dislikeCount - 1);
      setActiveBtn("like");
    }

  };

  const downvotePost = async (event) => {
    event.preventDefault()
    try {
      await PostService.downvotePost(id).then(
        (response) => {
          // check for token and user already exists with 200
          //   console.log("Sign up successfully", response);


        },
        (error) => {
          toast.error(error.response.data.message)
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }

    if (activeBtn === "none") {

      setDislikeCount(dislikeCount + 1)
      setActiveBtn("dislike");
      return;
    }

    if (activeBtn === 'dislike') {
      setDislikeCount(dislikeCount - 1);
      setActiveBtn("none");
      return;
    }

    if (activeBtn === "like") {
      setDislikeCount(dislikeCount + 1);
      setLikeCount(likeCount - 1);
      setActiveBtn("dislike");
    }

  };

  return (
    <div className="container top-100">
      <div className="btn-container">
        <motion.button
          whileTap={{
            scale: 0.8,
          }}
          className={`btn ${activeBtn === "like" ? "like-active" : ""}`}
          onClick={upvotePost}
        >
          <div style={{display: 'flex', alignItems: 'center'}}>
            {activeBtn !== "like" ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6 fill-blue-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
              </svg>)}
            <span style={{marginLeft: '4px'}} className="dark:text-white">{likeCount}</span>
          </div>
        </motion.button>

        <motion.button
          whileTap={{
            scale: 0.8,
          }}
          className={`btn ${activeBtn === "dislike" ? "dislike-active" : ""}`}
          onClick={downvotePost}
        >
          <div style={{display: 'flex', alignItems: 'center'}}>
            {activeBtn !== "dislike" ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6 fill-pink-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384" />
              </svg>

            )}
            <span style={{marginLeft: '4px'}} className="dark:text-white">{dislikeCount}</span>
          </div>
        </motion.button>

        <ReportModal id={props.id}></ReportModal>
        {userData === "moderator" ? (
          <motion.button
            whileTap={{
              scale: 0.8,
            }} onClick={handleDelete}>
            <div style={{display: 'flex', alignItems: 'center', right: 0}}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>

            </div>


          </motion.button>
        ) : ""}


      </div>


    </div>


  );
}
