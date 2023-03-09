const express = require('express')
const {registerUser, authUser, banUser, allUsers, deleteModerator, unbanUser} = require("../controllers/userControllers")
const {protect} = require("../middleware/authMiddleware")

const router = express.Router()

router.route('/').post(registerUser)
router.post('/login', authUser) 
router.put('/ban', protect, banUser).put('/unban', protect, unbanUser)
router.post('/allUsers', allUsers)
router.delete('/deleteModerator', deleteModerator)


module.exports = router;