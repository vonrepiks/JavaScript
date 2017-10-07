const fs = require('fs');
const url = require('url');
const path = require('path');
const formidable = require('formidable');
const database = require('../config/database.js');

module.exports = (req, res) => {
    if (req.url === '/addMovie' && req.method === 'GET') {

        let filePath = path.normalize(
            path.join(__dirname, '../views/addMovie.html')
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
    } else if (req.url === '/addMovie' && req.method === 'POST') {
        let form = new formidable.IncomingForm();

        form.parse(req, function (err, fields, files) {
            let movie = {};
            let content = '';

            if ((fields.movieTitle === null || fields.movieTitle === '') || (fields.moviePoster === null || fields.moviePoster === '')) {
                content = `<div id="errBox"><h2 id="errMsg">Please fill all fields</h2></div>`;
            } else {
                content = `<div id="succssesBox"><h2 id="succssesMsg">Movie Added</h2></div>`;

                movie.movieTitle = fields.movieTitle;
                movie.movieYear = fields.movieYear;
                movie.moviePoster = fields.moviePoster;
                movie.movieDescription = fields.movieDescription;

                database.push(movie);
            }

            let filePath = path.normalize(
                path.join(__dirname, '../views/addMovie.html')
            );
    
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }
    
                res.writeHead(200, {
                    'content-type': 'text/html'
                });
                
                let html = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', content);
                res.write(html);
                res.end();
            });
        });
    } else {
        return true;
    }
};