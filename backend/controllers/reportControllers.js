const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Post = require("../models/postModel");
const Report = require("../models/reportModel");

const reportUser = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const report = await Report.create({
    complainant: req.user.username,
    offender: req.body.offender,
    text: req.body.text,
  });

  res.status(200).json(report);
});

const reportPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.body.id);

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  const offender = await User.findById(post.user);

  if (req.user.id == offender.id) {
    res.status(400);
    throw new Error("You can't report your own post!");
  }

  const report = await Report.create({
    complainant: req.user.username,
    offender: offender.username,
    text: req.body.text,
  });

  res.status(200).json(report);
});

const allReports = asyncHandler(async (req, res) => {
  const reportArr = await Report.find({});

  res.status(200).json({ reportArr });
});

module.exports = { reportUser, reportPost, allReports };
