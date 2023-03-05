const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const User = require('../models/userModel')
const Token = require('../models/tokenModel')
const generateToken = require("../config/generateToken")

dotenv.config();

const registerUser = asyncHandler(async(req,res ) => {
   const {username,email,password,userType} = req.body;

   if (!username || !email || !password) {
    console.log(req.body)
    res.status(400);
    throw new Error("Please Enter all the fields!");
   }

   const userExists = await User.findOne({email})

   // Check if this user exists
   if (userExists){
    res.status(400);
    throw new Error("User already exists");
   }

   // Create the user
   const user = await User.create({
    username,
    email,
    password,
    userType,
   })

    // Create a verification token for this user
        var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
 
        // Save the verification token
        token.save(function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }
 
            // Send the email
            var transporter = nodemailer.createTransport({
              service: "Sendgrid",
              auth: { user: "apikey", pass: process.env.SENDGRID_APIKEY },
            });
            var mailOptions = { from: 'donutshare.ctis@gmail.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
            transporter.sendMail(mailOptions, function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send('A verification email has been sent to ' + user.email + '.');
            });
        });
    });


const authUser = asyncHandler(async (req,res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password)) ) {

        if (!user.isVerified) {
          res.status(401);
          throw new Error("Your account has not been verified");
        }

        if(user.isBanned){
        res.status(403);
        throw new Error("You are Banned from Donut Share");
    }
        res.json({
        _id: user._id,
        username: user.username,
        userType: user.userType,
        token:generateToken(user._id)
        });
    } 
     
    else {
    res.status(401);
    throw new Error("Invalid Email or Password");
   }
});

const banUser = asyncHandler(async (req,res) => {
    const {username} = req.body;
    const user = await User.findOneAndUpdate({username},{ isBanned: true})

    if(user) {
        res.status(200);      
        res.json({
        email: user.email,
        isBanned: user.isBanned,
        message: "this user is banned"
        });
    } 
    else {
    res.status(401);
    throw new Error("There is no such user");
   }
});

const allUsers = asyncHandler(async(req,res)=>{
   const userArr = await User.find({ userType: req.body.userType });

   res.status(200).json({userArr});
});

const deleteModerator = asyncHandler(async (req, res) => {
  const { username } = req.body;

  const user = await User.findOne({ username: username});

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  if(user.userType != "moderator")
  {
    res.status(400);
    throw new Error("This user is not a Moderator")
  }

  await User.findByIdAndDelete(user._id);

  res.status(200).json({ username: req.params.username, message: "This moderator is deleted" });
});

module.exports = {registerUser, authUser, banUser, allUsers, deleteModerator};