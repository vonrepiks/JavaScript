/**
 * Created by Hristo Skipernov on 12/10/2017.
 */

module.exports = {
    index: (req, res) => {
        res.render('home/index');
    },
    about: (req, res) => {
        res.render('home/about');
    },
    contacts: (req, res) => {
        res.render('home/contacts');
    }
};