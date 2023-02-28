const express = require('express')
const {reportUser, reportPost} = require("../controllers/reportControllers")
const {protect} = require("../middleware/authMiddleware")


const router = express.Router();

router.post("/", reportUser);
router.post("/post", reportPost)

module.exports = router;