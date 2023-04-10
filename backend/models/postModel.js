const mongoose = require('mongoose')
const User = require("../models/userModel");

const postModel = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    username: { type: String, trim: true, required: true },
    topicId: { type: String, trim: true, required: true },
    text: {
      type: String,
      trim: true,
      required: [true, "Please add a text value"],
    },
    opinion: {
      type: String,
      trim: true,
      required: [true, "Please decide if you agree or disagree"],
    },
    upvoteCount: { type: mongoose.Schema.Types.Number, default: 0 },
    downvoteCount: { type: mongoose.Schema.Types.Number, default: 0 },
    votes: [{ username: String, rate: String }],
  },

  {
    timestamps: true,
  }
);

postModel.methods.upvotePost = async function (userId) {

  const user = await User.findById( userId );
  
   const vote = Object.values(this.votes).find(
     (vote) => vote.username === user.username
   );
   
    if(!vote){
      var upvote = {username: user.username, rate: "upvote"};
      this.votes.push(upvote)
      this.upvoteCount += 1
      await this.save()
      return 1;
    }
   
    if(vote.rate === "upvote"){     
      this.votes.pull(vote)
      this.upvoteCount -= 1;
      await this.save();
      console.log("You deleted this upvote");
      return 2
    }

    if (vote.rate === "downvote") {
      this.upvoteCount += 1;
      this.downvoteCount -= 1;
      vote.rate = "upvote"
            await this.save();
      console.log("You changed your down to up for this post");
      return 3;
    }
};


postModel.methods.downvotePost = async function (userId) {
  const user = await User.findById(userId);

  const vote = Object.values(this.votes).find(
    (vote) => vote.username === user.username
  );

  if (!vote) {
    var downvote = { username: user.username, rate: "downvote" };
    this.votes.push(downvote);
    this.downvoteCount += 1;
    await this.save();
    return 1;
  }

  if (vote.rate === "downvote") {
      this.votes.pull(vote);
      this.downvoteCount -= 1;
      await this.save();
      console.log("You deleted this downvote");
    return 2;
  }

  if (vote.rate === "upvote") {
    this.upvoteCount -= 1;
    this.downvoteCount += 1;
    vote.rate = "downvote";
    await this.save();
    console.log("You changed your up to down for this post");
    return 3;
  }
};

const Post = mongoose.model("Post", postModel);

module.exports = Post;