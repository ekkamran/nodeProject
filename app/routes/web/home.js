const express = require('express');
const router = express.Router();


// controllers
const homeController = require('app/http/controllers/homecontroller')


// home router
router.get('/', homeController.index);









module.exports = router