const express = require('express');
const router = express.Router();
const passport = require('passport');


// controllers
const loginController = require('app/http/controllers/auth/logincontroller');
const registerController = require('app/http/controllers/auth/registercontroller');



//validator
const registerValidator = require('app/http/validators/registerValidator');
const loginValidator = require('app/http/validators/loginValidator');


// home router
router.get('/login',  loginController.showLoginForm);
router.post('/login', loginValidator.handle(),loginController.loginProccess);

router.get('/register', registerController.showRegisterForm);
router.post('/register',  registerValidator.handle(),registerController.registerProccess);

router.get('/google', passport.authenticate('google', { 
    scope: [ 
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
     ] 
}));
router.get('/google/callback', passport.authenticate('google', {successRedirect: '/', failureRedirect: '/register'}));


module.exports = router