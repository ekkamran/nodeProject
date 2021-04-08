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
const Helpers = require('./helpers');
const methodOverride = require('method-override');
const gate = require('app/helpers/gate');
const i18n = require("i18n");
const rememberLogin = require('app/http/middleware/rememberLogin');
const helmet = require('helmet');
const csrf = require('csurf');
const csrfErrorHandler = require('app/http/middleware/csrfErrorHandler');
const RateLimit = require('express-rate-limit');
const apiLimiter = new RateLimit({
    windowMs : 1000 * 60 * 5,
    max : 5,
    // message : "درخواست شما زیاد بوده لطفا 15 دقیقه دیگر دوباره تلاش کنید"
    handler : function (req, res, /*next*/) {
        res.json({
            data : 'درخواست شما زیاد بوده لطفا 15 دقیقه دیگر دوباره تلاش کنید',
            status : 'error'
        })
    }
});
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
         require('app/passport/passport-google');
        require('app/passport/passport-jwt');
         
        app.enable('trust proxy');
        app.use(helmet());
         app.use(express.static(config.layout.public_dir));
         app.set('view engine',config.layout.view_engine);
         app.set('views',config.layout.view_dir);
         app.use(config.layout.ejs.expressLayouts );
         app.set("layout extractScripts", config.layout.ejs.extractScripts)
         app.set("layout extractStyles", config.layout.ejs.extractStyles);
         app.set("layout", config.layout.ejs.master);

        
         app.use(bodyParser.json());
         app.use(bodyParser.urlencoded({extended:true}));
         app.use(methodOverride('_method'));
         app.use(validator());
         app.use(session({...config.session}));
         app.use(cookieParser(config.cookie_secretkey));
         app.use(flash());
         app.use(passport.initialize());
         app.use(passport.session());  
         app.use(rememberLogin.handle);
         app.use(gate.middleware());
         i18n.configure({
            locales:['en', 'fa'],
            directory: config.layout.locales_directory ,
            defaultLocale : 'fa',
            cookie : 'lang',
            objectNotation: true,
        });

         app.use(i18n.init);

         app.use((req, res, next) => {
             app.locals = new Helpers(req, res).getObjects();
             next();
         });
    }

    setRouters(){
        app.use(apiLimiter ,require('app/routes/api'));
        app.use(csrf({ cookie : true }),require('app/routes/web'));
        app.use(csrfErrorHandler.handle);
    }
}