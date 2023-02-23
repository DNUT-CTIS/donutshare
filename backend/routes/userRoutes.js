const express = require('express')
const {registerUser, authUser, banUser} = require("../controllers/userControllers")
const {protect} = require("../middleware/authMiddleware")

const router = express.Router()


router.post('/login', authUser) 
router.put('/ban', protect, banUser)

module.exports = router;