const mongoose = require('mongoose')

const reportModel = mongoose.Schema(
  {
    postId: { type: String, required: true },
    postContext: { type: String, required: true },
    complainant: { type: String, required: true },
    offender: { type: String, required: true },
    text: {
      type: String,
      trim: true,
      required: [true, "Please add a text value"],
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Post",
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Chat",
    },
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model("Report", reportModel);

module.exports = Report;