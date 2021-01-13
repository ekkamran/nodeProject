const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');
const Helpers = require('./helpers')
const rememberLogin = require('app/http/middleware/rememberLogin')



module.exports = class Application{

    constructor(){
          this.setupExpress();
          this.setConfig();
          this.MongoConnection();
          this.setRouters();
    }


    setupExpress(){
        const server=http.createServer(app);
        server.listen(config.port,()=>{ console.log(`listening on port ${config.port}`)})
    }


    MongoConnection(){
            mongoose.Promise=global.Promise;
            mongoose.connect(config.database.url,{
                useNewUrlParser:true,
                useUnifiedTopology:true,
                useFindAndModify:false,
                useCreateIndex:true
            },(err)=>{
                if(err){console.log(err)}
                else { console.log('connected to db')} 
            });
    }


    setConfig(){
         require('app/passport/passport-local');
         app.use(express.static(config.layoutes.public_dir));
         app.set('view engine',config.layoutes.view_engine);
         app.set('views',config.layoutes.view_dir);

         app.use(bodyParser.json());
         app.use(bodyParser.urlencoded({extended:true}));
         app.use(validator());

         app.use(session({...config.session}));

         app.use(passport.initialize());
         app.use(passport.session());

          
         app.use(cookieParser(config.cookie_secretkey));
         app.use(flash());
         app.use(rememberLogin.handle);
         app.use((req, res, next) => {
             app.locals = new Helpers(req, res).getObjects();
             next();
         })


    }

    setRouters(){
      app.use(require('app/routes/api'));
      app.use(require('app/routes/web'));
    }
}