const express = require('express')
const {registerUser, authUser, banUser} = require("../controllers/userControllers")

const router = express.Router()

router.route('/').post(registerUser)
router.post('/login', authUser) 
router.put('/ban', banUser)

module.exports = router;