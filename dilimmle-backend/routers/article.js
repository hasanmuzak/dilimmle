const User = require('../models/User');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const ArticleUser = require('../models/Article_User');


router.route('/all')
    .get((req, res, next) => {
        Article.find({}, (err, result) => {
            if (err) throw  err;
            res.send(result);
        });
    });

router.route('/create')
    .post(auth, async (req, res, next) => {
        const {title, english, turkish, description, level} = req.body;
        await User.findById(req.user.id).then(async user => {
            if (!user) {
                res.status(400).send({
                    error: 'User not found.'
                });
            }
            if (user) {
                await Article.findOne({
                    title: title
                }).then(async article => {
                    if (article) {
                        res.status(400).send({
                            err: 'This article already exists.'
                        })
                    }
                    if (!article) {
                        const newArticle = new Article({
                            title,
                            english,
                            turkish,
                            description,
                            level,
                            author_firstname : user.firstname,
                            author_lastname : user.lastname
                        });
                        await newArticle.save().then(() => {
                            res.status(200).send({
                                message: 'Article successfuly created.'
                            })
                        }).catch(err => {
                            console.log(err)
                        });
                    }
                });
            }
        })
    });

router.route('/read/:id')
    .get((req, res, next) => {
        const id = req.params.id;
        Article.findById(id).then(article => {
            if (article) {
                res.send(article);
            } else {
                res.status(400).send({
                    error: 'Article not found.'
                });
            }
        }).catch(err => {
            res.status(400).send({
                error: 'A weird error.'
            });
            console.log(err)
        });
    });


router.route('/user/:userid/:articleid')
    .post(auth,(req, res, next) => {
        ArticleUser.findOne({
            article : req.params.articleid,
            user : req.params.userid
        }).then(article => {
            console.log(article);
            if(!article){
                const newArticleUser = new ArticleUser({
                    article : req.params.articleid,
                    user : req.params.userid,
                    didRead : true
                });
                newArticleUser.save().then(()=>{
                    res.send({
                        msg : "Successfuly saved."
                    })
                }).catch(err => {
                    res.status(400).send({
                        error : err
                    })
                })
            }
            else{
                article.didRead = true;
                article.save().then(()=>{
                    res.send({
                        msg : "Successfuly saved."
                    })
                }).catch(err => {
                    res.status(400).send({
                        error : err
                    })
                });
            }
        })
    })
module.exports = router;