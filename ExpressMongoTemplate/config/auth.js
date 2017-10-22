const flashMessage = require('../utility/flash_messages');

module.exports = {
    isAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            if (req.path === '/logout' && req.user === undefined) {
                flashMessage(req, 'error', "You can't logout before login");
                res.redirect('/login');
            } else if ((req.path === '/login' || req.path === '/register') && req.user) {
                flashMessage(req, 'error', "You can't login/register again before logout first!");
                res.redirect('/');
            } else {
                flashMessage(req, 'error', 'Please login/register first!');
                res.redirect('/login');
            }
        }
    },
    isInRole: (role) => {
        return (req, res, next) => {
            if (req.isAuthenticated() && req.user.roles.indexOf(role) > -1) {
                next();
            } else {
                flashMessage(req, 'error', 'Access denied ! ! !');
                res.redirect('/');
            }
        }
    }
};
