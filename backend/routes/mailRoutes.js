const express = require("express");
const {confirmationPost,resendConfimation, forgotPassword} = require("../controllers/mailControllers");

const router = express.Router();

router
  .get("/confirmation/:token", confirmationPost).get("/reset-password/:token", forgotPassword);
router.post("/resend", resendConfimation);

module.exports = router;
