const User = require('../models/User');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.route('/auth/login')
    .post((req, res, next) => {
       const {username, password} = req.body;
       if(!username || !password){
           res.status(400).send({
               error : 'Username and password are required.'
           });
       }
       else{
           User.findOne({
               username
           }).then(user => {
               if(!user){
                   res.status(400).send({
                       error : 'User not found.'
                   });
               }
               else{
                   bcrypt.compare(password, user.password, (err, result) => {
                      if(err) throw err;
                      if(result){
                          jwt.sign({id : user.id}, process.env.jwtSecretKey, {expiresIn: '365d'}, (err, token) => {
                             if (err) throw err;
                             else{
                                 res.send({
                                     type : 'success',
                                     message : 'User logged in successfuly.',
                                     user : {
                                         id : user.id,
                                         username : user.username,
                                         firstname : user.firstname,
                                         lastname : user.lastname
                                     },
                                     token
                                 })
                             }
                          });
                      }
                      else{
                          res.status(403).send({
                              error : 'Invalid credentials.'
                          });
                      }
                   });
               }
           })
       }
    });

router.route('/auth/user')
    .get((req, res, next) => {
        const token = req.headers["authorization"].split(" ")[1];
        if(!token){
            res.status(401).send({error : 'No token, authentication is failed.'});
        }
        else{
            try{
                req.user = jwt.verify(token, process.env.jwtSecretKey);
                res.send({
                    user : req.user
                })
            }
            catch (e) {
                res.status(400).send({error : 'Invalid token.'});
            }
        }
    });



module.exports = router;