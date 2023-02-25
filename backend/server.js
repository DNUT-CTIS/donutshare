const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const { chats } = require("./data/data");
const connectDB = require("./config/db")
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes")
const {notFound, errorHandler} = require("./middleware/errorMiddleware")

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

app.get("/api/chat", (req,res) => {
    res.send(chats)
})

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT,console.log(`Server started on PORT ${PORT}`.yellow.bold));