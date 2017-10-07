const http = require('http');
const port = 3000;
const handlers = require('./handlers/unionHandler');
const database = require('./config/database.config');
const config = require('./config/config');
let environment = process.env.NODE_ENV || 'development';

database(config[environment]);

http.createServer((req, res) => {
    for (let handler of handlers) {
        if (!handler(req, res)) {
            break;
        }
    }
}).listen(port);

console.log(`Server start in port: ${port}`);