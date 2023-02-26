const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const { chats } = require("./data/data");
const connectDB = require("./config/db")
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes")
const reportRoutes = require("./routes/reportRoutes")
const {notFound, errorHandler} = require("./middleware/errorMiddleware")
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:4000/",
};

app.use(cors(corsOptions));
dotenv.config();

connectDB();
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.get('/', (req,res) => {
    res.send("API is Running")
})

app.use('/api/user',userRoutes)
app.use('/api/post',postRoutes)
app.use('/api/report',reportRoutes)

app.get("/api/chat", (req,res) => {
    res.send(chats)
})

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT,console.log(`Server started on PORT ${PORT}`.yellow.bold));