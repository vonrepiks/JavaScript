const fs = require('fs');
const url = require('url');
const path = require('path');
const database = require('../config/database.js');

module.exports = (req, res) => {
    if (req.url === '/viewAllMovies' && req.method === 'GET') {
        let filePath = path.normalize(
            path.join(__dirname, '../views/viewAll.html')
        );

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            let content = '';

            database.sort((a, b) => { return b.movieYear - a.movieYear; });

            let counter = 0;
            for (let movie of database) {
                content +=
                    `<div class="movie">
                        <a href="/movies/details/${counter++}">
                        <img class="moviePoster" src="${decodeURIComponent(movie.moviePoster)}"/>          
                    </div>`;
            }

            res.writeHead(200, {
                'content-type': 'text/html'
            });

            let html = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', content);
            res.write(html);
            res.end();
        });
    } else {
        return true;
    }
};