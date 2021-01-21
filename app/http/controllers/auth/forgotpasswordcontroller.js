const controller = require('app/http/controllers/controller');
const passport = require('passport');
const passwordReset = require('app/models/password-reset');
const User = require('app/models/users');
const uniqueString = require('unique-string');


class forgotPasswordController extends controller{

    showForgotPassword(req , res){
        const title = "صفحه ورود";
        res.render('home/auth/passwords/email', { errors: req.flash('errors'), recaptcha: this.recaptcha.render(), title});
    }
    
    async sendPasswordResetLink(req  ,res , next) {
        await this.recaptchaValidation(req , res);
        let result = await this.validationData(req)
        if(result) {
            return this.sendResetLink(req, res)
        } 
            
        return res.redirect('/auth/password/reset');
    }


    async sendResetLink(req, res, next) {
        let user = await User.findOne({ email: req.body.email });
        if(!user) {
            req.flash('errors', 'چنین کاربری وجود ندارد');
            return this.back(req, res);
        }

        const newPasswordReset = new passwordReset({
            email: req.body.email,
            token: uniqueString()
        });
         await newPasswordReset.save();

         // send Mail
        
        // req.flash('success' , 'ایمیل بازیابی رمز عبور با موفقیت انجام شد');

         res.redirect('/');
            
    }

}
module.exports = new forgotPasswordController();

