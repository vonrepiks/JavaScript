const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const utils = require('../utils');
const Product = require('../models/Product');

module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname;

    if (req.pathname === '/' && req.method === 'GET') {

        let filePath = path.normalize(
            path.join(__dirname, '../views/home/index.html')
        );

        fs.readFile(filePath, (err, data) => {
            utils.error(err);

            let queryData = qs.parse(url.parse(req.url).query);

            Product.find().then((products) => {
                if (queryData.query) {
                    products = products.filter((product) => {
                        return product.name.includes(queryData.query);
                    });
                }
                
                let content = '';

                for (let product of products) {
                    content +=
                        `<div class="product-card">
                            <img class="product-img" src="${product.image}">
                            <h2>${product.name}</h2>
                            <p>${product.description}</p>
                        </div>`;
                }

                data = data.toString().replace('{content}', content);

                utils.success(res, data);
            });

        });
    } else {
        return true;
    }
};