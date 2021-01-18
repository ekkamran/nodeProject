const express = require('express');
const router = express.Router();


// controllers
const homeController = require('app/http/controllers/homecontroller');

// home router
router.get('/', homeController.index);


router.get('/logout', (req, res) => {
    req.logOut();
    res.clearCookie('remember_token');
    res.redirect('/');
});




module.exports = router