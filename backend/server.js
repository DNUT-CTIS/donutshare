const express = require("express");
const dotenv = require("dotenv")
const { chats } = require("./data/data");

const app = express()

dotenv.config();

app.get('/', (req,res) => {
    res.send("API is Running")
})

app.get('/api/chat', (req,res) => {
    res.send(chats)
})

app.get('/api/chat/:id',(req,res) => {
   // console.log(req.params.id);
})

const PORT = process.env.PORT

app.listen(PORT,console.log(`Server started on PORT ${PORT}`));