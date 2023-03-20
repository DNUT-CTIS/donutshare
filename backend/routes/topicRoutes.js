const express = require("express");
const { addTopic, currentTopic } = require("../controllers/topicControllers");
const { protect } = require("../middleware/authMiddleware");


const router = express.Router();

router.post("/addTopic", addTopic)
router.get("/currentTopic", currentTopic);

module.exports = router;