import { useEffect, useState } from "react";
import socket from "../../socket/socket";
import classNames from "classnames";

const Chat = ({ match }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [user, setUser] = useState();

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

    return () => {
      socket.off("connect");
      socket.off("chatMessage");
      socket.off("leaveChat");
    };
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    const message = inputValue.trim();
    if (message !== "") {
      setInputValue("");
      socket.emit("chatMessage", message);
    }
  };


  return (
    <div className="bg-white dark:bg-zinc-800 h-screen flex flex-col">
      <div className="flex-1 overflow-y-scroll p-4">
        {messages.map((message, index) => {
          const username = JSON.parse(localStorage.getItem("username"))

          const isSentByCurrentUser = username === message.username;
          console.log(isSentByCurrentUser);
          console.log(message.username);
          const messageClass = classNames({
            "my-2 p-2 rounded-md bg-gray-200  dark:text-white text-base max-w-xs break-words": true,
            "ml-auto": isSentByCurrentUser,
            "dark:bg-pink-600": isSentByCurrentUser,
            "dark:bg-zinc-600": !isSentByCurrentUser,
            "mr-auto": !isSentByCurrentUser,
          });

          return (
            <div key={index} className="flex">
              <div className={messageClass}>
                <p className="text-sm font-medium">{message.username}</p>
                <p>{message.message}</p>
              </div>
            </div>
          );
        })}
      </div>
      <form onSubmit={handleSendMessage} className="flex items-center p-4">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type a message"
          className="flex-1 rounded-full border-gray-300 px-4 py-2 mr-2"
        />
        <button
          type="submit"
          className="bg-pink-500 rounded-full text-white font-medium px-4 py-2"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
