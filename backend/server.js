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
const testRoutes = require("./test/routes/topicTestRoutes");
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
app.use("/api/test", testRoutes);

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

const server = app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`.yellow.bold);
  setTimeout(topicTimer, timeRemaining);
});

require("./config/socket")(server);