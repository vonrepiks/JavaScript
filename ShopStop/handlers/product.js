const url = require('url');
const fs = require('fs');
const path = require('path');
const multiparty = require('multiparty');
const shortid = require('shortid');
const utils = require('../utils');
const Product = require('../models/Product');
const Category = require('../models/Category');

module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname;

    if (req.pathname === '/product/add' && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, '../views/product/add.html'));

        fs.readFile(filePath, (err, data) => {
            utils.error(err);

            Category.find().then((categories) => {
                let replacement = '<select class="input-field" name="category">';

                for (let category of categories) {
                    replacement += `$<option value="${category._id}">${category.name}</option>`;
                }

                replacement += '</select>';

                data = data.toString().replace('{categories}', replacement);
                utils.success(res, data);
            });
        });

    } else if (req.pathname === '/product/add' && req.method === 'POST') {
        let form = new multiparty.Form();
        let product = {};

        form.on('part', (part) => {
            if (part.filename) {
                let dataString = '';

                part.setEncoding('binary');
                part.on('data', (data) => {
                    dataString += data;
                });

                part.on('end', () => {
                    let filename = shortid.generate();
                    let filePath = '/public/product_images/' + filename + '.bin';

                    product.image = filePath;
                    fs.writeFile(
                        `.${filePath}`, dataString, { encoding: 'ascii' }, (err) => {
                            utils.error(err);
                        });
                });
            } else {
                part.setEncoding('utf-8');
                let field = '';
                part.on('data', (data) => {
                    field += data;
                });
                part.on('end', () => {
                    product[part.name] = field;
                });
            }
        });

        form.on('close', () => {
            Product.create(product).then((insertedProduct) => {
                Category.findById(product.category).then(category => {
                    category.products.push(insertedProduct._id);
                    category.save();
                });
            });
        });

        utils.redirect(res, '/');
        form.parse(req);
    } else {
        return true;
    }
};