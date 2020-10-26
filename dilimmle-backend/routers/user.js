const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.route('/register')
    .post(async (req, res, next) => {
        const {username, password, firstname, lastname} = req.body;
        await User.findOne({
            username
        }).then(async user => {
            if (!user) {
                const newUser = new User({
                    username,
                    firstname,
                    lastname,
                    password
                });
                //Hash Password - Şifre Kriptosu
                await bcrypt.genSalt(10, async (err, salt) => {
                    await bcrypt.hash(newUser.password, salt, async (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        await newUser.save()
                            .then(user => {
                                jwt.sign({id: user.id}, process.env.jwtSecretKey, {expiresIn: '365d'}, (err, token) => {
                                    if (err) throw err;
                                    res.send({
                                        token,
                                        user: {
                                            id: user.id,
                                            username: user.username,
                                            firstname: user.firstname,
                                            lastname: user.lastname
                                        }
                                    })
                                })
                            });
                    })
                })
            } else {
                res.status(400).send({error: 'User already exists.'});
            }
        })
    });

router.route('/login')
    .post(async (req, res, next) => {
        const {username, password} = req.body;
        await User.findOne({
            username
        }).then(async user => {
            if (!user) {
                res.status(400).send({error: "User doesn't exist."});
            } else {
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (!isMatch) {
                            return res.status(400).send({
                                error: 'Invalid credentials.'
                            })
                        } else {
                            jwt.sign({id: user.id}, process.env.jwtSecretKey, {expiresIn: '365d'}, (err, token) => {
                                if (err) throw err;
                                res.send({
                                    token,
                                    user: {
                                        id: user.id,
                                        username: user.username,
                                        firstname: user.firstname,
                                        lastname: user.lastname
                                    }
                                })
                            })
                        }
                    });
            }
        })
    });

module.exports = router;