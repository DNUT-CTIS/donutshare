const io = require('socket.io');

module.exports = function(server) {
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
});

const waitingAgreeUsers = [];
const waitingDisagreeUsers = [];

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);

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

        const room =
          io.of("/matchmaking").adapter.rooms[
            `${agreeSocket.id}-${disagreeSocket.id}`
          ];
        if (!room) {
          agreeSocket.join(`${agreeSocket.id}-${disagreeSocket.id}`);
          disagreeSocket.join(`${agreeSocket.id}-${disagreeSocket.id}`);
        }

        io.to(`${agreeSocket.id}-${disagreeSocket.id}`).emit(
          "matched",
          "You have been matched!"
        );
      }
    }
  });

  socket.on("disconnect", () => {
    console.log(
      `User ${socket.id} with username ${socket.username} disconnected.`
    );
    const index1 = waitingAgreeUsers.indexOf(socket);
    if (index1 !== -1) waitingAgreeUsers.splice(index1, 1);

    const index2 = waitingDisagreeUsers.indexOf(socket);
    if (index2 !== -1) waitingDisagreeUsers.splice(index2, 1);
  });

  socket.on("setUsername", (username) => {
    socket.username = username;
    console.log(`User ${socket.id} has set their username to ${username}.`);
  });
});
}