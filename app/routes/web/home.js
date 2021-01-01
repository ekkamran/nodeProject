const express = require('express');
const router = express.Router();


// controllers
const homeController = require('app/http/controllers/homecontroller')
const loginController = require('app/http/controllers/auth/logincontroller')
const registerController = require('app/http/controllers/auth/registercontroller')



// home router
router.get('/', homeController.index);
router.get('/login', loginController.showLoginForm);
router.get('/register', registerController.showRegistrationForm);










module.exports = router