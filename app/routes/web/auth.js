const express = require('express');
const router = express.Router();
const passport = require('passport');


// controllers
const loginController = require('app/http/controllers/auth/logincontroller');
const forgotPasswordController = require('app/http/controllers/auth/forgotpasswordcontroller');
const resetPasswordController = require('app/http/controllers/auth/resetpasswordcontroller');
const registerController = require('app/http/controllers/auth/registercontroller');




//validator
const registerValidator = require('app/http/validators/registervalidator');
const loginValidator = require('app/http/validators/loginvalidator');
const forgotPasswordValidator = require('app/http/validators/forgotpasswordvalidator');
const resetPasswordValidator = require('app/http/validators/resetpasswordvalidator');


// home router
router.get('/login',  loginController.showLoginForm);
router.post('/login', loginValidator.handle(),loginController.loginProccess);


router.get('/register', registerController.showRegisterForm);
router.post('/register',  registerValidator.handle(),registerController.registerProccess);

router.get('/password/reset', forgotPasswordController.showForgotPassword);
router.post('/password/email', forgotPasswordValidator.handle(), forgotPasswordController.sendPasswordResetLink);

router.get('/password/reset/:token', resetPasswordController.showResetPassword);
router.post('/password/reset' , resetPasswordValidator.handle() , resetPasswordController.resetPasswordProccess);


router.get('/google', passport.authenticate('google', { 
    scope: [ 
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
     ] 
}));
router.get('/google/callback', passport.authenticate('google', {successRedirect: '/', failureRedirect: '/register'}));


module.exports = router