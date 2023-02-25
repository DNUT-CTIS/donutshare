const express = require('express')
const {registerUser, authUser, banUser, allUsers} = require("../controllers/userControllers")
const {protect} = require("../middleware/authMiddleware")

const router = express.Router()

router.route('/').post(registerUser).get(allUsers);
router.post('/login', authUser) 
router.put('/ban', protect, banUser)

module.exports = router;