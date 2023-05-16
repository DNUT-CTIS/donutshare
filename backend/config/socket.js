const { Aggregate } = require('mongoose');
const io = require('socket.io');

module.exports = function(server) {
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  connectTimeout: 5000,
  cors: {
    origin: "*",
  },
  credentials: true,
});

const waitingAgreeUsers = [];
const waitingDisagreeUsers = [];

io.on("connection", (socket) => {
 // console.log(`User ${socket.id} connected`);

  socket.on("buttonClick", (button) => {
    if (button === "agree") {
      waitingAgreeUsers.push(socket);
      console.log(
        `User ${socket.id} with username ${socket.username} clicked the agree button and is waiting for a match.`
      );
    } else if (button === "disagree") {
      waitingDisagreeUsers.push(socket);
      console.log(
        `User ${socket.id} with username ${socket.username} clicked the disagree button and is waiting for a match.`
      );
    }

    if (waitingAgreeUsers.length > 0 && waitingDisagreeUsers.length > 0) {
      const agreeSocket = waitingAgreeUsers.shift();
      const disagreeSocket = waitingDisagreeUsers.find(
        (socket) =>
          socket.id !== agreeSocket.id &&
          socket.username !== agreeSocket.username
      );
      if (disagreeSocket) {
        console.log(
          `[${new Date().toLocaleString()}] Users ${agreeSocket.username} and ${
            disagreeSocket.username
          } have been matched.`
        );

        const roomName = `${agreeSocket.id}-${disagreeSocket.id}`;
        const room = io.of("/matchmaking").adapter.rooms[roomName];
       
        if (!room) {
          agreeSocket.join(roomName);
          disagreeSocket.join(roomName);
        }
        else{
          console.log(room)
        }

        io.to(roomName).emit("matched", roomName);

            agreeSocket.on("peer-connection", (peerId) => {
              console.log("received peer id of agree " + peerId);
              disagreeSocket.emit("peer-bond", peerId)
            });

            disagreeSocket.on("peer-connection", (peerId) => {
              console.log("received peer id of disagree " + peerId);
              agreeSocket.emit("peer-bond", peerId);
            });


        agreeSocket.on("withdrawChat", ()=>{
            agreeSocket.emit("withdrawChat",{
              side: "Agree"
            })
            disagreeSocket.emit("withdrawChat",{
              side: "Disagree"
            })
        })

           disagreeSocket.on("withdrawChat", () => {
             agreeSocket.emit("withdrawChat", {
               side: "Agree",
             });
             disagreeSocket.emit("withdrawChat", {
               side: "Disagree",
             });
           });

        agreeSocket.removeAllListeners("chatMessage");
        agreeSocket.on("chatMessage", (message) => {
          io.to(roomName).emit("chatMessage", {
            username: JSON.parse(agreeSocket.username),
            message: message,
          });
        });

        disagreeSocket.removeAllListeners("chatMessage");
        disagreeSocket.on("chatMessage", (message) => {
          io.to(roomName).emit("chatMessage", {
            username: JSON.parse(disagreeSocket.username),
            message: message,
          });
        });


        agreeSocket.on("disconnect", () => {
          console.log(`User ${agreeSocket.id} has disconnected from the chat.`);
          io.to(roomName).emit("chatMessage", {
            username: "System",
            message: `${agreeSocket.username} has left the chat.`,
          });
        });

        disagreeSocket.on("disconnect", () => {
          console.log(
            `User ${disagreeSocket.id} has disconnected from the chat.`
          );
          io.to(roomName).emit("chatMessage", {
            username: "System",
            message: `${disagreeSocket.username} has left the chat.`,
          });
        });
      }
    }

  });

socket.on("disconnect", () => {
  console.log(
    `User ${socket.id} with username ${socket.username} disconnected.`
  );

  // Find and remove the user from the waitingAgreeUsers array
  const index1 = waitingAgreeUsers.findIndex((user) => user.id === socket.id);
  if (index1 !== -1) {
    waitingAgreeUsers.splice(index1, 1);

    // Also remove the opponent from the waitingDisagreeUsers array
    const opponent = waitingDisagreeUsers.find(
      (user) => user.id !== socket.id && user.username !== socket.username
    );
    const index2 = waitingDisagreeUsers.findIndex(
      (user) => user.id === opponent.id
    );
    if (index2 !== -1) {
      waitingDisagreeUsers.splice(index2, 1);
    }
  }

  // Find and remove the user from the waitingDisagreeUsers array
  const index3 = waitingDisagreeUsers.findIndex(
    (user) => user.id === socket.id
  );
  if (index3 !== -1) {
    waitingDisagreeUsers.splice(index3, 1);

    // Also remove the opponent from the waitingAgreeUsers array
    const opponent = waitingAgreeUsers.find(
      (user) => user.id !== socket.id && user.username !== socket.username
    );
    const index4 = waitingAgreeUsers.findIndex(
      (user) => user.id === opponent.id
    );
    if (index4 !== -1) {
      waitingAgreeUsers.splice(index4, 1);
    }
  }
});


  socket.on("setUsername", (username) => {
    socket.username = username;
    console.log(`User ${socket.id} has set their username to ${username}.`);
  });

  socket.on("leaveQueue", () => {
    const index1 = waitingAgreeUsers.indexOf(socket);
    if (index1 !== -1) waitingAgreeUsers.splice(index1, 1);

    const index2 = waitingDisagreeUsers.indexOf(socket);
    if (index2 !== -1) waitingDisagreeUsers.splice(index2, 1);

    console.log(
      `User ${socket.id} with username ${socket.username} has left the queue.`
    );
  });
});
}