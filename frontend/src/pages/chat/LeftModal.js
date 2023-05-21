import React, {useEffect, useRef, useState} from 'react';
import {motion} from "framer-motion";
import PostService from "../../service/postService";
import {useNavigate} from "react-router-dom";
import socket from "../../socket/socket";

export function LeftModal() {

  const navigate = useNavigate();

  const handleModalClose = () => {

  };


  const handleNavigateClick = () => {
    navigate("/dashboard");
  };

  return (
    <motion.div className="w-[500px] h-[100px] flex flex-col justify-center items-center">
      <div className="flex flex-col items-center">
        <p className="text-white text-2xl">Opponent has disconnected from the chat</p>
        <button onClick={handleNavigateClick} className="bg-pink-500 rounded-full text-white font-medium px-4 py-2 mt-4">Go To Dashboard</button>
      </div>
    </motion.div>


  )
}
