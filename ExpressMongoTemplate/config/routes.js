/**
 * Created by Hristo Skipernov on 12/10/2017.
 */

const auth = require('./auth');
const controllers = require('../controllers/blender-controller');

module.exports = (app) => {
    app.get('/', controllers.home.index);
    app.get('/about', auth.isInRole('Admin'), controllers.home.about);
    app.get('/contacts', auth.isAuthenticated, controllers.home.contacts);

    app.get('/register', controllers.user.registerGet);
    app.post('/register', controllers.user.registerPost);

    app.get('/login', controllers.user.loginGet);
    app.post('/login', controllers.user.loginPost);

    app.post('/logout', controllers.user.logout);

    app.all('*', (req, res) => {
        res.render('error');
    });
};