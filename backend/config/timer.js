const Topic = require("../models/topicModel");

const topicTimer = () => {

const topic =  Topic.findOneAndRemove().sort({ createdAt: 1 })
console.log(topic.content +" is deleted")
const currentTopic =  Topic.findOne().sort({ createdAt: 1 }).limit(1);
currentTopic.isCurrent = true
currentTopic.save()
console.log(currentTopic.content + " is the new topic")

};

module.exports = topicTimer;
