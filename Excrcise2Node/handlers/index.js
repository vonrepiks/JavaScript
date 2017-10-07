const homeHandler = require('./homeHandler.js');
const addHandler = require('./addHandler.js');
const viewAllHandler = require('./viewAllHandler.js');
const movieDetailsHandler = require('./movieDetailsHandler.js');
const statusHandler = require('./statusHandler.js');
const staticFiles = require('./static-files.js');

module.exports = [ homeHandler, addHandler, viewAllHandler, movieDetailsHandler, statusHandler, staticFiles ];