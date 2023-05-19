import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
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
import postService from "../../service/postService";
import {WarningModal} from "../../shared/WarningModal";
import PostService from "../../service/postService";




const Chat = ({ match }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [user, setUser] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [opinion, setOpinion] = useState("");
  const navigate = useNavigate();
  const messagesEndRef = useRef(null)
  const peer = new Peer()

  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);

  const username = JSON.parse(localStorage.getItem("username"));

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

      const isSentByCurrentUser = username === message.username;
      if (!isSentByCurrentUser) {
        setUser(message.username);
      }
      console.log(user);
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


    const handleReportClick = async (event) => {
      event.preventDefault()
      try {
        await PostService.reportUser(user , "yes", "user" ).then(
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

      <ModalContainer isOpen={isWarningModalOpen}>
        <WarningModal></WarningModal>
        <button></button>
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
            onClick={handleReportClick} >
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

            <button id="push-to-talk" className="bg-pink-500 rounded-full text-white font-medium px-2 py-2 mx-2">
              <svg fill="none" stroke="currentColor" className="w-6 h-6" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"></path>
              </svg>
            </button>

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

export default Chat;
