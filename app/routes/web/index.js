const express = require('express');
const router = express.Router();


// admin router
const adminRouter = require('app/routes/web/admin')
router.use('/admin',adminRouter);

// home router
const homeRouter = require('app/routes/web/home')
router.use('/', homeRouter);




module.exports = router