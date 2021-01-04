const controller = require('app/http/controllers/controller');

class registerController extends controller{

    showRegisterForm (req , res) {
        res.render('auth/register' , { messages : req.flash('errors') });
    }
    
    registerProccess (req , res , next) {
        this.validationData (req)
            .then(result => {
                if(result)  res.json('registerProccess')
                else res.redirect('/register');
            });   
    }

    validationData (req){
        req.checkBody('name' , 'فیلد نام نمیتواند خالی بماند').notEmpty();
        req.checkBody('name' , 'فیلد پسورد نمیتواند کمتر از 5 کاراکتر باشد').isLength({min:5});
        req.checkBody('email' , 'فیلد ایمیل نمیتواند خالی بماند').notEmpty();
        req.checkBody('email' , 'فیلد ایمیل معتبر نمی باشد').isEmail();
        req.checkBody('password' , 'فیلد پسورد نمیتواند خالی بماند').notEmpty();
        req.checkBody('password' , 'فیلد پسورد نمیتواند کمتر از 8 کاراکتر باشد ' ).isLength({min:8});

       return req.getValidationResult()
            .then(result => {
                   const errors = result.array();
               
                   if (errors.length == 0)
                        return true;

                   let messages = [];
                   errors.forE(err => messages.push(err.msg))

                   req.flash('errors' , messages);
                        return false;
              })
           .catch(err => console.log(err));
        
    }

}

module.exports = new registerController()