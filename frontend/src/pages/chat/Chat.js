import { useEffect, useState } from "react";
import io from "socket.io-client";

const Chat = ({ match }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
    const socket = io("https://donutshare-api.onrender.com");

  useEffect(() => {
    const socket = io();

    socket.on("connect", () => {
      console.log(`Connected to server with ID ${socket.id}`);
    });

    socket.on("chatMessage", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      console.log("Cleaning up...");
      socket.disconnect();
    };
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    const message = inputValue.trim();
    if (message !== "") {
      setMessages((messages) => [
        ...messages,
        { username: "You", message: message },
      ]);
      setInputValue("");
      socket.emit("chatMessage", message);
    }
  };

  return (
    <div>
      <h1>Chat</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.username}: </strong>
            {message.message}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
