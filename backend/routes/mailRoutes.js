const express = require("express");
const {confirmationPost,resendConfimation} = require("../controllers/mailControllers");

const router = express.Router();

router.get("/confirmation/:token", confirmationPost);
router.post("/resend", resendConfimation);

module.exports = router;
