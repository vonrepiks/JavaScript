const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const utils = require('../utils');
const Category = require('../models/Category');
const addCategoryPath = './views/category/add.html';

module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.parse).pathname;

    if (req.pathname === '/category/add' && req.method === 'GET') {
        fs.readFile(addCategoryPath, (err, data) => {
            utils.error(err);
            utils.success(res, data);
        });
    } else if (req.pathname === '/category/add' && req.method === 'POST') {
        let queryData = '';

        req.on('data', (data) => {
            queryData += data;
        });

        req.on('end', () => {
            let category = qs.parse(queryData);
            Category.create(category).then(() => {
                utils.redirect(res, '/');
            });
        });
    } else {
        return true;
    }
};