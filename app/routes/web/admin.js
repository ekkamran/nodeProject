const express = require('express');
const router = express.Router();

//controller
const adminController = require('app/http/controllers/admin/admincontroller')




// admin router
router.get('/',adminController.index);



module.exports = router