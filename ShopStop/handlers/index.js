const homeHandler = require('./home');
const filesHandler = require('./static-files');
const productHandler = require('./product.js')

module.exports = [ homeHandler, filesHandler, productHandler ];