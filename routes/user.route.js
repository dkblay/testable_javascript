const express  = require('express');
const jwt  = require('jsonwebtoken');
const User = require('../domain/user');


let userRouter  = express.Router();

module.exports  = function(model, app) {
    let UserModel  = model.User;

    userRouter
        .route('/register')
        .post((req, res, next) => {
            let body  = req.body;
            let user  = new User(body);

            let userModel  = new UserModel(user);
            
            userModel.save((err, results) => {
                if (err) return next(err);
                
                res.json(results);
            });
        });

    userRouter
        .route('/authenticate')
        .post((req, res, next) => {
            UserModel.findOne({username: req.body.username})
                .then((user) => {

                    if(!user) {
                        throw new Error('Authentication faild! User does not exist');
                    }
                    if(req.body.password !== user.password ) {
                        throw new Error('Authentication faild! Invalid password');
                    }

                    let token  = jwt.sign(user, app.get('superSecret'), {
                        expiresIn: 1440 // expires in 24 hours
                        
                    });

                    res.json({
                        success: true,
                        message: 'Token Created',
                        token: token
                    }); 
                })
                .catch((reason) => {
                    next(reason);
                });
        });

    return userRouter;
};