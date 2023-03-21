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

const agreeUsers = [];
const disagreeUsers = [];

io.on("connection", (socket) => {
 // console.log("A user connected");

  socket.on("buttonClick", (button) => {
    if (button === "agree") {
      console.log("agree");
      agreeUsers.push(socket);
    } else if (button === "disagree") {
      console.log("disagree");
      disagreeUsers.push(socket);
    }

    if (agreeUsers.length > 0 && disagreeUsers.length > 0) {
      const agreeSocket = agreeUsers.shift();
      const disagreeSocket = disagreeUsers.shift();
      agreeSocket.emit("matched", "You have been matched!");
      disagreeSocket.emit("matched", "You have been matched!");
    }
  });
});


