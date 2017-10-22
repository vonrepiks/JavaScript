/**
 * Created by Hristo Skipernov on 12/10/2017.
 */

const auth = require('./auth');
const controllers = require('../controllers/blender-controller');

module.exports = (app) => {
    //Home page
    app.get('/', controllers.home.index);

    //User requests
    app.get('/register', auth.isAuthenticated, controllers.user.registerGet);
    app.post('/register', auth.isAuthenticated, controllers.user.registerPost);
    app.get('/login', auth.isAuthenticated, controllers.user.loginGet);
    app.post('/login', auth.isAuthenticated, controllers.user.loginPost);
    app.post('/logout', auth.isAuthenticated, controllers.user.logout);

    //Global error page
    app.all('*', (req, res) => {
        res.render('error');
    });
};