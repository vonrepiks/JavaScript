/**
 * Created by Hristo Skipernov on 13/10/2017.
 */

const encryption = require('../utility/encryption');
const flashMessage = require('../utility/flash_messages');
const User = require('../models/User');

module.exports = {
    registerGet: (req, res) => {
        res.render('users/register');
    },
    registerPost: (req, res) => {
        let reqUser = req.body;

        let user = {
            username: reqUser.username,
            firstName: reqUser.firstName,
            lastName: reqUser.lastName,
        };

        user.salt = encryption.generateSalt();
        user.hashPass = encryption.generateHashedPassword(user.salt, reqUser.hashPass);
        user.roles = [];

        User.create(user).then(user => {
            req.logIn(user, (err, user) => {
                if (err) {
                    flashMessage(req, 'error', err.message);
                    res.render('users/register', user);
                } else {
                    flashMessage(req, 'success', 'Successfully register!');
                    res.redirect('/');
                }
            })
        }).catch((err) => {
            flashMessage(req, 'error', 'This username is busy, please try another');
            res.render('users/register', user);
        });
    },
    loginGet: (req, res) => {
        res.render('users/login');
    },
    loginPost: (req, res) => {
        let reqUser = req.body;
        User.findOne({username: reqUser.username}).then((user) => {
            let userSalt = user.salt;
            let userHashedPwd = user.hashPass;
            let reqHashedPwd = encryption.generateHashedPassword(userSalt, reqUser.hashPass);
            if (userHashedPwd !== reqHashedPwd) {
                flashMessage(req, 'error', 'Invalid username or password');
                res.render('users/login')
            } else {
                req.logIn(user, (err, user) => {
                    if (err) {
                        flashMessage(req, 'error', 'Invalid username or password');
                        res.render('users/login')
                    } else {
                        flashMessage(req, 'success', 'Successfully login!');
                        res.redirect('/')
                    }
                });
            }
        }).catch((err) => {
            flashMessage(req, 'error', 'Invalid username or password');
            res.render('users/login');
        })
    },
    logout: (req, res) => {
        req.logout();
        flashMessage(req, 'success', 'Successfully logout!');
        res.redirect('/');
    }
}
;