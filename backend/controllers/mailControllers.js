const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const User = require("../models/userModel");
const Token = require("../models/tokenModel");

dotenv.config();

const confirmationPost = asyncHandler(async (req, res) => {
  // Find a matching token
  const token = await Token.findOne({ token: req.params.token });

  if (!token) {
    res.status(400);
    throw new Error("Your token may have expired");
  }
  var user = await User.findOne(token._userId);

  if (!user) {
    res.status(400);
    throw new Error("We were unable to find a user for this token.");
  }

  if (user.isVerified) {
    res
      .status(400)
      .redirect("https://donut-5dff6.web.app/dashboard/already-verified");
    throw new Error("This user has already been verified.");
  }

  user.isVerified = true;
  user.save();
  res
    .status(200)
    .redirect("https://donut-5dff6.web.app/dashboard/verified");
});

const resendConfimation = asyncHandler(async (req, res) => {
  const { email } = req.body;

  User.findOne({ email }, function (err, user) {
    if (!user)
      return res
        .status(400)
        .send({ msg: "We were unable to find a user with that email." });
    if (user.isVerified)
      return res.status(400).send({
        msg: "This account has already been verified. Please log in.",
      });

    // Create a verification token, save it, and send email
    var token = new Token({
      _userId: user._id,
      token: crypto.randomBytes(16).toString("hex"),
    });

    // Save the token
    token.save(function (err) {
      if (err) {
        return res.status(500).send({ msg: err.message });
      }

      // Send the email
      var transporter = nodemailer.createTransport({
        service: "Sendgrid",
        auth: { user: "apikey", pass: process.env.SENDGRID_APIKEY },
      });
      var mailOptions = {
        from: "Donut Share " + process.env.SYSTEM_MAIL,
        to: user.email,
        subject: "Account Verification Token",
        text:
          "Hello,\n\n" +
          "Please verify your account by clicking the link: \nhttp://" +
          req.headers.host +
          "/confirmation/" +
          token.token +
          ".\n",
      };
      transporter.sendMail(mailOptions, function (err) {
        if (err) {
          return res.status(500).send({ msg: err.message });
        }
        res
          .status(200)
          .send("A verification email has been sent to " + user.email + ".");
      });
    });
  });
});

const forgotPassword = asyncHandler(async (req, res) => {

  const token = await Token.findOne({ token: req.params.token });

  if (!token) {
    res.status(400);
    throw new Error("Your token may have expired");
  }
  var user = await User.findOne(token._userId);

  if (!user) {
    res.status(400);
    throw new Error("We were unable to find a user for this token.");
  }


  user.isVerified = true;
  user.save();
  res.status(200).redirect("https://donut-5dff6.web.app/dashboard/forgotPassword").json({username: user.username});
});


module.exports = { confirmationPost, resendConfimation, forgotPassword };
