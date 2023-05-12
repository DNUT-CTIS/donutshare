const express = require('express')
const {reportUser, reportPost, allReports, updateReportVisibility} = require("../controllers/reportControllers")
const {protect} = require("../middleware/authMiddleware")


const router = express.Router();

router.post("/", protect, reportUser).post("/post", protect, reportPost)
router.get("/allReports",allReports)
router.put("/updateVisibility", updateReportVisibility);



module.exports = router;