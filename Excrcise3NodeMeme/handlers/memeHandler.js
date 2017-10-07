const fs = require('fs');
const fsExtra = require('fs-extra');
const utils = require('../utils');
const url = require('url');
const qs = require('querystring');
const formidable = require('formidable');
const db = require('../config/dataBase.js');
const shortid = require('shortid');
const viewAllPath = './views/viewAll.html';
const viewAddMemePath = './views/addMeme.html';
const viewDetailsMemePath = './views/details.html';

let viewAll = (req, res) => {
    fs.readFile(viewAllPath, (err, data) => {
        utils.error(err);

        let content = '';
        let memes = db.getDb()
            .filter((meme) => { return meme.hasOwnProperty('privacy'); })
            .sort((a, b) => { return b.dateStamp - a.dateStamp; });

        for (let meme of memes) {
            content +=
                `<div class="meme">
                    <a href="/getDetails?id=${meme.id}">
                    <img class="memePoster" src="${meme.memeSrc}"/>          
                </div>`;
        }

        data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', content);
        utils.success(res, data);
    });
};

let viewAddMeme = (req, res) => {
    fs.readFile(viewAddMemePath, (err, data) => {
        utils.error(err);
        utils.success(res, data);
    });
};

let addMeme = (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        utils.error(err);

        let memeId = shortid.generate();
        let currentMemeFolder = Math.ceil(db.getDb().length / 5);
        let tempPath = files.meme.path;
        let fileName = shortid.generate() + '.png';

        let newLocation = `./public/memeStorage/${currentMemeFolder}/`;

        if (fs.exists(newLocation)) {
            fs.mkdirSync(newLocation);
        }

        fsExtra.copy(tempPath, newLocation + fileName, function (err) {
            if (err) {
                console.error(err);
            }
        });

        let meme = utils.baseMeme(memeId, fields.memeTitle, newLocation + fileName, fields.memeDescription, fields.status);
        db.add(meme);
        db.save().then(() => {
            res.writeHead(302, {
                Location: '/'
            });
            res.end();
        }).catch();
    });
};

let getDetails = (req, res) => {

    let memeId = qs.parse(url.parse(req.url).query).id;
    let targetedMeme = db.findOne(memeId);
    if (targetedMeme) {
        fs.readFile(viewDetailsMemePath, (err, data) => {
            utils.error(err);

            let content =
                `<div class="content">
                   <img src="${targetedMeme.memeSrc}" alt=""/>
                    <h3>Title  ${targetedMeme.title}</h3>                            <p> ${targetedMeme.description}</p>
                    <button><a href="${targetedMeme.memeSrc}" download>Download Meme</a></button>
                </div>`
                ;
            data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', content);
            utils.success(res, data);
        });
    }

};

module.exports = (req, res) => {
    if (req.pathname === '/viewAllMemes' && req.method === 'GET') {
        viewAll(req, res);
    } else if (req.pathname === '/addMeme' && req.method === 'GET') {
        viewAddMeme(req, res);
    } else if (req.pathname === '/addMeme' && req.method === 'POST') {
        addMeme(req, res);
    } else if (req.pathname.startsWith('/getDetails') && req.method === 'GET') {
        getDetails(req, res);
    } else {
        return true;
    }
};