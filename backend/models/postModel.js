const mongoose = require('mongoose')

const postModel = mongoose.Schema({
    user :{type:mongoose.Schema.Types.ObjectId,
                required: true,
                ref:"User"
        },
    username:{type: String,
                trim: true,
                required: true
        },
    text:{type: String,
                trim: true,
                required: [true, 'Please add a text value']
        },
    upvoteCount:{type: mongoose.Schema.Types.Number, default: 0},
    downvoteCount:{type: mongoose.Schema.Types.Number, default: 0}
},
    {
    timestamps:true,
    }
);

const Post = mongoose.model("Post", postModel);

module.exports = Post;