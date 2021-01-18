const express = require('express');
const router = express.Router();


// admin router
const adminRouter = require('app/routes/web/admin')
router.use('/admin',adminRouter);

// home router
const homeRouter = require('app/routes/web/home')
router.use('/', homeRouter);

//middleware
const redirectIfAuthenticated = require('app/http/middleware/redirectIfAuthenticated');

// auth router
const authRouter = require('app/routes/web/auth')
router.use('/auth', redirectIfAuthenticated.handle, authRouter);

module.exports = router