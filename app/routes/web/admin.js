const express = require('express');
const router = express.Router();

//controller
const adminController = require('app/http/controllers/admin/admincontroller')
const courseController = require('app/http/controllers/admin/coursecontroller')

//validator
const courseValidator = require('app/http/validators/coursevalidator')

//Helpers
const upload = require('app/helpers/uploadImage');

//Middlewares
const convertFileToField = require('app/http/middleware/convertfiletofield')

router.use((req, res, next) => {
    res.locals.layout = "admin/master";
    next();
})

// admin router
router.get('/', adminController.index);
router.get('/courses', courseController.index);
router.get('/courses/create', courseController.create);
router.post('/courses/create',
    upload.single('images'),
    convertFileToField.handle,
    courseValidator.handle(),
    courseController.store
);
router.get('/courses/:id/edit', courseController.edit);
router.put('/courses/:id',
upload.single('images'),
convertFileToField.handle,
courseValidator.handle(),
courseController.update
);
router.delete('/courses/:id', courseController.destroy);

module.exports = router