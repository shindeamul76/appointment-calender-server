const express = require('express');
const router = express.Router();

const { 
    Register, 
    Login, 
    logOut,
    } = require('../controllers/User');

const { isAuthenticated } = require('../middlewears/auth');

router.route('/register').post(Register)

router.route('/login').post(Login);

router.route('/logout').get(logOut);

module.exports = router