const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const reportRoutes = require("./routes/reportRoutes");
const topicRoutes = require("./routes/topicRoutes");
const mailRoutes = require("./routes/mailRoutes");
const topicTimer = require("./config/timer")
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");


connectDB();
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
dotenv.config();

app.get("/", (req, res) => {
  res.send("API is Running");
});

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/topic", topicRoutes);
app.use("/api/mail", mailRoutes);

app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

const now = new Date();
const midnight = new Date();
midnight.setHours(24, 0, 0, 0);
const timeRemaining = midnight - now - 10800000;
setTimeout(topicTimer, timeRemaining);


const server = app.listen(PORT, console.log(`Server started on PORT ${PORT}`.yellow.bold));

const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
});

const waitingAgreeUsers = [];
const waitingDisagreeUsers = [];

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("buttonClick", (button) => {
    if (button === "agree") {
      waitingAgreeUsers.push(socket);
      console.log(
        `User ${socket.id} clicked the agree button and is waiting for a match.`
      );
    } else if (button === "disagree") {
      waitingDisagreeUsers.push(socket);
      console.log(
        `User ${socket.id} clicked the disagree button and is waiting for a match.`
      );
    }

    if (waitingAgreeUsers.length > 0 && waitingDisagreeUsers.length > 0) {
      const agreeSocket = waitingAgreeUsers.shift();
      const disagreeSocket = waitingDisagreeUsers.shift();
      console.log(
        `Users ${agreeSocket.id} and ${disagreeSocket.id} have been matched.`
      );

      // Create a room for the matched users
      const room =
        io.of("/matchmaking").adapter.rooms[
          `${agreeSocket.id}-${disagreeSocket.id}`
        ];
      if (!room) {
        agreeSocket.join(`${agreeSocket.id}-${disagreeSocket.id}`);
        disagreeSocket.join(`${agreeSocket.id}-${disagreeSocket.id}`);
      }

      // Emit a "matched" event to the matched users
      io.to(`${agreeSocket.id}-${disagreeSocket.id}`).emit(
        "matched",
        "You have been matched!"
      );
    }
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected.`);
    const index1 = waitingAgreeUsers.indexOf(socket);
    if (index1 !== -1) waitingAgreeUsers.splice(index1, 1);

    const index2 = waitingDisagreeUsers.indexOf(socket);
    if (index2 !== -1) waitingDisagreeUsers.splice(index2, 1);
  });
});