const express = require('express');
const router = express.Router();
const ArticleUser = require('../models/Article_User');
const auth = require('../middleware/auth');





router.route('/what-i-read/')
    .get(auth,(req, res, next) => {
        ArticleUser.find({
            user : req.user.id,
            didRead : true
        }).then(articles => {
            if(articles.length === 0){
                res.status(400).send({
                    err : 'No data found.'
                });
            }
            else{
                res.send(articles);
            }
        })
    });

router.route('/did-i-read/:articleid')
    .get(auth,(req, res, next) => {
        ArticleUser.findOne({
            article : req.params.articleid,
            user : req.user.id
        }).then(article => {
            if(!article){
                res.status(400).send({
                    err : 'No data found'
                });
            }
            else{
                res.send(article);
            }
        })
    });

module.exports = router;