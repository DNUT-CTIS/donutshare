const express = require("express");
const {topicTimer, getCurrentTopicTest} = require("../controllers/topicTestTestControllers")

const router = express.Router();

router.post("/topicTimer", topicTimer);
router.get("/currentTopic", getCurrentTopicTest)

module.exports = router;
