const mongoose = require('mongoose')

const topicModel = mongoose.Schema({
    content:{type: String, trim: true}
},
    {
    timestamps:true,
    }
);

const Topic = mongoose.model("Topic", topicModel);

module.exports = Topic;