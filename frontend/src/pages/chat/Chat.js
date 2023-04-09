import { useEffect, useState } from "react";
import socket from "../../socket/socket";

const Chat = ({ match }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");


  useEffect(() => {

    socket.on("connect", () => {
      console.log("this is chat")
      console.log(`Connected to server with ID ${socket.id}`);
    });

    socket.on("chatMessage", (message) => {
      setMessages((messages) => [...messages, message]);
    });

   
    socket.on("leaveChat", () => {
      console.log("Disconnected from server");
    });

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
   <div style={{ backgroundColor: "white" }}>
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
       <button type="submit" style={{ backgroundColor: "pink" }}>
         Send
       </button>
     </form>
   </div>
 );

};

export default Chat;
