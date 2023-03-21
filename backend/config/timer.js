const Topic = require("../models/topicModel");

const topicTimer = async() => {

const topic =  await Topic.findOneAndRemove().sort({ createdAt: 1 })
console.log(topic.content +" is deleted")
const currentTopic = await Topic.findOne().sort({ createdAt: 1 }).limit(1);
currentTopic.isCurrent = true
currentTopic.save()
console.log(currentTopic.content + " is the new topic")

  const now = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  const timeRemaining = midnight - now - 10800000;

  setTimeout(topicTimer, timeRemaining);
};

module.exports = topicTimer;
