const express = require("express");
const { addTopic } = require("../controllers/topicControllers");
const { protect } = require("../middleware/authMiddleware");


const router = express.Router();

router.post("/addTopic", addTopic)

module.exports = router;