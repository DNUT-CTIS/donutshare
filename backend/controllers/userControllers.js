const asyncHandler = require("express-async-handler");
const User = require('../models/userModel')
const generateToken = require("../config/generateToken")

const registerUser = asyncHandler(async(req,res ) => {
   const {username,email,password,userType} = req.body;

   if (!username || !email || !password) {
    console.log(req.body)
    res.status(400);
    throw new Error("Please Enter all the fields!");
   }

   const userExists = await User.findOne({email})

   if (userExists){
    res.status(400);
    throw new Error("User already exists");
   }

   const user = await User.create({
    username,
    email,
    password,
    userType,
   })

   if(user) {
    res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        userType: user.userType,
        token:generateToken(user._id)
    });
   } else {
    res.status(400);
    throw new Error("Failed to Create the User");
   }
});

const authUser = asyncHandler(async (req,res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password)) ) {

        if(user.isBanned){
        res.status(403);
        throw new Error("You are Banned from Donut Share");
    }
        res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token:generateToken(user._id)
        });
    } 
     
    else {
    res.status(401);
    throw new Error("Invalid Email or Password");
   }
});

const banUser = asyncHandler(async (req,res) => {
    const {email} = req.body;
    const user = await User.findOneAndUpdate({email},{ isBanned: true})

    if(user) {
        res.status(200);      
        res.json({
        email: user.email,
        isBanned: user.isBanned
        });
    } 
    else {
    res.status(401);
    throw new Error("There is no such user");
   }
});

const allUsers = asyncHandler(async(req,res)=>{
   const debater = await User.find({ userType: req.body.userType });

   res.status(200).json({ debater
                        });
});


module.exports = {registerUser, authUser, banUser, allUsers};