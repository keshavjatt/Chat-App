const express = require('express');
const registerUser = require('../controllers/registerUser');
const checkEmail = require('../controllers/checkEmail');

const router = express.Router()

// create user api
router.post('/register', registerUser)
// check user email
router.post('/email', checkEmail)

module.exports = router