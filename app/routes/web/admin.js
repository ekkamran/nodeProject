const express = require('express');
const router = express.Router();

//controller
const adminController = require('app/http/controllers/admin/admincontroller')
const courseController = require('app/http/controllers/admin/coursecontroller')

//validator
const courseValidator = require('app/http/validators/coursevalidator')



router.use((req, res, next) => {
    res.locals.layout = "admin/master";
    next();
})

// admin router
router.get('/', adminController.index);
router.get('/courses', courseController.index);
router.get('/courses/create', courseController.create);
router.post('/courses/create',courseValidator.handle(), courseController.store);



module.exports = router