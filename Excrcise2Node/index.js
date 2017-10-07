const http = require('http');
const url = require('url');
const handlers = require('./handlers/index.js');
const port = 3154;

http.createServer((req, res) => {
    for (let handler of handlers) {
        req.pathname = url.parse(req.url).pathname;
        let task = handler(req, res);
        if (task !== true) {
          break;
        }
    }
}).listen(port);

console.log('Server start');
console.log('Server listen in port: ' + port);