const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");
const Report = require("../models/reportModel");
const User = require("../models/userModel");

const sendPost = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const post = await Post.create({
    user: req.user.id,
    username: req.user.username,
    text: req.body.text,
    opinion: req.body.opinion,
  });

  res.status(200).json(post);
});

const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find();

  res.status(200).json({ posts });
});

const upvote = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const post = await Post.findById(id);
  var state = await post.upvotePost(req.user.id);

  if (state === 1) {
    res.status(200).json(post);
  } else if (state === 2) {
    res.status(400).json(post);
  } else if (state === 3) {
    res.status(400).json(post);
  }
});

const downvote = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const post = await Post.findById(id);
  var state = await post.downvotePost(req.user.id);

  if (state === 1) {
    res.status(200).json(post);
  } else if (state === 2) {
    res.status(400).json(post);
  } else if (state === 3) {
    res.status(400).json(post);
  }
});

const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const post = await Post.findById(id);

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  await Post.findByIdAndDelete(id);

  await Report.deleteMany({postId:id});

  res.status(200).json({ id: req.params.id, message: "Your post is deleted" });
});

module.exports = { sendPost, upvote, downvote, deletePost, getPosts };
