/**
 * Created by Hristo Skipernov on 12/10/2017.
 */

const express = require('express');

const app = express();
const env = process.env.NODE_ENV || "development";

const config = require('./config/config')[env];

require('./config/express')(app);
require('./config/routes')(app);
require('./config/database')(config);
require('./config/passport')();

app.listen(config.port);

console.log(`Listening on port ${config.port}`);