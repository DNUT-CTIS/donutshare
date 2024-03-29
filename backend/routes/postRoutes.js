const express = require('express')
const {sendPost, upvote, downvote, deletePost, getPosts} = require("../controllers/postControllers")
const {protect} = require("../middleware/authMiddleware")

const router = express.Router()

router.post('/', protect, sendPost)
router.put("/upvote", protect, upvote).put("/downvote",protect, downvote)
router.delete("/delete", deletePost)
router.get("/", getPosts)

module.exports = router;