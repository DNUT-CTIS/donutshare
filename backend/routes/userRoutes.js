const express = require('express')
const {registerUser, authUser, changePassword, changePasswordWithoutToken, banUser, allUsers, deleteModerator, unbanUser, forgotPassword} = require("../controllers/userControllers")
const {protect} = require("../middleware/authMiddleware")

const router = express.Router()

router.route('/').post(registerUser)
router.post('/login', authUser) 
router
  .put("/ban", protect, banUser)
  .put("/unban", protect, unbanUser)
  .put("/changePassword", protect, changePassword)
  .put("/forgotPassword", forgotPassword)
  .put("/changePasswordWithoutToken", changePasswordWithoutToken);
router.post('/allUsers', allUsers)
router.delete('/deleteModerator', deleteModerator)


module.exports = router;