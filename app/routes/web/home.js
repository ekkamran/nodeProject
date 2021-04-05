const express = require('express');
const router = express.Router();


// controllers
const homeController = require('app/http/controllers/homecontroller');
const courseController = require('app/http/controllers/coursecontroller');

//validator
const commentValidator = require('app/http/validators/commentValidator');

//middlewares
const redirectIfNotAuthenticated = require('app/http/middleware/redirectIfNotAuthenticated');

router.get('/logout', (req, res) => {
    req.logOut();
    res.clearCookie('remember_token');
    res.redirect('/');
});

// home router
router.get('/', homeController.index);
router.get('/about-me', homeController.about);
router.get('/courses', courseController.index);
router.get('/courses/:course', courseController.single);
router.post('/courses/payment', courseController.payment);

router.post('/comment' , redirectIfNotAuthenticated.handle , commentValidator.handle() ,homeController.comment);
router.get('/download/:episode' , courseController.download)


module.exports = router