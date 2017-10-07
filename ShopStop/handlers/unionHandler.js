const homeHandler = require('./home');
const productHandler = require('./product.js');
const categoryHandler = require('./category.js');
const filesHandler = require('./static-files');

module.exports = [ homeHandler, productHandler, categoryHandler, filesHandler ];