const express = require('express');
const router = express.Router();


// controllers
const homeController = require('app/http/controllers/homecontroller');
const courseController = require('app/http/controllers/coursecontroller')

router.get('/logout', (req, res) => {
    req.logOut();
    res.clearCookie('remember_token');
    res.redirect('/');
});

// home router
router.get('/', homeController.index);
router.get('/about-me', homeController.index);
router.get('/courses', courseController.index);
router.get('/courses/:course', courseController.single);


module.exports = router