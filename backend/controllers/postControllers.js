const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Post = require('../models/postModel')


const sendPost = asyncHandler(async(req,res) => {

     if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
      }

       const post = await Post.create({
         user: req.user.id,
         text: req.body.text
      })

    res.status(200).json(post)
})

const upvote = asyncHandler(async(req,res) =>{
  const {id} = req.body;

  const post = await Post.findById(id)

  var count = post.upvoteCount + 1

    if(!post){
        res.status(400)
        throw new Error('Post not found')
    }

    const updatedPost = await Post.findByIdAndUpdate(id, {upvoteCount: count})

    res.status(200).json(updatedPost)
    
})

const downvote = asyncHandler(async(req,res) =>{
  const {id} = req.body;

  const post = await Post.findById(id)

  var count = post.downvoteCount - 1

    if(!post){
        res.status(400)
        throw new Error('Post not found')
    }
    
    const updatedPost = await Post.findByIdAndUpdate(id, {downvoteCount: count})

    res.status(200).json(updatedPost)
    
})

const deletePost = asyncHandler(async(req,res) => {
    const {id} = req.body;
    console.log(id)
     const post = await Post.findById(id)
console.log(post)
        if(!post){
        res.status(400)
        throw new Error('Post not found')
    }


    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }


    if(post.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

     await Post.findByIdAndDelete(id)

    res.status(200).json({ id: req.params.id,message: "Your post is deleted"} )
})
module.exports = { sendPost, upvote, downvote, deletePost }