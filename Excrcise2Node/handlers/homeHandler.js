const fs = require('fs');
const url = require('url');
const path = require('path');

module.exports = (req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        
        let filePath = path.normalize(
            path.join(__dirname, '../views/home.html')
        );

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            
            res.writeHead(200, {
                'content-type': 'text/html'
            });
            res.write(data);
            res.end();
        });
    } else {
        return true;
    }
};