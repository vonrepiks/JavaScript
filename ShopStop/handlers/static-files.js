const fs = require('fs');
const path = require('path');
const urlPackage = require('url');

function getContentType(url) {

    let urlTokens = url.split("/");
    let extension = urlTokens[urlTokens.length - 1].split(".")[1];
    switch (extension) {
        case 'css': return 'text/css';
        case 'ico': return 'image/x-icon';
        case 'bin': return 'application/x-binary';
        default: return '';
    }
}

module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname;

    if (req.pathname.startsWith('/content/') && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, `..${req.pathname}`));

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.WriteHead(404, {
                    'Content-type': 'text/plain'
                });

                res.write('404 not found!');
                res.end();
                return;
            }

            res.writeHead(200, {
                'Content-Type': getContentType(req.pathname)
            });
            res.write(data);
            res.end();
        });
    } else {
        return true;
    }
}