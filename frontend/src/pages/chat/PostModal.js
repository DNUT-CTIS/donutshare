import React, {useEffect, useRef, useState} from 'react';
import {motion} from "framer-motion";
import PostService from "../../service/postService";
import {useNavigate} from "react-router-dom";
import socket from "../../socket/socket";

export function PostModal({side}) {

  const [txt, setTxt] = useState("");

  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const [opinion,setOpinion] = useState("");


  useEffect(() => {
    const data = localStorage.getItem('username');
    console.log("pp",side)
    console.log("pp",side.side)

    if (data) {
      setUsername(JSON.parse(data));
    }
  }, []);
  const submitPost = async (event) => {
    event.preventDefault()
    if (side.side === "Agree")
    {
      setOpinion("agreee")
    } else {
      setOpinion("disagree")
    }
    try {
      await PostService.sendPost(username , txt, side.side).then(
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


    socket.on("leaveChat", () => {
      console.log("Disconnected from server");
    });
    navigate("/dashboard");
  };

  const handleModalClose = () => {

  };
  return (

    <motion.div className="w-[600px] h-[300px]">
      <p className="animate-pulse mx-auto text-center dark:text-white text-2xl">Please post a reason</p>
      <div className="flex justify-center">
        <form onSubmit={submitPost} className="flex dark:bg-zinc-800 items-start flex-col p-4">
        <textarea
          type="text"
          rows={4}
          onChange={(e) => setTxt(e.target.value)}
          placeholder="Type a reason"
          className="rounded-lg dark:bg-zinc-700 dark:text-white dark:focus:border-pink-700 border-gray-600 w-[500px] mb-2"
          style={{ height: "200px" }}
        />

          <button
            type="submit"
            className="bg-pink-500 rounded-full text-white font-medium px-4 py-2 mx-auto"
          >
            Send
          </button>
        </form>
      </div>
    </motion.div>


  )
}
