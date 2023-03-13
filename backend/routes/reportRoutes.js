const express = require('express')
const {reportUser, reportPost, allReports} = require("../controllers/reportControllers")
const {protect} = require("../middleware/authMiddleware")


const router = express.Router();

router.post("/", protect, reportUser).post("/post", protect, reportPost)
router.get("/allReports",allReports)


module.exports = router;