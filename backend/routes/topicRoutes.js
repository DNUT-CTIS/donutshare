const express = require("express");
const { addTopic, currentTopic, allTopics } = require("../controllers/topicControllers");
const { protect } = require("../middleware/authMiddleware");


const router = express.Router();

router.post("/addTopic", addTopic)
router.get("/currentTopic", currentTopic).get("/allTopics", allTopics)

module.exports = router;