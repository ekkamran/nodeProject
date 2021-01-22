const express = require('express');
const router = express.Router();

//controller
const adminController = require('app/http/controllers/admin/admincontroller')
const courseController = require('app/http/controllers/admin/coursecontroller')


router.use((req, res, next) => {
    res.locals.layout = "admin/master";
    next();
})

// admin router
router.get('/', adminController.index);
router.get('/courses', courseController.index);
router.get('/courses/create', courseController.create);



module.exports = router