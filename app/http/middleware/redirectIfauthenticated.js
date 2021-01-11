const User = require('app/models/users');
const middleware = require('./middleware');

class redirectIfAuthenticated {
    handle(req, res, next) {
        if(req.isAuthenticated()) 
             return res.redirect('/')
             next();
    }

}

module.exports = new redirectIfAuthenticated();