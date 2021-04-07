const controller = require('app/http/controllers/controller');
const Course = require('app/models/course');
const Comment = require('app/models/comment');
const i18n = require("i18n");

class homeController extends controller {
    
    async index(req , res) {
        //return res.json(i18n.__('title'))
        let courses = await Course.find({ lang : req.getLocale()}).sort({ createdAt : 1}).limit(8).exec();
        res.render('home/index' , { courses });
    }

    async about(req , res) {
        res.render('home/about');
    }

    async comment(req, res , next) {
        try {
            let status = await this.validationData(req);
            if(! status) return this.back(req,res);
        
            let newComment = new Comment({
                user : req.user.id,
                ...req.body
            });

            await newComment.save();

            return this.back(req, res);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new homeController();