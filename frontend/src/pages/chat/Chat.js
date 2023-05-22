import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import socket from "../../socket/socket";
import classNames from "classnames";
import { Navbar } from "../../shared/Navbar";
import Avatar from "avataaars";
import donutStatic from "../dashboard/donut.jpg";
import { RandomName } from "../dashboard/RandomName";
import donutBackground from "./donut_patern.png";
import ModalContainer from "../../shared/ModalContainer";
import { generateRandomAvatarOptions } from "../dashboard/randomAvatar";
import { PostModal } from "./PostModal";
import { useNavigate } from "react-router-dom";
import Recorder from "mic-recorder-to-mp3";
import postService from "../../service/postService";
import {WarningModal} from "../../shared/WarningModal";
import PostService from "../../service/postService";
import {LeftModal} from "./LeftModal"
import topicService from "../../service/topicService";

const recorder = new Recorder({ bitRate: 128, sampleRateHertz: 44100 });

const Chat = ({ match }) => {
  const [messages, setMessages] = useState([]);
  const [topic, setTopic] = useState('');
  const [inputValue, setInputValue] = useState("");
  const [user, setUser] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLeftModalOpen, setIsLeftModalOpen] = useState(false);
  const [opinion, setOpinion] = useState("");
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);

  const username = JSON.parse(localStorage.getItem("username"));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  useEffect(() => {
    try {
      topicService.getCurrentTopic().then(
        (response) => {
          // check for token and user already exists with 200
          //   console.log("Sign up successfully", response);
          //    console.log(response.userArr)
          setTopic(response.topic)
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {

      console.log(err);
    }

    socket.on("connect", () => {
      console.log("this is chat");
      console.log(`Connected to server with ID ${socket.id}`);
    });

    socket.on("chatMessage", (message) => {
      setMessages((messages) => [...messages, message]);

      if (message.username === "System") {
        setIsLeftModalOpen(true);
      }
      const isSentByCurrentUser = username === message.username;
      if (!isSentByCurrentUser) {
        setUser(message.username);
      }
    });

    socket.on("processedAudio", (data) => {
      console.log("got the audio")
      playAudioStream(data, -6);
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

  const handlePushToTalk = async () => {

    if (!isRecording) {
      setIsRecording(true);
      recorder.start();
    } else {
      setIsRecording(false);
      const [buffer, blob] = await recorder.stop().getMp3();
      sendAudioData(blob, buffer);
    }
  };


  const sendAudioData = (data, buffer) => {
    socket.emit("audioData", { audioData: data, audioBuffer: buffer });
  };

  const playAudioStream = (data, pitchShift) => {
    const audioContext = new AudioContext();
    const audioSource = audioContext.createBufferSource();
    audioContext.decodeAudioData(data, (buffer) => {
      audioSource.buffer = buffer;

      // Apply pitch shift
      const detuneValue = pitchShift * 100; // Adjust the pitch shift value as needed
      audioSource.detune.value = detuneValue;

      audioSource.connect(audioContext.destination);
      audioSource.start();
    });
  };


  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

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
  socket.on("withdrawChat", (side) => {
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
      </ModalContainer>

      <ModalContainer isOpen={isWarningModalOpen}>
        <WarningModal></WarningModal>
        <button></button>
      </ModalContainer>

      <ModalContainer isOpen={isLeftModalOpen}>
        <LeftModal></LeftModal>
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
              className="bg-pink-500 text-white active:bg-pink-800 rounded-full
        font-bold my-6 px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-32 mb-1"
              onClick={handleWithdrawClick}
            >
              Withdraw
            </button>
            <button
              className="bg-pink-500 text-white rounded-full active:bg-pink-800
        font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1"
              onClick={handleReportClick}
            >
              Report
            </button>
          </div>
          <div className="text-center mx-auto my-16">
            <p className="font-extrabold text-xl">Todays donut</p>
            <h2>
              {topic}
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
                <button type="button" id="push-to-talk" onClick={handlePushToTalk} className="bg-pink-500 rounded-full text-white font-medium px-2 py-2 mx-2">
                  {
                    !isRecording ? <svg fill="none" stroke="currentColor" className="w-6 h-6" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"></path>
                    </svg> :
                      <svg fill="none" stroke="currentColor" stroke-width="1.5" className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z"></path>
                      </svg>
                  }
                </button>
                {isPlaying && <p>Opponent is speaking...</p>}
            <button className="bg-pink-500 rounded-full text-white font-medium px-4 py-2">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
