/**
 * Created by Hristo Skipernov on 13/10/2017.
 */

const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('express-flash-messages');

module.exports = (app) => {

    app.engine('.hbs', handlebars({
        defaultLayout: 'main',
        extname: '.hbs'
    }));

    app.set('view engine', '.hbs');

    app.use(cookieParser());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(session({
        secret: 'neshto-taino!@#$%',
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
    app.use(express.static('public'));

    app.use((req, res, next) => {
        if (req.user) {
            res.locals.currentUser = req.user;
        }
        next();
    });

    app.use(function(req, res, next){
        // if there's a flash message in the session request, make it available in the response, then delete it
        res.locals.sessionFlash = req.session.sessionFlash;
        delete req.session.sessionFlash;
        next();
    });
};