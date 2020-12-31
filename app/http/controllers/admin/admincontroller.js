const controller = require('app/http/controllers/controller');


class adminController extends controller{

    index(req,res){
        res.json(this.message());
    }
     
    message(){
        return 'admin kamran';
    }
    
    }
    
    
    module.exports=new adminController()