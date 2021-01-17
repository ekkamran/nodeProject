const validator = require('./validator');
const { check } = require('express-validator/check');

class loginValidator extends validator {
    handle() {
        return[
            check('email')
            .isEmail()
            .withMessage('فیلد ایمیل معتبر نیست'),
           

            check('password')
            .isLength({ min: 8 })
            .withMessage('فیلد پسورد نمیتواند کمتر از 8 کاراکترباشد'),
        ]
    }
}

module.exports = new loginValidator();