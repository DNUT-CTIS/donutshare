const express = require('express')
const {sendPost, upvote, downvote, deletePost} = require("../controllers/postControllers")
const {protect} = require("../middleware/authMiddleware")

const router = express.Router()

router.post('/', protect, sendPost)
router.put("/upvote", upvote).put("/downvote", downvote)
router.delete("/delete", protect, deletePost)


module.exports = router;