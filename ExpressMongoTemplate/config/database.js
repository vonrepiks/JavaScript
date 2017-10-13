/**
 * Created by Hristo Skipernov on 12/10/2017.
 */

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = (config) => {

    mongoose.connect(config.connectionString, {
        useMongoClient: true
    });

    const db = mongoose.connection;

    db.once("open", (err) => {
        if (err) {
            throw err;
        }
        console.log("Database ready!");
    });

    db.on("error", (err) => {
        if (err) {
            console.log(`Database error ${err}`);
        }
    });

    require('../models/User').seedAdmin();
};