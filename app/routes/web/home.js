const express = require('express');
const router = express.Router();


// controllers
const homeController = require('app/http/controllers/homecontroller');
const loginController = require('app/http/controllers/auth/logincontroller');
const registerController = require('app/http/controllers/auth/registercontroller');

//middleware
const redirectIfAuthenticated = require('app/http/middleware/redirectIfAuthenticated');

//validator
const registerValidator = require('app/http/validators/registerValidator');
const loginValidator = require('app/http/validators/loginValidator');


// home router
router.get('/', homeController.index);
router.get('/login', redirectIfAuthenticated.handle, loginController.showLoginForm);
router.post('/login', redirectIfAuthenticated.handle,loginValidator.handle(),loginController.loginProccess);

router.get('/register', redirectIfAuthenticated.handle, registerController.showRegisterForm);
router.post('/register',  redirectIfAuthenticated.handle,registerValidator.handle(),registerController.registerProccess);

router.get('/logout', (req, res) => {
    req.logOut();
    res.clearCookie('remember_token');
    res.redirect('/');
});




module.exports = router