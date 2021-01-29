const controller = require('app/http/controllers/controller');
const Course = require('app/models/course');
const Episode = require('app/models/episode');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');

class courseController extends controller {

    async index(req, res) {
        res.render('home/index', { courses});
    }

    async single(req, res) {
        let course = await Course.findOne({ slug: req.params.course })
                              .populate([
                                  {
                                      path: 'user',
                                      select: 'name'
                                  },
                                  {
                                      path: 'episodes',
                                      options: {
                                          sort: { number: 1}
                                      }
                                  }
                              ]);
            let canUserUse = await this.canUse(req, course);

            res.render('home/single-course', { course, canUserUse});
        }

        async download(req, res, next) {
            try {
                this.isMongoId(req.params.episode);

                let episode = await Episode.findById(req.params.episode);
                if(! episode) this.error(404,'چنین فایلی برای این جلسه وجود ندارد');

                if(! this.checkHash(req, episode)) this.error(403,'اعتبار لینک شما به پایان رسیده است');

                let filePath = path.resolve(`./public/download/ASGLKET!1241tgsdq415215/${episode.videoUrl}`);
                if(! fs.existsSync(filePath)) this.error(404,'چنین فایل برای دانود وجود دارد');

                return res.download(filePath)

            } catch (err) {
                next(err);
            }
        }

        async canUse(req, course) {
            let canUse = false;
            if(req.isAuthenticated()) {
                switch (course.type) {
                    case 'vip':
                        canUse = req.user.isVip()
                        break;
                    case 'cash':
                        canUse = req.user.checkLearning(course);
                        break;
                    default:
                        canUse = true;
                        break;        
                }
            }
            return canUse;
        }

        checkHash(req, episode) {
            let timestamps = new Date().getTime();
            if(req.query.t < timestamps) return false;

            let text = `aQTR@!#FA#%!@%SDQGGASDF${episode.id}${req.query.t}`;

            return bcrypt.compareSync(text, req.query.mac);
        }
}

module.exports = new courseController();