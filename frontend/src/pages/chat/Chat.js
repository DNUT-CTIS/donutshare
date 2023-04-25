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
import {WarningModal} from "../../shared/WarningModal";

const Chat = ({ match }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [user, setUser] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWarningOpen, setIsWarningOpen] = useState(false);
  const [opinion, setOpinion] = useState("");
  const navigate = useNavigate();

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "start"});
  }
  useEffect(() => {

    socket.on("connect", () => {
      console.log("this is chat");
      console.log(`Connected to server with ID ${socket.id}`);
    });

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

  const handleWarningClick = () => {
    socket.emit("withdrawChat");
    setIsModalOpen(true);
  }

  const handleCancelClick = () => {
    setIsWarningOpen(false);
  }

  const handleWithdrawClick = () => {
    setIsWarningOpen(true);
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
      <ModalContainer isOpen={isWarningOpen}>
        <WarningModal></WarningModal>
        <button onClick={handleWarningClick} data-modal-hide="popup-modal" type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
          Yes, I'm sure
        </button>
        <button onClick={handleCancelClick} data-modal-hide="popup-modal" type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No,
          cancel
        </button>
      </ModalContainer>
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


    </div>
  );
};

export default Chat;
