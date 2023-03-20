const mongoose = require('mongoose')

const topicModel = mongoose.Schema(
  {
    content: { type: String, trim: true },
    isCurrent: { type: Boolean, default: false }
  },
  {
    timestamps: true,
  }
);

const Topic = mongoose.model("Topic", topicModel);

module.exports = Topic;