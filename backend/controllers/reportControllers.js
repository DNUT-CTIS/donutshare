const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Post = require("../models/postModel");
const Report = require("../models/reportModel");
const Topic = require("../models/topicModel");

const reportUser = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const topic = await Topic.findOne({ isCurrent: true });

  const report = await Report.create({
    complainant: req.user.username,
    offender: req.body.offender,
    text: req.body.text,
    topicContent: topic.content,
    isVisible: "yes",
    reportType: req.body.reportType,
  });

  res.status(200).json(report);
});

const reportPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.body.id);

    const topic = await Topic.findOne({ isCurrent: true });

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
    postId: post._id,
    postContext: post.text,
    complainant: req.user.username,
    topicContent: topic.content,
    offender: offender.username,
    isVisible: "yes",
    text: req.body.text,
    reportType: req.body.reportType,
  });

  res.status(200).json(report);
});

const updateReportVisibility = asyncHandler(async (req, res) => {
  const reportId = req.body.id;

  if (!reportId) {
    res.status(400);
    throw new Error("Report ID not provided");
  }

  const report = await Report.findById(reportId);

  if (!report) {
    res.status(400);
    throw new Error("Report not found");
  }

  report.isVisible = "no";

  await report.save();

  res.status(200).json(report);
});



const allReports = asyncHandler(async (req, res) => {
  const reportArr = await Report.find({});

  res.status(200).json({ reportArr });
});

module.exports = { reportUser, reportPost, updateReportVisibility, allReports };
