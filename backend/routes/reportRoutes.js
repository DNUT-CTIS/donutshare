const express = require('express')
const {reportUser, reportPost} = require("../controllers/reportControllers")
const {protect} = require("../middleware/authMiddleware")


const router = express.Router();

router.post("/", protect, reportUser).post("/post", protect, reportPost)


module.exports = router;