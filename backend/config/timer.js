const Topic = require("../models/topicModel");

const topicTimer = async() => {

const topic =  await Topic.findOneAndRemove().sort({ createdAt: 1 })
console.log(topic.content +" is deleted")
const currentTopic = await Topic.findOne().sort({ createdAt: 1 }).limit(1);
currentTopic.isCurrent = true
currentTopic.save()

  setTimeout(topicTimer, 86400000);
};

module.exports = topicTimer;
