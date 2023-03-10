const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Post = require('../models/postModel')
const Report = require('../models/reportModel')

const reportUser = asyncHandler(async(req,res) => {

     if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
      }

       const report = await Report.create({
         complainant: req.user.username,
         offender: req.body.offender,
         text: req.body.text
       });

    res.status(200).json(report)
})

const reportPost = asyncHandler(async(req,res)=>{

  console.log(req.body)
    const post = await Post.findById(req.body.id);
   

    if (!post) {
      res.status(400);
      throw new Error("Post not found");
    }
   
     const user = await User.findById(post.user);

     const report = await Report.create({
       complainant: req.user.username,
       offender: user.username,
       text: req.body.text,
     });

     res.status(200).json(report);

})

module.exports = { reportUser, reportPost };