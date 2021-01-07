const autoBind = require('auto-bind');
const Recaptcha = require('express-recaptcha').RecaptchaV2;
module.exports=class controller{

   constructor(){
       autoBind(this);
       this.recaptchaConfig();
   }

   recaptchaConfig(){
       this.recaptcha = new Recaptcha(
        '6Ldtht0ZAAAAAN_JYbnFwvA5x-RhlrX3W_4X6Glb',
        '6Ldtht0ZAAAAAHI2yM-c1tSMrtHkVYjK1Q7aJ_CA',
        {hl:'fa'}
       );
   }

   recaptchaValidation(req,res){
       return new Promise((resolve,reject) => {
           this.recaptcha.verify(req, (err, data) => {
               if(err){
                   req.flash('errors', 'گزینه امنیتی مربوط خاموش می باشد ');
                   res.redirect(req.url);

               } else {
                   resolve(true)
               }
           });

       });
   }
    
    
    }
    