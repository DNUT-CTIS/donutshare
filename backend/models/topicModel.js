const mongoose = require('mongoose')

const topicModel = mongoose.Schema({
    sender :{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    content:{type: String, trim: true},
},
    {
    timestamps:true,
    }
);

const Topic = mongoose.model("Topic", topicModel);

module.exports = Topic;