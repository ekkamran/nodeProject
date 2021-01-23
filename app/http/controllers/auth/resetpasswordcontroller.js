const controller = require('app/http/controllers/controller');
const passport = require('passport');
const passwordReset = require('app/models/password-reset');
const User = require('app/models/users');
const uniqueString = require('unique-string');


class resetPasswordController extends controller{

    showResetPassword(req , res){
        const title = "صفحه ورود";
        res.render('home/auth/passwords/reset', { 
            recaptcha: this.recaptcha.render(),
            title,
             token : req.params.token 
        });
    }
    
    async resetPasswordProccess(req  ,res , next) {
        await this.recaptchaValidation(req , res);
        let result = await this.validationData(req)
        if(result) {
            return this.resetPassword(req, res)
        } 

        req.flash('formData' , req.body);   
        return res.redirect('/auth/password/reset/' + req.body.token);
    }


    async resetPassword(req, res) {
        let field = await passwordReset.findOne({ $and : [ { email : req.body.email }, { token: req.body.token } ] });
        if(! field) {
            req.flash('errors', 'اطلاعات وارد شده صحیح نیست لطفا دقت کنید');
            return this.back(req, res);
        }

        if(field.use) {
            req.flash('errors' , 'از این لینک برای بازیابی پسورد قبلا استفاده شده است');
            return this.back(req, res);
        }

        let user = await User.findOneAndUpdate({ email : field.email } , { $set : { password : req.body.password }});
        if(! user) {
            req.flash('errors' , 'اپدیت شدن انجام نشد');
            return this.back();
        }
        
       await field.updateOne({ use : true}); 
       return res.redirect('/auth/login');
       
    }

}
module.exports = new resetPasswordController();

