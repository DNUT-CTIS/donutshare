const asyncHandler = require("express-async-handler");

let currentTopic = null;
let endTime = null;

const topicTimer = asyncHandler(async (req, res) => {
  const { topic1, topic2, duration } = req.body;

  if (topic1 && topic2 && duration) {
    currentTopic = topic1;
    endTime = Date.now() + duration * 1000;
    res.send(currentTopic);
    setTimeout(() => {
      currentTopic = topic2;
      endTime = Date.now() + duration * 1000;
      setTimeout(() => {
        currentTopic = null;
      }, duration * 1000);
    }, duration * 1000);
  } else {
    res.status(400).send("Invalid parameters");
  }
});

const getCurrentTopicTest = asyncHandler(async (req, res) => {
  const currentTime = Date.now();
  let remainingTime = 0;

  if (endTime && currentTime < endTime) {
    remainingTime = Math.max(0, endTime - currentTime) / 1000;
  } else {
    currentTopic = null;
  }
  res.send({ currentTopic, remainingTime });
});

module.exports = {topicTimer, getCurrentTopicTest}
