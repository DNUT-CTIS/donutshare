const mongoose = require('mongoose')

const chatModel = mongoose.Schema(
    {
    chatName: {type: String, trim: true},
    topic :{type:mongoose.Schema.Types.ObjectId,ref:"Topic"},
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    ],
}
,
    {
    timestamps: true,
    }
);

const Chat = mongoose.model("Chat", chatModel);

module.exports = Chat;