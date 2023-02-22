const mongoose = require('mongoose')

const postModel = mongoose.Schema({
    sender :{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    content:{type: String, trim: true},
    upvoteCount:{type: mongoose.Schema.Types.Number, default: 0},
    downvoteCount:{type: mongoose.Schema.Types.Number, default: 0}
},
    {
    timestamps:true,
    }
);

const Post = mongoose.model("Post", postModel);

module.exports = Post;