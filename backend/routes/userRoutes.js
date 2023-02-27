const express = require('express')
const {registerUser, authUser, banUser, allUsers} = require("../controllers/userControllers")
const {protect} = require("../middleware/authMiddleware")

const router = express.Router()

router.route('/').post(registerUser)
router.post('/login', authUser) 
router.put('/ban', protect, banUser)
router.post('/allUsers', allUsers)

module.exports = router;