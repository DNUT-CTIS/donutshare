import React, {useEffect, useRef, useState} from 'react';
import {motion} from "framer-motion";
import PostService from "../../service/postService";
import {useNavigate} from "react-router-dom";
import socket from "../../socket/socket";

export function LeftModal() {


  const handleModalClose = () => {

  };
  return (
    <motion.div className="w-[600px] h-[500px]">
      <div className="flex justify-between items-center">
        <p>Opponent has left the chat</p>
      </div>
    </motion.div>

  )
}
