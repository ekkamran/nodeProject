const controller = require('app/http/controllers/controller');

class registerController extends controller{

    showRegistrationForm(req,res){
        res.render('auth/register');
    }
    
    


}


module.exports=new registerController()