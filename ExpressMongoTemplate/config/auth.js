const flashMessage = require('../utility/flash_messages');

module.exports = {
    isAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            flashMessage(req, 'error', 'Please login first!');
            res.redirect('login');
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
