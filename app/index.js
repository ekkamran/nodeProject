const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
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
        server.listen(3000,()=>{ console.log('listening on port 3000')})
    }


    MongoConnection(){
            mongoose.Promise=global.Promise;
            mongoose.connect('mongodb://localhost/tamrinnode',{
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
         app.use(express.static('public'));
         app.set('view engine','ejs');
         app.set('views',path.resolve('./resource/views'));

         app.use(bodyParser.json());
         app.use(bodyParser.urlencoded({extended:true}));
         app.use(validator());

         app.use(session({
             secret:'mysecretkey',
             resave:true,
             saveUninitialized:true,
             cookie: { expires: new Date(Date.now()+1000*60*60*24*7)},
             store:new MongoStore({mongooseConnection:mongoose.connection})
         }));

         app.use(passport.initialize());
         app.use(passport.session());

          
         app.use(cookieParser('mysecretkey'));
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