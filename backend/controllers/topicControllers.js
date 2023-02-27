const asyncHandler = require("express-async-handler");

const Topic = require("../models/topicModel");


const addTopic = asyncHandler(async (req, res) => {
  if (!req.body.content) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const topic = await Topic.create({
    content: req.body.content
  });

  res.status(200).json(topic);
});

module.exports = {addTopic}