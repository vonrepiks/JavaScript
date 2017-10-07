const fs = require('fs');
const path = require('path');
const database = require('../config/database.js');

module.exports = (req, res) => {
    if (req.url === '/Status' && req.method === 'GET') {
        req.headers.StatusHeader = 'Full';
        if (req.headers.hasOwnProperty('StatusHeader') && req.headers.StatusHeader === 'Full') {
            let filePath = path.normalize(
                path.join(__dirname, '../views/status.html')
            );

            fs.readFile(filePath, (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }

                let counter = 0;
                let content = `<h1>${database.length}</h1>`;

                res.writeHead(200, {
                    'content-type': 'text/html'
                });

                let html = data.toString().replace('<h1>{{replaceMe}}</h1>', content);
                res.write(html);
                res.end();
            });
        }
    } else {
        return true;
    }
};