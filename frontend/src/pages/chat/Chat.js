<<<<<<< HEAD
<<<<<<< HEAD
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {Navbar} from "../../shared/Navbar";

export function Chat() {
=======
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import socket from "../../socket/socket";
import classNames from "classnames";
import {Navbar} from "../../shared/Navbar"
import Avatar from "avataaars";
import donutStatic from '../dashboard/donut.jpg';
import {RandomName} from "../dashboard/RandomName";
import donutBackground from "./donut_patern.png";
import ModalContainer from "../../shared/ModalContainer";
import {generateRandomAvatarOptions} from '../dashboard/randomAvatar';
import {PostModal} from "./PostModal";
import {useNavigate} from "react-router-dom";

const Chat = ({ match }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [user, setUser] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [opinion, setOpinion] = useState("");
  const navigate = useNavigate();
>>>>>>> 014a619cf2d6eb698c2e5a9fa7be261e7a8b4fa2

  const messagesEndRef = useRef(null)

<<<<<<< HEAD

    return (
      <div>
        <Navbar></Navbar>
        <div className="flex h-screen antialiased text-gray-800">
          <div className="flex flex-row h-full w-full overflow-x-hidden">
            {/*<div className="flex flex-col flex-auto h-full p-6">*/}
            {/*  <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white dark:bg-zinc-800 flex-shrink-0 rounded-2xl">*/}
            {/*    <div className="flex flex-row items-center justify-center h-12 w-full">*/}
            {/*      <div*/}
            {/*        className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10"*/}
            {/*      >*/}
            {/*        <svg*/}
            {/*          className="w-6 h-6"*/}
            {/*          fill="none"*/}
            {/*          stroke="currentColor"*/}
            {/*          viewBox="0 0 24 24"*/}
            {/*          xmlns="http://www.w3.org/2000/svg"*/}
            {/*        >*/}
            {/*          <path*/}
            {/*            stroke-linecap="round"*/}
            {/*            stroke-linejoin="round"*/}
            {/*            stroke-width="2"*/}
            {/*            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"*/}
            {/*          ></path>*/}
            {/*        </svg>*/}
            {/*      </div>*/}
            {/*      <div className="ml-2 font-bold text-2xl">QuickChat</div>*/}
            {/*    </div>*/}
            {/*    <div*/}
            {/*      className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg"*/}
            {/*    >*/}
            {/*      <div className="h-20 w-20 rounded-full border overflow-hidden">*/}
            {/*        <img*/}
            {/*          src="https://avatars3.githubusercontent.com/u/2763884?s=128"*/}
            {/*          alt="Avatar"*/}
            {/*          className="h-full w-full"*/}
            {/*        />*/}
            {/*      </div>*/}
            {/*      <div className="text-sm font-semibold mt-2">Aminos Co.</div>*/}
            {/*      <div className="text-xs text-gray-500">Lead UI/UX Designer</div>*/}
            {/*      <div className="flex flex-row items-center mt-3">*/}
            {/*        <div*/}
            {/*          className="flex flex-col justify-center h-4 w-8 bg-indigo-500 rounded-full"*/}
            {/*        >*/}
            {/*          <div className="h-3 w-3 bg-white rounded-full self-end mr-1"></div>*/}
            {/*        </div>*/}
            {/*        <div className="leading-none ml-1 text-xs">Active</div>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*    <div className="flex flex-col mt-8">*/}
            {/*      <div className="flex flex-row items-center justify-between text-xs">*/}
            {/*        <span className="font-bold">Active Conversations</span>*/}
            {/*        <span*/}
            {/*          className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full"*/}
            {/*        >4</span*/}
            {/*        >*/}
            {/*      </div>*/}
            {/*      <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">*/}
            {/*        <button*/}
            {/*          className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"*/}
            {/*        >*/}
            {/*          <div*/}
            {/*            className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full"*/}
            {/*          >*/}
            {/*            H*/}
            {/*          </div>*/}
            {/*          <div className="ml-2 text-sm font-semibold">Henry Boyd</div>*/}
            {/*        </button>*/}
            {/*        <button*/}
            {/*          className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"*/}
            {/*        >*/}
            {/*          <div*/}
            {/*            className="flex items-center justify-center h-8 w-8 bg-gray-200 rounded-full"*/}
            {/*          >*/}
            {/*            M*/}
            {/*          </div>*/}
            {/*          <div className="ml-2 text-sm font-semibold">Marta Curtis</div>*/}
            {/*          <div*/}
            {/*            className="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none"*/}
            {/*          >*/}
            {/*            2*/}
            {/*          </div>*/}
            {/*        </button>*/}
            {/*        <button*/}
            {/*          className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"*/}
            {/*        >*/}
            {/*          <div*/}
            {/*            className="flex items-center justify-center h-8 w-8 bg-orange-200 rounded-full"*/}
            {/*          >*/}
            {/*            P*/}
            {/*          </div>*/}
            {/*          <div className="ml-2 text-sm font-semibold">Philip Tucker</div>*/}
            {/*        </button>*/}
            {/*        <button*/}
            {/*          className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"*/}
            {/*        >*/}
            {/*          <div*/}
            {/*            className="flex items-center justify-center h-8 w-8 bg-pink-200 rounded-full"*/}
            {/*          >*/}
            {/*            C*/}
            {/*          </div>*/}
            {/*          <div className="ml-2 text-sm font-semibold">Christine Reid</div>*/}
            {/*        </button>*/}
            {/*        <button*/}
            {/*          className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"*/}
            {/*        >*/}
            {/*          <div*/}
            {/*            className="flex items-center justify-center h-8 w-8 bg-purple-200 rounded-full"*/}
            {/*          >*/}
            {/*            J*/}
            {/*          </div>*/}
            {/*          <div className="ml-2 text-sm font-semibold">Jerry Guzman</div>*/}
            {/*        </button>*/}
            {/*      </div>*/}
            {/*      <div className="flex flex-row items-center justify-between text-xs mt-6">*/}
            {/*        <span className="font-bold">Archivied</span>*/}
            {/*        <span*/}
            {/*          className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full"*/}
            {/*        >7</span*/}
            {/*        >*/}
            {/*      </div>*/}
            {/*      <div className="flex flex-col space-y-1 mt-4 -mx-2">*/}
            {/*        <button*/}
            {/*          className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"*/}
            {/*        >*/}
            {/*          <div*/}
            {/*            className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full"*/}
            {/*          >*/}
            {/*            H*/}
            {/*          </div>*/}
            {/*          <div className="ml-2 text-sm font-semibold">Henry Boyd</div>*/}
            {/*        </button>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</div>*/}
=======
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "start"});
  }
  useEffect(() => {

    socket.on("connect", () => {
      console.log("this is chat");
      console.log(`Connected to server with ID ${socket.id}`);
    });
>>>>>>> 014a619cf2d6eb698c2e5a9fa7be261e7a8b4fa2

    socket.on("chatMessage", (message) => {
      setMessages((messages) => [...messages, message]);

    });

    socket.on("leaveChat", () => {
      console.log("Disconnected from server");
    });
    scrollToBottom()

    return () => {
      socket.off("connect");
      socket.off("chatMessage");
      socket.off("leaveChat");
    };


  }, [messages]);

  const handleInputChange = useCallback((event) => {
    setInputValue(event.target.value);
  }, []);

  const handleModalClose = () => {

    socket.on("leaveChat", () => {
      console.log("Disconnected from server");
    });
    setIsModalOpen(false);
    navigate("/dashboard");
  };

  const handleWithdrawClick = () => {
    socket.emit("withdrawChat");
    setIsModalOpen(true);
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    const message = inputValue.trim();
    if (message !== "") {
      setInputValue("");
      socket.emit("chatMessage", message);
    }
  };
  socket.on("withdrawChat", (side)=>{
    setOpinion(side);
    setIsModalOpen(true);
  });

  const avatarOptions = useMemo(() => generateRandomAvatarOptions(), []);

  const randomName = useMemo(() => <RandomName />, []);

  return (
    <div>
      <ModalContainer isOpen={isModalOpen}>
        {console.log(opinion)}
        <PostModal side={opinion}></PostModal>
        <button>SUBmit</button>
      </ModalContainer>

      <div className="flex flex-row dark:bg-zinc-700">
        <div className="dark:bg-zinc-800 h-screen flex flex-col w-2/4 dark:text-white">
          <div className="text-center text-xl font-extrabold my-6">Your Match</div>
          <div className="mx-auto text-center">
            <Avatar className="rounded-full dark:bg-zinc-700 my-6 ml-10"
                    {...avatarOptions}></Avatar>
            {randomName}
            <button className="bg-pink-600 text-black active:bg-pink-800
        font-bold my-6 px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-32 mb-1" onClick={handleWithdrawClick}>Withdraw</button>
            <button className="bg-pink-600 text-black active:bg-pink-800
        font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1">Report</button>
          </div>
          <div className="text-center mx-auto my-16">
            <p className="font-extrabold text-xl">Todays donut</p>
            <h2>
              Burası contexlen passlanır heralde
              <img src={donutStatic} alt=""/>

            </h2>
          </div>

        </div>
        <div className="bg-white dark:bg-zinc-900 w-screen h-screen flex flex-col"
             style={{ backgroundImage: `url(${donutBackground})` }}
        >
          <div className="flex-1 overflow-y-scroll p-4"
          >
            {messages.map((message, index) => {
              const username = JSON.parse(localStorage.getItem("username"))

              const isSentByCurrentUser = username === message.username;
              console.log(isSentByCurrentUser);
              console.log(message.username);
              const messageClass = classNames({
                "my-2 p-2 rounded-md bg-gray-200  dark:text-white text-base max-w-xs break-words": true,
                "ml-auto": isSentByCurrentUser,
                "dark:bg-pink-900": isSentByCurrentUser,
                "dark:bg-zinc-700": !isSentByCurrentUser,
                "mr-auto": !isSentByCurrentUser,
              });

              return (
                <div key={index} className="flex"
                >
                  <div className={messageClass}    ref={messagesEndRef}>
                    <p>{message.message}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <form onSubmit={handleSendMessage} className="flex dark:bg-zinc-800 items-center p-4">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type a message"
              className="flex-1 rounded-full dark:bg-zinc-700 dark:text-white dark:focus:border-pink-700 border-gray-600 px-4 py-2 mr-2"
            />
            <button
              type="submit"
              className="bg-pink-500 rounded-full text-white font-medium px-4 py-2"
            >
              Send
            </button>
          </form>
        </div>
      </div>
<<<<<<< HEAD
=======
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import socket from "../../socket/socket";
import classNames from "classnames";
import {Navbar} from "../../shared/Navbar"
import Avatar from "avataaars";
import donutStatic from '../dashboard/donut.jpg';
import {RandomName} from "../dashboard/RandomName";
import donutBackground from "./donut_patern.png";
import ModalContainer from "../../shared/ModalContainer";
import {generateRandomAvatarOptions} from '../dashboard/randomAvatar';
import {PostModal} from "./PostModal";
import {useNavigate} from "react-router-dom";
import Peer from "peerjs";




const Chat = ({ match }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [user, setUser] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [opinion, setOpinion] = useState("");
  const navigate = useNavigate();
  const messagesEndRef = useRef(null)
  const peer = new Peer()
 

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "start"});
  }
  useEffect(() => {
    socket.on("connect", () => {
      console.log("this is chat");
      console.log(`Connected to server with ID ${socket.id}`);
    });

let audioConnection = null;
let audioStream = null;
let destPeer = null;
let call = null;

peer.on("open", (peerId) => {
  console.log(`Connected to peer server with ID ${peerId}`);
  socket.emit("peer-connection", peer.id);
});

socket.on("peer-bond", async (destPeerId) => {
  console.log("opponents peer id: " + destPeerId);

  audioConnection = peer.connect(destPeerId);
  audioConnection.on("open", async () => {
    console.log("Connected to remote-peer-id!");

    // Save the destination peer ID
    destPeer = destPeerId;
  });
});

const pushToTalkButton = document.getElementById("push-to-talk");

pushToTalkButton.addEventListener("click", async () => {
  // Get the user's audio stream
  audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });

  // Create a new PeerJS MediaConnection for the audio stream
  call = peer.call(destPeer, audioStream);

  // Play the audio stream from the other peer when it's received
  call.on("stream", (stream) => {
    const audioElement = document.createElement("audio");
    audioElement.srcObject = stream;
    audioElement.play();
  });
});

peer.on("call", function (incomingCall) {
  // Answer the call, providing our mediaStream
  incomingCall.answer(audioStream);

  // Enable audio track
  audioStream.getAudioTracks()[0].enabled = true;

  // Play the audio stream from the other peer when it's received
  incomingCall.on("stream", (stream) => {
    const audioElement = document.createElement("audio");
    audioElement.srcObject = stream;
    audioElement.play();
  });
});

    socket.on("chatMessage", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("leaveChat", () => {
      console.log("Disconnected from server");
    });
    scrollToBottom();

    return () => {
      socket.off("connect");
      socket.off("chatMessage");
      socket.off("leaveChat");
    };
  }, [messages]);

  const handleInputChange = useCallback((event) => {
    setInputValue(event.target.value);
  }, []);

  const handleModalClose = () => {

    socket.on("leaveChat", () => {
      console.log("Disconnected from server");
    });
    setIsModalOpen(false);
    navigate("/dashboard");
  };

  const handleWithdrawClick = () => {
    socket.emit("withdrawChat");
    setIsModalOpen(true);
  };
>>>>>>> aleren-v2

  const handleSendMessage = (event) => {
    event.preventDefault();
    const message = inputValue.trim();
    if (message !== "") {
      setInputValue("");
      socket.emit("chatMessage", message);
    }
  };
  socket.on("withdrawChat", (side)=>{
    setOpinion(side);
    setIsModalOpen(true);
  });

<<<<<<< HEAD

    );

}
=======
  const avatarOptions = useMemo(() => generateRandomAvatarOptions(), []);

  const randomName = useMemo(() => <RandomName />, []);

  return (
    <div>
      <ModalContainer isOpen={isModalOpen}>
        {console.log(opinion)}
        <PostModal side={opinion}></PostModal>
        <button>SUBmit</button>
      </ModalContainer>

      <div className="flex flex-row dark:bg-zinc-700">
        <div className="dark:bg-zinc-800 h-screen flex flex-col w-2/4 dark:text-white">
          <div className="text-center text-xl font-extrabold my-6">
            Your Match
          </div>
          <div className="mx-auto text-center">
            <Avatar
              className="rounded-full dark:bg-zinc-700 my-6 ml-10"
              {...avatarOptions}
            ></Avatar>
            {randomName}
            <button
              className="bg-pink-600 text-black active:bg-pink-800
        font-bold my-6 px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-32 mb-1"
              onClick={handleWithdrawClick}
            >
              Withdraw
            </button>
            <button
              className="bg-pink-600 text-black active:bg-pink-800
        font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1"
            >
              Report
            </button>
          </div>
          <div className="text-center mx-auto my-16">
            <p className="font-extrabold text-xl">Todays donut</p>
            <h2>
              Burası contexlen passlanır heralde
              <img src={donutStatic} alt="" />
            </h2>
          </div>
        </div>
        <div
          className="bg-white dark:bg-zinc-900 w-screen h-screen flex flex-col"
          style={{ backgroundImage: `url(${donutBackground})` }}
        >
          <div className="flex-1 overflow-y-scroll p-4">
            {messages.map((message, index) => {
              const username = JSON.parse(localStorage.getItem("username"));

              const isSentByCurrentUser = username === message.username;
              console.log(isSentByCurrentUser);
              console.log(message.username);
              const messageClass = classNames({
                "my-2 p-2 rounded-md bg-gray-200  dark:text-white text-base max-w-xs break-words": true,
                "ml-auto": isSentByCurrentUser,
                "dark:bg-pink-900": isSentByCurrentUser,
                "dark:bg-zinc-700": !isSentByCurrentUser,
                "mr-auto": !isSentByCurrentUser,
              });

              return (
                <div key={index} className="flex">
                  <div className={messageClass} ref={messagesEndRef}>
                    <p>{message.message}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <form
            onSubmit={handleSendMessage}
            className="flex dark:bg-zinc-800 items-center p-4"
          >
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type a message"
              className="flex-1 rounded-full dark:bg-zinc-700 dark:text-white dark:focus:border-pink-700 border-gray-600 px-4 py-2 mr-2"
            />
<button id="push-to-talk">voice</button>
            <button
              type="submit"
              className="bg-pink-500 rounded-full text-white font-medium px-4 py-2"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
>>>>>>> aleren-v2

=======


    </div>
  );
};

export default Chat;
>>>>>>> 014a619cf2d6eb698c2e5a9fa7be261e7a8b4fa2
