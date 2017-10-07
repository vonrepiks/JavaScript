const fs = require('fs');
const path = require('path');
const database = require('../config/database.js');

module.exports = (req, res) => {
    if (req.pathname.startsWith('/movies/details/') && req.method === 'GET') {
        let filePath = path.normalize(
            path.join(__dirname, '../views/details.html')
        );

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            let index = req.pathname.replace('/movies/details/', '');
            let movie = database[index];

            let content =
                `<div class="content">
                <img src="${decodeURIComponent(movie.moviePoster)}" alt=""/>
                <h3>Title:  ${(decodeURIComponent(movie.movieTitle)).replace(/\+/g, " ")}</h3>
                <h3>Year: ${movie.movieYear}</h3>
                <p>${(decodeURIComponent(movie.movieDescription)).replace(/\+/g, " ")}</p>
            </div>`;

            let html = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', content);
            res.end(html);
        });
    } else {
        return true;
    }
};